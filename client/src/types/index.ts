export type GalleryCategory =
  | 'All'
  | 'Classroom'
  | 'Learning'
  | 'Events'
  | 'Prize Distribution'
  | 'Sports'
  | 'School Building';

export interface GalleryItem {
  _id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  alt: string;
  createdAt?: string | Date;
}

export type EventCategory =
  | 'Annual Prize Distribution'
  | 'Student Achievements'
  | 'School Events'
  | 'Academic Activities';

export interface EventItem {
  _id: string;
  title: string;
  category: EventCategory;
  date: string;
  description: string;
  badge?: string;
  imageUrl?: string;
  createdAt?: string | Date;
}

export interface InquiryItem {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: 'new' | 'contacted' | 'archived';
  notes?: string;
  createdAt: string | Date;
}

export interface AdminStats {
  totalInquiries: number;
  newInquiries: number;
  contactedInquiries: number;
  totalGallery: number;
  totalEvents: number;
  databaseConnected: boolean;
}
