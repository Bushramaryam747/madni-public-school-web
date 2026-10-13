export interface IInquiry {
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: 'new' | 'contacted' | 'archived';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type GalleryCategory =
  | 'All'
  | 'Classroom'
  | 'Learning'
  | 'Events'
  | 'Prize Distribution'
  | 'Sports'
  | 'School Building';

export interface IGalleryImage {
  _id?: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  publicId?: string;
  alt: string;
  createdAt?: Date;
}

export type EventCategory =
  | 'Annual Prize Distribution'
  | 'Student Achievements'
  | 'School Events'
  | 'Academic Activities';

export interface IEvent {
  _id?: string;
  title: string;
  category: EventCategory;
  date: string;
  description: string;
  badge?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminUser {
  _id?: string;
  email: string;
  password: string;
  role: 'admin';
  lastLogin?: Date;
  createdAt?: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
