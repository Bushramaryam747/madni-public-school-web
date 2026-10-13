import { IInquiry, IGalleryImage, IEvent } from '../types/index.js';

export const initialMockGallery: IGalleryImage[] = [
  {
    _id: 'g1',
    title: 'School Campus & Main Entrance',
    category: 'School Building',
    imageUrl: '/images/gallery/campus-building.svg',
    alt: 'Madni Public School front building and main entrance gate in Madni Town D.I. Khan',
    createdAt: new Date('2024-01-15'),
  },
  {
    _id: 'g2',
    title: 'Primary Wing Interactive Classroom',
    category: 'Classroom',
    imageUrl: '/images/gallery/primary-classroom.svg',
    alt: 'Primary students attending regular coursework in well-ventilated classroom with teacher',
    createdAt: new Date('2024-02-10'),
  },
  {
    _id: 'g3',
    title: 'Middle Wing Practical Science & Math Session',
    category: 'Learning',
    imageUrl: '/images/gallery/science-learning.svg',
    alt: 'Middle grade students engaged in collaborative science and mathematics concepts',
    createdAt: new Date('2024-03-05'),
  },
  {
    _id: 'g4',
    title: 'Annual Academic Prize Distribution',
    category: 'Prize Distribution',
    imageUrl: '/images/gallery/prize-distribution.svg',
    alt: 'Merit recognition ceremony and certificate awards for top academic performers',
    createdAt: new Date('2024-04-20'),
  },
  {
    _id: 'g5',
    title: 'Outdoor Physical Education & Sports Day',
    category: 'Sports',
    imageUrl: '/images/gallery/sports-activity.svg',
    alt: 'Students participating in physical fitness exercises and sports activities on school grounds',
    createdAt: new Date('2024-05-12'),
  },
  {
    _id: 'g6',
    title: 'Morning Assembly & Moral Education Session',
    category: 'Events',
    imageUrl: '/images/gallery/morning-assembly.svg',
    alt: 'Disciplined morning assembly fostering values, national pride, and character building',
    createdAt: new Date('2024-06-01'),
  },
  {
    _id: 'g7',
    title: 'Early Reading & Handwriting Development',
    category: 'Classroom',
    imageUrl: '/images/gallery/reading-corner.svg',
    alt: 'Foundational literacy and handwriting practice for junior classes',
    createdAt: new Date('2024-06-15'),
  },
  {
    _id: 'g8',
    title: 'Annual Speech & Qirat Competition',
    category: 'Events',
    imageUrl: '/images/gallery/qirat-competition.svg',
    alt: 'Annual inter-class Qirat and speech recitation contest encouraging public speaking confidence',
    createdAt: new Date('2024-07-02'),
  },
];

export const initialMockEvents: IEvent[] = [
  {
    _id: 'e1',
    title: 'Annual Prize Distribution Ceremony',
    category: 'Annual Prize Distribution',
    date: 'Annual Academic Milestone',
    description:
      'Honoring student dedication, academic merit, and exemplary conduct across Classes 1 through 8. Parents and faculty gather to celebrate student progress.',
    badge: 'Flagship Event',
    imageUrl: '/images/events/prize-distribution.svg',
    createdAt: new Date('2024-01-20'),
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
    createdAt: new Date('2024-02-15'),
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
    createdAt: new Date('2024-03-10'),
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
    createdAt: new Date('2024-04-05'),
  },
];

class MockStore {
  inquiries: IInquiry[] = [
    {
      _id: 'inq-1',
      name: 'Mohammad Farooq',
      phone: '0300-1234567',
      email: 'm.farooq@example.com',
      message: 'Inquiring regarding admission requirements and fee structure for Class 4 for the upcoming session.',
      status: 'new',
      notes: 'Parent requested callback in evening.',
      createdAt: new Date(Date.now() - 3600000 * 4),
    },
    {
      _id: 'inq-2',
      name: 'Tariq Mehmood',
      phone: '0312-9876543',
      email: 'tariq.m@example.com',
      message: 'Looking for Class 6 admission details and curriculum information.',
      status: 'contacted',
      notes: 'Called parent, shared syllabus and admission timing.',
      createdAt: new Date(Date.now() - 86400000 * 2),
    }
  ];

  gallery: IGalleryImage[] = [...initialMockGallery];
  events: IEvent[] = [...initialMockEvents];

  getInquiries(status?: string) {
    if (!status || status === 'all') return this.inquiries;
    return this.inquiries.filter((inq) => inq.status === status);
  }

  addInquiry(inquiry: Omit<IInquiry, '_id' | 'createdAt' | 'status'>) {
    const newInquiry: IInquiry = {
      _id: 'inq-' + Date.now(),
      ...inquiry,
      status: 'new',
      createdAt: new Date(),
    };
    this.inquiries.unshift(newInquiry);
    return newInquiry;
  }

  updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'archived', notes?: string) {
    const item = this.inquiries.find((inq) => inq._id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      item.updatedAt = new Date();
      return item;
    }
    return null;
  }

  deleteInquiry(id: string) {
    const index = this.inquiries.findIndex((inq) => inq._id === id);
    if (index !== -1) {
      this.inquiries.splice(index, 1);
      return true;
    }
    return false;
  }

  getGallery(category?: string) {
    if (!category || category === 'All') return this.gallery;
    return this.gallery.filter((g) => g.category.toLowerCase() === category.toLowerCase());
  }

  addGallery(item: Omit<IGalleryImage, '_id' | 'createdAt'>) {
    const newItem: IGalleryImage = {
      _id: 'g-' + Date.now(),
      ...item,
      createdAt: new Date(),
    };
    this.gallery.unshift(newItem);
    return newItem;
  }

  deleteGallery(id: string) {
    const index = this.gallery.findIndex((g) => g._id === id);
    if (index !== -1) {
      this.gallery.splice(index, 1);
      return true;
    }
    return false;
  }

  getEvents(category?: string) {
    if (!category || category === 'all') return this.events;
    return this.events.filter((e) => e.category.toLowerCase() === category.toLowerCase());
  }

  addEvent(item: Omit<IEvent, '_id' | 'createdAt'>) {
    const newItem: IEvent = {
      _id: 'e-' + Date.now(),
      ...item,
      createdAt: new Date(),
    };
    this.events.unshift(newItem);
    return newItem;
  }

  updateEvent(id: string, data: Partial<IEvent>) {
    const item = this.events.find((e) => e._id === id);
    if (item) {
      Object.assign(item, data, { updatedAt: new Date() });
      return item;
    }
    return null;
  }

  deleteEvent(id: string) {
    const index = this.events.findIndex((e) => e._id === id);
    if (index !== -1) {
      this.events.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const mockStore = new MockStore();
