'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  School,
  Calendar,
  Building,
  Maximize2,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ContactForm } from '../components/ContactForm';
import { LightboxModal } from '../components/LightboxModal';
import {
  SCHOOL_INFO,
  WHY_CHOOSE_CARDS,
  ACADEMIC_WINGS,
  ACADEMIC_PILLARS,
  GALLERY_CATEGORIES,
} from '../lib/constants';
import { fetchGallery, fetchEvents, fallbackGallery, fallbackEvents } from '../lib/api';
import { GalleryItem, EventItem, GalleryCategory } from '../types';

export default function HomePage() {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(fallbackGallery);
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [filteredGallery, setFilteredGallery] = useState<GalleryItem[]>(fallbackGallery);

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    // Load dynamic gallery and events from API
    fetchGallery().then((data) => {
      if (data && data.length > 0) setGalleryImages(data);
    });
    fetchEvents().then((data) => {
      if (data && data.length > 0) setEvents(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredGallery(galleryImages);
    } else {
      setFilteredGallery(
        galleryImages.filter(
          (img) => img.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, galleryImages]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Icon mapping helper for Why Choose Us
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-school-primary', 'aria-hidden': true };
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Lightbulb':
        return <Lightbulb {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      default:
        return <Award {...props} />;
    }
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          1. HERO SECTION
         ========================================================================= */}
      <section
        id="home"
        className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-slate-100"
      >
        {/* Subtle background ornamentation */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* 23 Years Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-school-primary border border-emerald-200 shadow-xs text-xs sm:text-sm font-bold">
                <span className="flex h-2 w-2 rounded-full bg-school-accent" />
                <span>{SCHOOL_INFO.yearsOfExcellence}</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600 font-semibold">{SCHOOL_INFO.classesOffered}</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold font-heading text-school-text tracking-tight leading-[1.15]">
                {SCHOOL_INFO.name}
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl font-semibold text-school-secondary leading-snug">
                {SCHOOL_INFO.tagline}
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-school-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {SCHOOL_INFO.description} Located in Madni Town, near Shah Alam Abad, D.I. Khan,
                fostering disciplined minds and noble character.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/#about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-school-primary hover:bg-school-primary-dark text-white font-bold text-base shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <span>Explore Our School</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                </Link>

                <Link
                  href="/#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-school-text font-bold text-base border border-slate-300 shadow-xs hover:border-slate-400 transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-school-primary" aria-hidden="true" />
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Direct Tap-to-Call on Mobile Reminder */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-500">
                <Phone className="w-3.5 h-3.5 text-school-primary" />
                <span>Admission Desk:</span>
                <a
                  href={SCHOOL_INFO.phoneTel}
                  className="font-bold text-school-primary hover:underline"
                >
                  {SCHOOL_INFO.phoneFormatted}
                </a>
              </div>
            </div>

            {/* Right Visual Column (School Building Photo Placeholder) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] group">
                  <Image
                    src="/images/hero/school-building.svg"
                    alt="Madni Public School Campus Building in Madni Town D.I. Khan"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Campus Overview
                    </span>
                    <h2 className="text-lg font-bold font-heading text-white">
                      Madni Public School Building
                    </h2>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Madni Town, near Shah Alam Abad, D.I. Khan
                    </p>
                  </div>
                </div>

                {/* Floating Highlights Tag */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-school-primary flex-shrink-0">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase">
                      Campus Wing
                    </span>
                    <span className="block text-sm font-extrabold text-school-text">
                      Classes 1 through 8
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Institutional Metrics Strip */}
          <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-school-primary font-heading">
                23 Years
              </span>
              <span className="block text-xs sm:text-sm font-medium text-school-muted mt-1">
                Educational Excellence
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-school-secondary font-heading">
                Classes 1–8
              </span>
              <span className="block text-xs sm:text-sm font-medium text-school-muted mt-1">
                Primary &amp; Middle Wing
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-school-primary font-heading">
                Moral Values
              </span>
              <span className="block text-xs sm:text-sm font-medium text-school-muted mt-1">
                Character &amp; Discipline
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-school-secondary font-heading">
                D.I. Khan
              </span>
              <span className="block text-xs sm:text-sm font-medium text-school-muted mt-1">
                Madni Town, KPK
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ABOUT SECTION
         ========================================================================= */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="About Madni Public School"
            title="Building Knowledge, Character & A Brighter Future"
            description="Established with a commitment to providing structured, high-standard schooling in Dera Ismail Khan, combining scholastic rigor with deep moral principles."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image / Campus Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
                <Image
                  src="/images/gallery/campus-building.svg"
                  alt="Madni Public School campus entrance and building"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <Building className="w-4 h-4 text-school-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Madni Public School Campus</strong>: Madni Town, near Shah Alam Abad,
                  D.I. Khan. Established in 2001 with 23 years of continuous community service.
                </span>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-school-muted text-base leading-relaxed">
                <p>
                  At <strong className="text-school-text">Madni Public School</strong>, we believe
                  education transcends textbook rote learning. Our core mission is the balanced
                  development of every child: fostering intellectual curiosity, disciplined study
                  habits, moral integrity, and social responsibility.
                </p>

                <p>
                  Serving learners from <strong className="text-school-text">Classes 1 through 8</strong>,
                  our curriculum is carefully structured to build a strong educational foundation. In
                  junior grades, we focus on literacy fluency in Urdu and English, essential numeracy,
                  and creative observation. As students progress into middle school, we advance their
                  analytical comprehension in the sciences and mathematics.
                </p>

                <p>
                  Central to our educational philosophy is character building. We nurture mutual
                  respect, civic consciousness, honesty, and confidence so our graduates grow into
                  responsible citizens who honor their families and contribute positively to society.
                </p>
              </div>

              {/* Core Institutional Values List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Disciplined & safe learning environment',
                  'Strong moral values & character building',
                  'Experienced, caring teaching faculty',
                  'Conceptual focus in Math & Sciences',
                  'Regular progress monitoring & feedback',
                  'Confidence & public expression focus',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-school-accent flex-shrink-0" />
                    <span className="text-sm font-semibold text-school-text">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/#academics"
                  className="inline-flex items-center gap-2 text-sm font-bold text-school-primary hover:text-emerald-800 transition-colors"
                >
                  <span>Explore Academic Programs (Classes 1 to 8)</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ACADEMICS SECTION (Classes 1-8)
         ========================================================================= */}
      <section id="academics" className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Academic Framework"
            title="Comprehensive Education for Classes 1 to 8"
            description="A progressive academic trajectory designed to transition young learners from foundational literacy and numeracy into structured analytical mastery."
          />

          {/* Primary and Middle Wing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {ACADEMIC_WINGS.map((wing, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        wing.color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          : 'bg-blue-100 text-blue-900 border border-blue-200'
                      }`}
                    >
                      {wing.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Madni Public School</span>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-school-text">
                    {wing.title}
                  </h3>
                  <p className="text-sm font-semibold text-school-secondary mt-1">
                    {wing.subtitle}
                  </p>

                  <p className="mt-4 text-sm text-school-muted leading-relaxed">
                    {wing.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                      Curriculum Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {wing.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-school-accent flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/#admissions"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-school-primary hover:underline"
                  >
                    <span>Enroll your child for {wing.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Pillars: Experienced Teaching & Student-Centered Learning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACADEMIC_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-school-primary flex items-center justify-center flex-shrink-0 border border-emerald-100">
                  <BookOpen className="w-6 h-6 text-school-primary" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold font-heading text-school-text">
                    {pillar.title}
                  </h4>
                  <p className="mt-1 text-sm text-school-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Paragraph */}
          <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200/80 text-center max-w-3xl mx-auto shadow-xs">
            <p className="text-sm sm:text-base text-school-muted leading-relaxed">
              By combining a strong educational foundation with practical learning skills, Madni Public
              School prepares every student to transition smoothly into secondary education with
              academic confidence, analytical thinking, and disciplined habits.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE MADNI PUBLIC SCHOOL (6 Cards)
         ========================================================================= */}
      <section id="why-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Institutional Strengths"
            title="Why Choose Madni Public School?"
            description="With 23 years of dedication to families in D.I. Khan, we are committed to building both character and intellect."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CHOOSE_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-school-primary flex items-center justify-center mb-5 border border-emerald-100 group-hover:bg-school-primary group-hover:text-white transition-colors duration-200">
                  {renderIcon(card.iconName)}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-heading text-school-text group-hover:text-school-primary transition-colors">
                  {card.title}
                </h3>

                <p className="mt-2.5 text-sm text-school-muted leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ACTIVITIES & GALLERY PREVIEW WITH ACCESSIBLE LIGHTBOX
         ========================================================================= */}
      <section id="activities" className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="School Life &amp; Activities"
            title="Activities &amp; Campus Gallery"
            description="A glimpse into academic learning, moral assemblies, classroom discovery, and student development across Classes 1 to 8."
          />

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist">
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

          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.slice(0, 8).map((image, index) => (
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
                aria-label={`View photo: ${image.title}`}
              >
                {/* Image Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={image.imageUrl}
                    alt={image.alt || image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="p-2.5 rounded-full bg-black/60">
                      <Maximize2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-slate-800 backdrop-blur-xs shadow-xs">
                    {image.category}
                  </span>
                </div>

                {/* Caption Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="text-sm font-bold text-school-text group-hover:text-school-primary transition-colors line-clamp-1">
                    {image.title}
                  </h4>
                  <p className="mt-1 text-xs text-school-muted line-clamp-2">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Link to Full Gallery Page */}
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-school-primary font-bold text-sm border border-slate-300 shadow-xs transition-colors"
            >
              <span>View Full Campus Photo Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. ACHIEVEMENTS & EVENTS SECTION
         ========================================================================= */}
      <section id="achievements" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Milestones &amp; Assemblies"
            title="Achievements &amp; School Events"
            description="Marking academic progress, extracurricular participation, and annual ceremonies that motivate students throughout the school year."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, idx) => (
              <div
                key={event._id || idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col overflow-hidden"
              >
                {/* Event Image Box */}
                <div className="relative aspect-[16/10] w-full bg-slate-100">
                  <Image
                    src={event.imageUrl || '/images/events/character-building.svg'}
                    alt={event.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  {event.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-school-primary text-white shadow-xs">
                      {event.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-school-secondary mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>

                    <h3 className="text-base font-bold font-heading text-school-text">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-school-muted leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-emerald-800">{event.category}</span>
                    <span>Madni Public School</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. MESSAGE FROM THE SCHOOL ADMINISTRATION
         ========================================================================= */}
      <section id="administration" className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Administration Message"
            title="Message from the School Administration"
            description="Our enduring commitment to educational discipline, moral uprightness, and students' bright futures."
          />

          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Photo Placeholder */}
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 bg-slate-100">
                  <Image
                    src="/images/admin/principal-photo.svg"
                    alt="School Administration photograph placeholder"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="mt-4 text-base font-bold text-school-text font-heading">
                  School Administration
                </h4>
                <p className="text-xs font-semibold text-school-secondary">
                  Madni Public School, D.I. Khan
                </p>
              </div>

              {/* Administration Narrative */}
              <div className="md:col-span-8 space-y-4 text-school-muted text-sm sm:text-base leading-relaxed">
                <p>
                  <em>
                    &ldquo;For over twenty-three years, our guiding mission at Madni Public School has
                    remained resolute: to nurture a learning atmosphere grounded in knowledge,
                    disciplined conduct, and strong moral consciousness.&rdquo;
                  </em>
                </p>

                <p>
                  We believe that the early and middle school years (Classes 1 through 8) are the most
                  vital developmental period of a child’s life. When children receive clear conceptual
                  instruction combined with sincere encouragement and moral grounding, they flourish
                  both academically and ethically.
                </p>

                <p>
                  We warmly invite parents in D.I. Khan to partner with us in shaping confident,
                  courteous, and well-educated young individuals ready to achieve future milestones.
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs font-bold text-school-primary">
                  <span>23 Years of Service</span>
                  <span>•</span>
                  <span>Madni Town, D.I. Khan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. ADMISSIONS OPEN PROMINENT SECTION
         ========================================================================= */}
      <section
        id="admissions"
        className="py-16 sm:py-20 bg-gradient-to-r from-school-primary via-emerald-800 to-school-primary-dark text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-emerald-200 border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-school-accent" />
            <span>Admissions Open for Classes 1 to 8</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white max-w-3xl mx-auto leading-tight">
            Give Your Child the Opportunity to Learn, Grow, and Build a Successful Future
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Quality education, experienced teachers, and disciplined moral values for your child’s
            most foundational schooling years.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-school-primary font-extrabold text-base shadow-lg transition-transform active:scale-95"
            >
              <GraduationCap className="w-5 h-5 text-school-primary" />
              <span>Contact Us for Admission</span>
            </Link>

            <a
              href={SCHOOL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base border border-emerald-400/40 shadow-sm transition-transform active:scale-95"
            >
              <span>Instant WhatsApp Inquiry</span>
            </a>
          </div>

          <p className="mt-6 text-xs text-emerald-200/90">
            Helpline: <strong className="text-white">{SCHOOL_INFO.phoneFormatted}</strong> •
            Madni Town, near Shah Alam Abad, D.I. Khan
          </p>
        </div>
      </section>

      {/* =========================================================================
          9. CONTACT SECTION (Map, Details & Working Form)
         ========================================================================= */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Get in Touch"
            title="Contact Madni Public School"
            description="Have questions regarding admissions, curriculum, or visiting our campus? Reach out to our administrative desk."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Campus Details & Google Maps Embed */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
                <h3 className="text-xl font-bold font-heading text-school-text">
                  Campus Address &amp; Contact
                </h3>

                <div className="space-y-4 text-sm text-school-muted">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-school-primary flex items-center justify-center flex-shrink-0 border border-emerald-100">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-school-text font-semibold">Location:</strong>
                      <span>{SCHOOL_INFO.address.full}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-school-primary flex items-center justify-center flex-shrink-0 border border-emerald-100">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-school-text font-semibold">Phone (Tap to Call):</strong>
                      <a
                        href={SCHOOL_INFO.phoneTel}
                        className="text-school-primary font-bold hover:underline"
                      >
                        {SCHOOL_INFO.phoneFormatted}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-school-primary flex items-center justify-center flex-shrink-0 border border-emerald-100">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-school-text font-semibold">Email:</strong>
                      <span>{SCHOOL_INFO.emailPlaceholder}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-school-primary flex items-center justify-center flex-shrink-0 border border-emerald-100">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-school-text font-semibold">Office Hours:</strong>
                      <span>{SCHOOL_INFO.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={SCHOOL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-xs"
                  >
                    <span>Message School on WhatsApp</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Embedded Google Map Placeholder */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <div className="p-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-school-primary" />
                    <span>Madni Town, near Shah Alam Abad, D.I. Khan</span>
                  </div>
                  <a
                    href={SCHOOL_INFO.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-school-secondary hover:underline flex items-center gap-1"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative w-full h-64 sm:h-72">
                  <iframe
                    title="Madni Public School Location Map"
                    src={SCHOOL_INFO.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Working Contact Form */}
            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        images={filteredGallery}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
