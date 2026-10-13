import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, PhoneCall, GraduationCap } from 'lucide-react';
import { SCHOOL_INFO } from '../lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
        <div className="relative w-20 h-20 mx-auto">
          <Image
            src="/images/logo/madni-logo.svg"
            alt="Madni Public School Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-school-primary font-heading">
            404
          </span>
          <h1 className="text-2xl font-bold text-school-text font-heading">
            Page Not Found
          </h1>
          <p className="text-sm text-school-muted leading-relaxed">
            The page you requested could not be located. It might have been moved or the address may
            have been typed incorrectly.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-school-primary hover:bg-school-primary-dark text-white font-bold text-sm shadow-xs transition-colors"
          >
            <Home className="w-4 h-4 text-emerald-300" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/#admissions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-50 text-school-secondary hover:bg-blue-100 font-bold text-sm border border-blue-200 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Admissions Information</span>
          </Link>

          <a
            href={SCHOOL_INFO.phoneTel}
            className="text-xs text-slate-500 hover:text-school-primary transition-colors flex items-center justify-center gap-1.5 pt-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>School Helpline: {SCHOOL_INFO.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
