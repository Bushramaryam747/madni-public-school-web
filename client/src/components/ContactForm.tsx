'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone } from 'lucide-react';
import { submitContactForm } from '../lib/api';
import { SCHOOL_INFO } from '../lib/constants';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter your full name (at least 2 letters)')
    .max(100, 'Name cannot exceed 100 characters'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number (at least 10 digits)')
    .max(25, 'Phone number cannot exceed 25 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Please enter numbers only (e.g. 0318-9969994)'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Please share your inquiry or class level (at least 10 characters)')
    .max(2000, 'Message cannot exceed 2000 characters'),
  website_hp: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    message: '',
    website_hp: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field once user starts typing
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setStatusMessage('');

    // Client-side Zod validation
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormValues] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await submitContactForm(formData);
      setSubmitStatus('success');
      setStatusMessage(
        response.message ||
          'Thank you! Your admission inquiry has been received. Our administration will contact you shortly.'
      );
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        website_hp: '',
      });
    } catch (error: any) {
      setSubmitStatus('error');
      setStatusMessage(
        error.message ||
          'Unable to submit inquiry right now. Please call us directly at 0318-9969994.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-200/80">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-school-text">
          Send Admission Inquiry
        </h3>
        <p className="mt-1 text-sm text-school-muted">
          Fill out the details below and our school administration will get back to you promptly.
        </p>
      </div>

      {submitStatus === 'success' ? (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-emerald-900">Inquiry Submitted!</h4>
            <p className="mt-1 text-sm text-emerald-800 leading-relaxed">{statusMessage}</p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSubmitStatus('idle')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Honeypot anti-spam trap (invisible to human users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">Leave this empty</label>
            <input
              type="text"
              id="website_hp"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {submitStatus === 'error' && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
              <div>
                <p className="font-semibold">Submission Issue</p>
                <p className="text-xs text-red-700 mt-0.5">{statusMessage}</p>
                <a
                  href={SCHOOL_INFO.phoneTel}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-900 underline mt-2"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call {SCHOOL_INFO.phoneFormatted} directly</span>
                </a>
              </div>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Parent / Guardian Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Mohammad Tariq"
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:bg-white ${
                errors.name
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 focus:border-school-primary focus:ring-1 focus:ring-school-primary'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Contact Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 0318-9969994 or 0300-1234567"
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:bg-white ${
                errors.phone
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 focus:border-school-primary focus:ring-1 focus:ring-school-primary'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* Email Field (Optional) */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. parent@example.com"
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:bg-white ${
                errors.email
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 focus:border-school-primary focus:ring-1 focus:ring-school-primary'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Inquiry Details / Class Level <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Please mention the desired class (Classes 1 to 8) and any questions regarding admissions or curriculum..."
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:bg-white resize-y ${
                errors.message
                  ? 'border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 focus:border-school-primary focus:ring-1 focus:ring-school-primary'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-school-primary hover:bg-school-primary-dark text-white font-bold text-base shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-emerald-300" />
                <span>Submit Admission Inquiry</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 pt-1">
            Prefer direct contact? Call{' '}
            <a href={SCHOOL_INFO.phoneTel} className="font-semibold text-school-primary hover:underline">
              {SCHOOL_INFO.phoneFormatted}
            </a>
          </p>
        </form>
      )}
    </div>
  );
};
