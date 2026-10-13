import { Router } from 'express';
import { login, getMe, logout } from '../controllers/authController.js';
import { submitContact } from '../controllers/contactController.js';
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiriesController.js';
import {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.js';
import { getAdminStats } from '../controllers/statsController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import { contactLimiter, authLimiter } from '../middleware/rateLimiter.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// Health Check
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    school: 'Madni Public School',
    location: 'Madni Town, near Shah Alam Abad, D.I. Khan, KPK, Pakistan',
    timestamp: new Date().toISOString(),
  });
});

// Authentication Routes
router.post('/auth/login', authLimiter, login);
router.get('/auth/me', authenticateAdmin, getMe);
router.post('/auth/logout', logout);

// Public Contact Form Submission (Honeypot + Rate Limited)
router.post('/contact', contactLimiter, submitContact);

// Gallery Routes
router.get('/gallery', getGalleryImages);
router.post('/gallery', authenticateAdmin, upload.single('image'), createGalleryImage);
router.delete('/gallery/:id', authenticateAdmin, deleteGalleryImage);

// Events & Achievements Routes
router.get('/events', getEvents);
router.post('/events', authenticateAdmin, createEvent);
router.put('/events/:id', authenticateAdmin, updateEvent);
router.delete('/events/:id', authenticateAdmin, deleteEvent);

// Admin-Protected Inquiries Routes
router.get('/admin/inquiries', authenticateAdmin, getInquiries);
router.patch('/admin/inquiries/:id', authenticateAdmin, updateInquiryStatus);
router.delete('/admin/inquiries/:id', authenticateAdmin, deleteInquiry);

// Admin Dashboard Summary Stats
router.get('/admin/stats', authenticateAdmin, getAdminStats);

export default router;
