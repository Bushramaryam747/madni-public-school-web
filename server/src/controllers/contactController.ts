import { Request, Response } from 'express';
import { z } from 'zod';
import { Inquiry } from '../models/Inquiry.js';
import { getDbStatus } from '../config/db.js';
import { mockStore } from '../utils/mockDataStore.js';
import { config } from '../config/index.js';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number (at least 10 digits)')
    .max(25, 'Phone number cannot exceed 25 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Phone number contains invalid characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message cannot exceed 2000 characters')
    .trim(),
  website_hp: z.string().optional(), // Honeypot field for anti-spam
});

export const submitContact = async (req: Request, res: Response) => {
  try {
    // 1. Honeypot Spam Protection
    if (req.body.website_hp && req.body.website_hp.trim().length > 0) {
      console.warn('[SPAM BOT CAUGHT] Honeypot field triggered:', req.body.website_hp);
      // Return fake success so bots do not retry
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been received. Our administration will contact you shortly.',
      });
    }

    // 2. Validate input schema
    const parseResult = contactSchema.safeParse(req.body);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0];
      return res.status(400).json({
        success: false,
        message: `${firstError.path.join('.')}: ${firstError.message}`,
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { name, phone, email, message } = parseResult.data;

    let savedInquiry: any;

    // 3. Save to Database or fallback store
    if (getDbStatus()) {
      savedInquiry = await Inquiry.create({
        name,
        phone,
        email: email || '',
        message,
        status: 'new',
      });
    } else {
      savedInquiry = mockStore.addInquiry({
        name,
        phone,
        email: email || '',
        message,
      });
    }

    // 4. Optional Email Notification Integration Point
    // (Documented for production SMTP / Resend / SendGrid)
    if (config.email.enabled) {
      try {
        console.log(`[Email Integration] Sending inquiry notification to ${config.email.toEmail} for parent: ${name}`);
        // Integration point: Nodemailer or Resend can be invoked here
      } catch (mailError) {
        console.error('[Email Notification Error] Could not dispatch email:', mailError);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your admission inquiry has been received. Madni Public School administration will contact you shortly.',
      inquiryId: savedInquiry._id,
    });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to submit your inquiry at this moment. Please call us directly at 0318-9969994.',
    });
  }
};
