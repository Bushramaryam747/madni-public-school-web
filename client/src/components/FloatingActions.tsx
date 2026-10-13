'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../lib/constants';

export const FloatingActions: React.FC = () => {
  return (
    <>
      {/* Desktop Floating WhatsApp Button (bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <a
          href={SCHOOL_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Contact Madni Public School on WhatsApp"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-[11px] font-semibold text-emerald-100 uppercase tracking-wider leading-none">
              Admissions Help
            </span>
            <span className="block text-sm font-extrabold leading-tight">
              Chat on WhatsApp
            </span>
          </div>
        </a>
      </div>

      {/* Mobile Bottom Fixed Action Bar (Sticky at very bottom on mobile screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl md:hidden">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          {/* Tap-to-Call Button */}
          <a
            href={SCHOOL_INFO.phoneTel}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-school-primary text-white font-bold text-sm tracking-wide shadow-xs active:scale-95 transition-transform"
            aria-label={`Call ${SCHOOL_INFO.phoneFormatted}`}
          >
            <Phone className="w-4 h-4 text-emerald-300 flex-shrink-0" aria-hidden="true" />
            <span>Call Now</span>
          </a>

          {/* WhatsApp Direct Chat Button */}
          <a
            href={SCHOOL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-xs active:scale-95 transition-transform"
            aria-label="Direct WhatsApp Chat"
          >
            <MessageCircle className="w-4 h-4 text-white flex-shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
};
