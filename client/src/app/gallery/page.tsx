'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Maximize2, School, PhoneCall } from 'lucide-react';
import { SectionHeading } from '../../components/SectionHeading';
import { LightboxModal } from '../../components/LightboxModal';
import { fetchGallery, fallbackGallery } from '../../lib/api';
import { GALLERY_CATEGORIES, SCHOOL_INFO } from '../../lib/constants';
import { GalleryItem, GalleryCategory } from '../../types';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>(fallbackGallery);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [filteredImages, setFilteredImages] = useState<GalleryItem[]>(fallbackGallery);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchGallery().then((data) => {
      if (data && data.length > 0) setImages(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(
        images.filter((img) => img.category.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
  }, [selectedCategory, images]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-school-primary hover:text-emerald-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <SectionHeading
          badge="Campus Photo Archive"
          title="Madni Public School Gallery"
          description="Explore classrooms, science activities, morning assemblies, sports events, and annual ceremonies across Classes 1 to 8 in D.I. Khan."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="tablist">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-school-primary text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image._id || index}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              aria-label={`View full image: ${image.title}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={image.imageUrl}
                  alt={image.alt || image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-2.5 rounded-full bg-black/60">
                    <Maximize2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-slate-800 backdrop-blur-xs shadow-xs">
                  {image.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-bold text-school-text group-hover:text-school-primary transition-colors line-clamp-1">
                  {image.title}
                </h3>
                <p className="mt-1 text-xs text-school-muted line-clamp-2">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Admissions CTA Bar */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-heading text-school-text">
              Interested in Visiting Our Campus?
            </h3>
            <p className="text-sm text-school-muted">
              We welcome parents to visit Madni Public School and explore our academic facilities in
              person.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-xl bg-school-primary hover:bg-school-primary-dark text-white font-bold text-sm shadow-xs transition-colors"
            >
              Contact for Admission
            </Link>
            <a
              href={SCHOOL_INFO.phoneTel}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-school-primary" />
              <span>{SCHOOL_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Accessible Lightbox */}
      <LightboxModal
        isOpen={isLightboxOpen}
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
