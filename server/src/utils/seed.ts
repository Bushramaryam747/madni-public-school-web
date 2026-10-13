import { connectDB } from '../config/db.js';
import { AdminUser } from '../models/AdminUser.js';
import { GalleryImage } from '../models/GalleryImage.js';
import { SchoolEvent } from '../models/Event.js';
import { config } from '../config/index.js';
import { initialMockGallery, initialMockEvents } from './mockDataStore.js';

export const seedDatabase = async () => {
  console.log('[Seed] Initializing database seeding...');
  const connected = await connectDB();
  if (!connected) {
    console.log('[Seed] Database not connected. Using fallback in-memory store.');
    return;
  }

  try {
    // 1. Seed Admin User
    const existingAdmin = await AdminUser.findOne({
      email: config.adminSeed.email.toLowerCase(),
    });

    if (!existingAdmin) {
      const newAdmin = new AdminUser({
        email: config.adminSeed.email.toLowerCase(),
        password: config.adminSeed.password,
        role: 'admin',
      });
      await newAdmin.save();
      console.log(`[Seed] Admin user created: ${config.adminSeed.email}`);
    } else {
      console.log(`[Seed] Admin user already exists: ${config.adminSeed.email}`);
    }

    // 2. Seed Gallery Images
    const galleryCount = await GalleryImage.countDocuments();
    if (galleryCount === 0) {
      const galleryData = initialMockGallery.map((item) => ({
        title: item.title,
        category: item.category,
        imageUrl: item.imageUrl,
        alt: item.alt,
      }));
      await GalleryImage.insertMany(galleryData);
      console.log(`[Seed] Seeded ${galleryData.length} gallery images.`);
    } else {
      console.log(`[Seed] Gallery already contains ${galleryCount} items.`);
    }

    // 3. Seed Events
    const eventsCount = await SchoolEvent.countDocuments();
    if (eventsCount === 0) {
      const eventsData = initialMockEvents.map((item) => ({
        title: item.title,
        category: item.category,
        date: item.date,
        description: item.description,
        badge: item.badge,
        imageUrl: item.imageUrl,
      }));
      await SchoolEvent.insertMany(eventsData);
      console.log(`[Seed] Seeded ${eventsData.length} events and milestones.`);
    } else {
      console.log(`[Seed] Events already contains ${eventsCount} items.`);
    }

    console.log('[Seed] Seeding completed successfully.');
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
  }
};

// If run directly from CLI
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  seedDatabase().then(() => {
    process.exit(0);
  });
}
