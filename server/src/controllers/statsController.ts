import { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { GalleryImage } from '../models/GalleryImage.js';
import { SchoolEvent } from '../models/Event.js';
import { getDbStatus } from '../config/db.js';
import { mockStore } from '../utils/mockDataStore.js';

export const getAdminStats = async (_req: Request, res: Response) => {
  try {
    if (getDbStatus()) {
      const [totalInquiries, newInquiries, contactedInquiries, totalGallery, totalEvents] =
        await Promise.all([
          Inquiry.countDocuments(),
          Inquiry.countDocuments({ status: 'new' }),
          Inquiry.countDocuments({ status: 'contacted' }),
          GalleryImage.countDocuments(),
          SchoolEvent.countDocuments(),
        ]);

      return res.json({
        success: true,
        data: {
          totalInquiries,
          newInquiries,
          contactedInquiries,
          totalGallery,
          totalEvents,
          databaseConnected: true,
        },
      });
    } else {
      const totalInquiries = mockStore.inquiries.length;
      const newInquiries = mockStore.inquiries.filter((i) => i.status === 'new').length;
      const contactedInquiries = mockStore.inquiries.filter((i) => i.status === 'contacted').length;
      const totalGallery = mockStore.gallery.length;
      const totalEvents = mockStore.events.length;

      return res.json({
        success: true,
        data: {
          totalInquiries,
          newInquiries,
          contactedInquiries,
          totalGallery,
          totalEvents,
          databaseConnected: false,
        },
      });
    }
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve stats' });
  }
};
