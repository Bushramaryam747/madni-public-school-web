import { Request, Response } from 'express';
import { z } from 'zod';
import { Inquiry } from '../models/Inquiry.js';
import { getDbStatus } from '../config/db.js';
import { mockStore } from '../utils/mockDataStore.js';

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    if (getDbStatus()) {
      const filter: any = {};
      if (status && status !== 'all') {
        filter.status = status;
      }
      const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data: inquiries });
    } else {
      const inquiries = mockStore.getInquiries(status as string);
      return res.json({ success: true, data: inquiries });
    }
  } catch (error: any) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve inquiries' });
  }
};

const updateStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'archived']),
  notes: z.string().optional(),
});

export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parseResult = updateStatusSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.errors[0].message,
      });
    }

    const { status, notes } = parseResult.data;

    if (getDbStatus()) {
      const updateData: any = { status };
      if (notes !== undefined) updateData.notes = notes;

      const updated = await Inquiry.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      return res.json({ success: true, message: 'Inquiry status updated', data: updated });
    } else {
      const updated = mockStore.updateInquiryStatus(id, status, notes);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      return res.json({ success: true, message: 'Inquiry status updated', data: updated });
    }
  } catch (error: any) {
    console.error('Error updating inquiry status:', error);
    return res.status(500).json({ success: false, message: 'Failed to update inquiry status' });
  }
};

export const deleteInquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await Inquiry.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      return res.json({ success: true, message: 'Inquiry deleted successfully' });
    } else {
      const deleted = mockStore.deleteInquiry(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Inquiry not found' });
      }
      return res.json({ success: true, message: 'Inquiry deleted successfully' });
    }
  } catch (error: any) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete inquiry' });
  }
};
