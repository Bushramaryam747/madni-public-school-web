import { GalleryItem, EventItem, InquiryItem, AdminStats } from '../types';

const API_BASE = '/api/v1';

// Default fallback items in case API is temporarily unavailable
export const fallbackGallery: GalleryItem[] = [
  {
    _id: 'g1',
    title: 'School Campus & Main Entrance',
    category: 'School Building',
    imageUrl: '/images/gallery/campus-building.svg',
    alt: 'Madni Public School front building and main entrance gate in Madni Town D.I. Khan',
  },
  {
    _id: 'g2',
    title: 'Primary Wing Interactive Classroom',
    category: 'Classroom',
    imageUrl: '/images/gallery/primary-classroom.svg',
    alt: 'Primary students attending regular coursework in well-ventilated classroom with teacher',
  },
  {
    _id: 'g3',
    title: 'Middle Wing Practical Science & Math Session',
    category: 'Learning',
    imageUrl: '/images/gallery/science-learning.svg',
    alt: 'Middle grade students engaged in collaborative science and mathematics concepts',
  },
  {
    _id: 'g4',
    title: 'Annual Academic Prize Distribution',
    category: 'Prize Distribution',
    imageUrl: '/images/gallery/prize-distribution.svg',
    alt: 'Merit recognition ceremony and certificate awards for top academic performers',
  },
  {
    _id: 'g5',
    title: 'Outdoor Physical Education & Sports Day',
    category: 'Sports',
    imageUrl: '/images/gallery/sports-activity.svg',
    alt: 'Students participating in physical fitness exercises and sports activities on school grounds',
  },
  {
    _id: 'g6',
    title: 'Morning Assembly & Moral Education Session',
    category: 'Events',
    imageUrl: '/images/gallery/morning-assembly.svg',
    alt: 'Disciplined morning assembly fostering values, national pride, and character building',
  },
  {
    _id: 'g7',
    title: 'Early Reading & Foundational Literacy',
    category: 'Classroom',
    imageUrl: '/images/gallery/reading-corner.svg',
    alt: 'Junior grade reading room cultivating vocabulary and lifelong learning',
  },
  {
    _id: 'g8',
    title: 'Annual Speech & Qirat Competition',
    category: 'Events',
    imageUrl: '/images/gallery/qirat-competition.svg',
    alt: 'Annual inter-class Qirat and speech recitation contest encouraging public speaking confidence',
  },
];

export const fallbackEvents: EventItem[] = [
  {
    _id: 'e1',
    title: 'Annual Prize Distribution Ceremony',
    category: 'Annual Prize Distribution',
    date: 'Annual Academic Milestone',
    description:
      'Honoring student dedication, academic merit, and exemplary conduct across Classes 1 through 8. Parents and faculty gather to celebrate student progress.',
    badge: 'Flagship Event',
    imageUrl: '/images/events/prize-distribution.svg',
  },
  {
    _id: 'e2',
    title: 'Academic Excellence & Progress Evaluations',
    category: 'Student Achievements',
    date: 'Termly Assessments',
    description:
      'Regular evaluation metrics ensuring every learner builds solid foundational literacy, numeracy, and disciplined study habits.',
    badge: 'Merit Milestone',
    imageUrl: '/images/events/student-achievements.svg',
  },
  {
    _id: 'e3',
    title: 'School Orientation & Character Building Week',
    category: 'School Events',
    date: 'Beginning of Term',
    description:
      'Instilling respect, civic responsibility, and moral consciousness as foundational pillars of the Madni Public School ethos.',
    badge: 'Values & Discipline',
    imageUrl: '/images/events/character-building.svg',
  },
  {
    _id: 'e4',
    title: 'Science Fair & Practical Learning Showcase',
    category: 'Academic Activities',
    date: 'Mid-Year Activity',
    description:
      'Hands-on demonstrations and project displays bridging textbook concepts with practical understanding for middle school students.',
    badge: 'Applied Learning',
    imageUrl: '/images/events/science-fair.svg',
  },
];

export async function fetchGallery(category?: string): Promise<GalleryItem[]> {
  try {
    const url = category && category !== 'All' 
      ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}`
      : `${API_BASE}/gallery`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch gallery');
    const data = await res.json();
    return data.data || fallbackGallery;
  } catch (error) {
    if (!category || category === 'All') return fallbackGallery;
    return fallbackGallery.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }
}

export async function fetchEvents(category?: string): Promise<EventItem[]> {
  try {
    const url = category && category !== 'all'
      ? `${API_BASE}/events?category=${encodeURIComponent(category)}`
      : `${API_BASE}/events`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch events');
    const data = await res.json();
    return data.data || fallbackEvents;
  } catch (error) {
    if (!category || category === 'all') return fallbackEvents;
    return fallbackEvents.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }
}

export async function submitContactForm(payload: {
  name: string;
  phone: string;
  email?: string;
  message: string;
  website_hp?: string;
}): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to submit inquiry');
  }
  return data;
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Authentication failed');
  }
  return data;
}

export async function checkAdminSession() {
  const res = await fetch(`${API_BASE}/auth/me`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.user || null;
}

export async function adminLogout() {
  await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
}

export async function fetchAdminInquiries(status?: string): Promise<InquiryItem[]> {
  const url = status && status !== 'all' 
    ? `${API_BASE}/admin/inquiries?status=${status}` 
    : `${API_BASE}/admin/inquiries`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch inquiries');
  const data = await res.json();
  return data.data;
}

export async function updateInquiryStatus(id: string, status: string, notes?: string) {
  const res = await fetch(`${API_BASE}/admin/inquiries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Update failed');
  return data;
}

export async function deleteInquiry(id: string) {
  const res = await fetch(`${API_BASE}/admin/inquiries/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Delete failed');
  return data;
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await fetch(`${API_BASE}/admin/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  const data = await res.json();
  return data.data;
}

export async function uploadGalleryItem(formData: FormData) {
  const res = await fetch(`${API_BASE}/gallery`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
}

export async function deleteGalleryItem(id: string) {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Delete failed');
  return data;
}

export async function createEventItem(eventData: any) {
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Event creation failed');
  return data;
}

export async function deleteEventItem(id: string) {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Event deletion failed');
  return data;
}
