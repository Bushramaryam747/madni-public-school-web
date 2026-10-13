import React from 'react';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { SCHOOL_INFO } from '../lib/constants';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-school-primary text-white text-xs sm:text-sm py-2 px-4 border-b border-emerald-900/40 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        {/* Left: Contact & Location */}
        <div className="flex items-center flex-wrap gap-x-5 gap-y-1">
          <a
            href={SCHOOL_INFO.phoneTel}
            className="inline-flex items-center gap-1.5 font-semibold text-emerald-100 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-white rounded py-0.5"
            aria-label={`Call Madni Public School at ${SCHOOL_INFO.phoneFormatted}`}
          >
            <Phone className="w-3.5 h-3.5 text-school-accent" aria-hidden="true" />
            <span>{SCHOOL_INFO.phoneFormatted}</span>
          </a>

          <div className="hidden md:inline-flex items-center gap-1.5 text-emerald-100/90">
            <MapPin className="w-3.5 h-3.5 text-school-accent" aria-hidden="true" />
            <span>{SCHOOL_INFO.address.street}, D.I. Khan</span>
          </div>

          <div className="hidden lg:inline-flex items-center gap-1.5 text-emerald-100/80">
            <Clock className="w-3.5 h-3.5 text-school-accent" aria-hidden="true" />
            <span>Mon–Sat: 7:45 AM – 1:30 PM</span>
          </div>
        </div>

        {/* Right: Badge & WhatsApp */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 text-xs font-medium border border-emerald-700/50">
            23 Years of Educational Excellence
          </span>
          <a
            href={SCHOOL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-medium text-xs transition-colors shadow-xs"
            aria-label="Direct WhatsApp inquiry"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
