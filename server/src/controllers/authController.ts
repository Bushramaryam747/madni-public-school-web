import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { AdminUser } from '../models/AdminUser.js';
import { config } from '../config/index.js';
import { getDbStatus } from '../config/db.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export const login = async (req: Request, res: Response) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.errors[0].message,
      });
    }

    const { email, password } = parseResult.data;
    let user: any = null;

    if (getDbStatus()) {
      user = await AdminUser.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      user.lastLogin = new Date();
      await user.save();
    } else {
      // In-memory fallback if Mongo is disconnected during local preview
      if (
        email === config.adminSeed.email.toLowerCase() &&
        password === config.adminSeed.password
      ) {
        user = {
          _id: 'admin-fallback-id',
          email: config.adminSeed.email,
          role: 'admin',
          lastLogin: new Date(),
        };
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: 'admin' },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    // Set secure httpOnly cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: config.nodeEnv === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: 'Admin authentication successful',
      token, // Also send token for clients preferring Authorization header
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication',
    });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    return res.json({
      success: true,
      user: {
        id: req.user.userId,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server error checking session' });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: config.nodeEnv === 'production' ? 'strict' : 'lax',
  });

  return res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
