'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Inbox,
  Image as ImageIcon,
  Calendar,
  BarChart3,
  LogOut,
  Trash2,
  CheckCircle,
  Phone,
  Mail,
  Plus,
  RefreshCw,
  ExternalLink,
  Shield,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  checkAdminSession,
  adminLogout,
  fetchAdminInquiries,
  updateInquiryStatus,
  deleteInquiry,
  fetchGallery,
  uploadGalleryItem,
  deleteGalleryItem,
  fetchEvents,
  createEventItem,
  deleteEventItem,
  fetchAdminStats,
  fallbackGallery,
  fallbackEvents,
} from '../../lib/api';
import { GALLERY_CATEGORIES, SCHOOL_INFO } from '../../lib/constants';
import { InquiryItem, GalleryItem, EventItem, AdminStats, GalleryCategory, EventCategory } from '../../types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'gallery' | 'events' | 'stats'>('inquiries');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Inquiries state
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'contacted'>('all');
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // Gallery state
  const [gallery, setGallery] = useState<GalleryItem[]>(fallbackGallery);
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCategory, setNewImageCategory] = useState<GalleryCategory>('Classroom');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Events state
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<EventCategory>('School Events');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventBadge, setNewEventBadge] = useState('Annual Highlight');
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  // Stats state
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // 1. Session verification
  const checkSession = useCallback(async () => {
    try {
      const user = await checkAdminSession();
      if (!user) {
        // If not authenticated, redirect to login
        router.push('/admin/login');
      } else {
        setCurrentUser(user);
      }
    } catch {
      router.push('/admin/login');
    } finally {
      setIsLoadingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // 2. Load Inquiries
  const loadInquiries = useCallback(async () => {
    setIsLoadingInquiries(true);
    try {
      const data = await fetchAdminInquiries(inquiryFilter);
      setInquiries(data || []);
    } catch (err) {
      console.warn('Could not fetch inquiries:', err);
    } finally {
      setIsLoadingInquiries(false);
    }
  }, [inquiryFilter]);

  // 3. Load Gallery
  const loadGallery = useCallback(async () => {
    try {
      const data = await fetchGallery();
      setGallery(data || fallbackGallery);
    } catch (err) {
      console.warn('Could not fetch gallery:', err);
    }
  }, []);

  // 4. Load Events
  const loadEvents = useCallback(async () => {
    try {
      const data = await fetchEvents();
      setEvents(data || fallbackEvents);
    } catch (err) {
      console.warn('Could not fetch events:', err);
    }
  }, []);

  // 5. Load Stats
  const loadStats = useCallback(async () => {
    try {
      const data = await fetchAdminStats();
      setStats(data);
    } catch (err) {
      console.warn('Could not fetch stats:', err);
    }
  }, []);

  useEffect(() => {
    if (!isLoadingAuth) {
      loadInquiries();
      loadGallery();
      loadEvents();
      loadStats();
    }
  }, [isLoadingAuth, loadInquiries, loadGallery, loadEvents, loadStats]);

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Inquiry actions
  const handleToggleInquiryStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'new' ? 'contacted' : 'new';
    try {
      await updateInquiryStatus(id, nextStatus);
      showNotification(`Inquiry marked as ${nextStatus}`);
      loadInquiries();
      loadStats();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this parent inquiry?')) return;
    try {
      await deleteInquiry(id);
      showNotification('Inquiry deleted');
      loadInquiries();
      loadStats();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Gallery actions
  const handleAddGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageTitle || !newImageAlt) {
      alert('Please provide title and alt text');
      return;
    }
    if (!newImageFile && !newImageUrl) {
      alert('Please provide either an image file or an image URL');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', newImageTitle);
      formData.append('category', newImageCategory);
      formData.append('alt', newImageAlt);
      if (newImageFile) {
        formData.append('image', newImageFile);
      } else if (newImageUrl) {
        formData.append('imageUrl', newImageUrl);
      }

      await uploadGalleryItem(formData);
      showNotification('Image uploaded successfully to gallery');
      setNewImageTitle('');
      setNewImageAlt('');
      setNewImageUrl('');
      setNewImageFile(null);
      loadGallery();
      loadStats();
    } catch (error: any) {
      alert(error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    if (!confirm('Delete this gallery image?')) return;
    try {
      await deleteGalleryItem(id);
      showNotification('Gallery image deleted');
      loadGallery();
      loadStats();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Events actions
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventDescription) {
      alert('Please fill in all required event fields');
      return;
    }

    setIsCreatingEvent(true);
    try {
      await createEventItem({
        title: newEventTitle,
        category: newEventCategory,
        date: newEventDate,
        description: newEventDescription,
        badge: newEventBadge,
        imageUrl: '/images/events/character-building.svg',
      });
      showNotification('Event created successfully');
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventDescription('');
      loadEvents();
      loadStats();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsCreatingEvent(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    try {
      await deleteEventItem(id);
      showNotification('Event deleted');
      loadEvents();
      loadStats();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    router.push('/admin/login');
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-school-primary mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Verifying administrator session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <Image
              src="/images/logo/madni-logo.svg"
              alt="Madni Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-base text-slate-900 leading-tight">
              Madni Public School — Admin Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Classes 1–8 | Madni Town, D.I. Khan | Admin: {currentUser?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Floating Action Toast Notification */}
      {actionMessage && (
        <div className="fixed top-16 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 space-x-2 sm:space-x-4 mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'inquiries'
                ? 'border-school-primary text-school-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Parent Inquiries</span>
            {inquiries.filter((i) => i.status === 'new').length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-700 font-extrabold">
                {inquiries.filter((i) => i.status === 'new').length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-school-primary text-school-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Management</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'events'
                ? 'border-school-primary text-school-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events &amp; Achievements</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'stats'
                ? 'border-school-primary text-school-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview &amp; Metrics</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: INQUIRIES MANAGEMENT
           ========================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Filter Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Filter:</span>
                {(['all', 'new', 'contacted'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setInquiryFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                      inquiryFilter === filter
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={loadInquiries}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingInquiries ? 'animate-spin' : ''}`} />
                <span>Refresh Inquiries</span>
              </button>
            </div>

            {/* Inquiries List */}
            {inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No Inquiries Found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Parent inquiries submitted via the website contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className={`bg-white rounded-2xl p-5 border transition-all ${
                      inq.status === 'new'
                        ? 'border-emerald-300 shadow-xs ring-1 ring-emerald-200'
                        : 'border-slate-200 opacity-90'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-base font-bold text-slate-900 font-heading">
                            {inq.name}
                          </h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              inq.status === 'new'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                          <a
                            href={`tel:${inq.phone}`}
                            className="inline-flex items-center gap-1 font-bold text-school-primary hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{inq.phone}</span>
                          </a>

                          {inq.email && (
                            <a
                              href={`mailto:${inq.email}`}
                              className="inline-flex items-center gap-1 text-slate-600 hover:underline"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{inq.email}</span>
                            </a>
                          )}

                          <span>
                            Submitted: {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleInquiryStatus(inq._id, inq.status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            inq.status === 'new'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                          }`}
                        >
                          {inq.status === 'new' ? 'Mark as Contacted' : 'Mark as New'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          aria-label="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {inq.message}
                    </div>

                    {inq.notes && (
                      <div className="mt-2 text-xs text-slate-500 italic">
                        <strong>Admin Note:</strong> {inq.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: GALLERY MANAGEMENT
           ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            {/* Add Image Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-school-primary" />
                <span>Add Photo to Campus Gallery</span>
              </h3>

              <form onSubmit={handleAddGalleryImage} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newImageTitle}
                    onChange={(e) => setNewImageTitle(e.target.value)}
                    placeholder="e.g. Science Laboratory Session"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newImageCategory}
                    onChange={(e) => setNewImageCategory(e.target.value as GalleryCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    {GALLERY_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Accessible Alt Text *
                  </label>
                  <input
                    type="text"
                    required
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                    placeholder="Descriptive explanation for screen readers"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload File or Specify Image Path
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                      className="text-xs file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2.5 rounded-xl bg-school-primary hover:bg-school-primary-dark text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    {isUploading ? 'Uploading...' : 'Save Image to Gallery'}
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Images Grid */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Current Gallery Items ({gallery.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.map((img) => (
                  <div
                    key={img._id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs relative group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] w-full bg-slate-100">
                      <Image
                        src={img.imageUrl}
                        alt={img.alt || img.title}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryImage(img._id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] font-bold text-school-primary uppercase">
                        {img.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{img.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: EVENTS & ACHIEVEMENTS MANAGEMENT
           ========================================================================= */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            {/* Create Event Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-school-primary" />
                <span>Create Announcement or Milestone Event</span>
              </h3>

              <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="e.g. Annual Speech Contest"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newEventCategory}
                    onChange={(e) => setNewEventCategory(e.target.value as EventCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Annual Prize Distribution">Annual Prize Distribution</option>
                    <option value="Student Achievements">Student Achievements</option>
                    <option value="School Events">School Events</option>
                    <option value="Academic Activities">Academic Activities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date / Term Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    placeholder="e.g. Term Assessment 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={newEventBadge}
                    onChange={(e) => setNewEventBadge(e.target.value)}
                    placeholder="e.g. Annual Highlight"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Event Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    placeholder="Detailed description of the academic activity or ceremony..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={isCreatingEvent}
                    className="px-6 py-2.5 rounded-xl bg-school-primary hover:bg-school-primary-dark text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    {isCreatingEvent ? 'Saving...' : 'Publish Event'}
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Events List */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Published Events ({events.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev) => (
                  <div
                    key={ev._id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-school-primary uppercase">
                          {ev.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(ev._id)}
                          className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 font-heading">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-school-secondary font-semibold mt-0.5">
                        {ev.date}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Badge: {ev.badge || 'None'}</span>
                      <span>Madni Public School</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: OVERVIEW & SYSTEM METRICS
           ========================================================================= */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Inquiries</span>
                <span className="block text-3xl font-extrabold text-slate-900 font-heading mt-2">
                  {stats?.totalInquiries ?? inquiries.length}
                </span>
                <span className="block text-xs text-emerald-600 font-semibold mt-1">
                  {stats?.newInquiries ?? inquiries.filter((i) => i.status === 'new').length} New Uncontacted
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase">Gallery Photos</span>
                <span className="block text-3xl font-extrabold text-school-primary font-heading mt-2">
                  {stats?.totalGallery ?? gallery.length}
                </span>
                <span className="block text-xs text-slate-500 font-semibold mt-1">
                  Across 6 categories
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase">School Events</span>
                <span className="block text-3xl font-extrabold text-school-secondary font-heading mt-2">
                  {stats?.totalEvents ?? events.length}
                </span>
                <span className="block text-xs text-slate-500 font-semibold mt-1">
                  Announcements &amp; Milestones
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase">Database Status</span>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      stats?.databaseConnected ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <span className="text-sm font-bold text-slate-800">
                    {stats?.databaseConnected ? 'MongoDB Connected' : 'Mock/Local Store Active'}
                  </span>
                </div>
                <span className="block text-[11px] text-slate-500 mt-1">
                  {stats?.databaseConnected
                    ? 'MongoDB Atlas Cluster Active'
                    : 'Atlas URI can be configured via .env'}
                </span>
              </div>
            </div>

            {/* School Profile Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold font-heading text-slate-900">
                Institutional Details &amp; Directory
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
                <div>
                  <strong>School Name:</strong> {SCHOOL_INFO.name}
                </div>
                <div>
                  <strong>Academic Scope:</strong> {SCHOOL_INFO.classesOffered}
                </div>
                <div>
                  <strong>Location:</strong> {SCHOOL_INFO.address.full}
                </div>
                <div>
                  <strong>Helpline / Tap-to-Call:</strong> {SCHOOL_INFO.phoneFormatted}
                </div>
                <div>
                  <strong>Legacy:</strong> {SCHOOL_INFO.yearsOfExcellence} (Est. {SCHOOL_INFO.establishedYear})
                </div>
                <div>
                  <strong>Admin Email:</strong> {currentUser?.email}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
