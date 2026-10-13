import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Clock, ExternalLink, Lock } from 'lucide-react';
import { SCHOOL_INFO, NAV_LINKS } from '../lib/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white p-1 rounded-xl shadow-xs">
                <Image
                  src="/images/logo/madni-logo.svg"
                  alt="Madni Public School Logo Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-heading font-extrabold text-lg text-white tracking-tight">
                  Madni Public School
                </span>
                <span className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  23 Years of Excellence
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Providing quality education, moral grounding, and academic rigor for students from
              Classes 1 to 8 in Madni Town, Dera Ismail Khan.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                Classes 1 to 8 Admissions Open
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div>
            <h3 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs">
              Campus Information
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {SCHOOL_INFO.address.street},<br />
                  {SCHOOL_INFO.address.city}, {SCHOOL_INFO.address.province}, Pakistan
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href={SCHOOL_INFO.phoneTel}
                  className="hover:text-white font-medium transition-colors"
                >
                  {SCHOOL_INFO.phoneFormatted}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-slate-400">{SCHOOL_INFO.emailPlaceholder}</span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs leading-normal">{SCHOOL_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Action & Directions */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs">
              Location &amp; Admissions
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Located conveniently near Shah Alam Abad in Madni Town, providing a calm, safe
              learning environment for neighborhood families.
            </p>

            <a
              href={SCHOOL_INFO.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors w-full justify-center"
            >
              <span>View Location on Map</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            </a>

            <div className="pt-2">
              <a
                href={SCHOOL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors w-full justify-center shadow-xs"
              >
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {SCHOOL_INFO.name}, D.I. Khan. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-600">Established 2001 • Classes 1–8</span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-400 transition-colors"
            >
              <Lock className="w-3 h-3" aria-hidden="true" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
