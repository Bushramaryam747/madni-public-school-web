import { Request, Response } from 'express';
import { z } from 'zod';
import { SchoolEvent } from '../models/Event.js';
import { getDbStatus } from '../config/db.js';
import { mockStore } from '../utils/mockDataStore.js';
import { EventCategory } from '../types/index.js';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    if (getDbStatus()) {
      const filter: any = {};
      if (category && category !== 'all') {
        filter.category = category;
      }
      const events = await SchoolEvent.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, data: events });
    } else {
      const events = mockStore.getEvents(category as string);
      return res.json({ success: true, data: events });
    }
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve events' });
  }
};

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(150),
  category: z.enum([
    'Annual Prize Distribution',
    'Student Achievements',
    'School Events',
    'Academic Activities',
  ]),
  date: z.string().min(2, 'Date or term is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1500),
  badge: z.string().optional().default('Annual Milestone'),
  imageUrl: z.string().optional().default(''),
});

export const createEvent = async (req: Request, res: Response) => {
  try {
    const parseResult = eventSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.errors[0].message,
      });
    }

    const eventData = parseResult.data;

    if (getDbStatus()) {
      const newEvent = await SchoolEvent.create({
        ...eventData,
        category: eventData.category as EventCategory,
      });
      return res.status(201).json({ success: true, message: 'Event created', data: newEvent });
    } else {
      const newEvent = mockStore.addEvent({
        ...eventData,
        category: eventData.category as EventCategory,
      });
      return res.status(201).json({ success: true, message: 'Event created', data: newEvent });
    }
  } catch (error: any) {
    console.error('Error creating event:', error);
    return res.status(500).json({ success: false, message: 'Failed to create event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parseResult = eventSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: parseResult.error.errors[0].message,
      });
    }

    if (getDbStatus()) {
      const updated = await SchoolEvent.findByIdAndUpdate(id, parseResult.data, {
        new: true,
      });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      return res.json({ success: true, message: 'Event updated', data: updated });
    } else {
      const updated = mockStore.updateEvent(id, parseResult.data as any);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      return res.json({ success: true, message: 'Event updated', data: updated });
    }
  } catch (error: any) {
    console.error('Error updating event:', error);
    return res.status(500).json({ success: false, message: 'Failed to update event' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const deleted = await SchoolEvent.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      return res.json({ success: true, message: 'Event deleted successfully' });
    } else {
      const deleted = mockStore.deleteEvent(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      return res.json({ success: true, message: 'Event deleted successfully' });
    }
  } catch (error: any) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete event' });
  }
};
