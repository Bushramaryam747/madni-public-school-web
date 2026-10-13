'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, PhoneCall, ChevronRight, GraduationCap } from 'lucide-react';
import { SCHOOL_INFO, NAV_LINKS } from '../lib/constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change or Escape key
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-md py-2.5 border-b border-slate-200/80'
          : 'bg-white py-3.5 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-school-primary rounded-lg p-1"
            aria-label="Madni Public School Home"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 drop-shadow-xs transition-transform group-hover:scale-105">
              <Image
                src="/images/logo/madni-logo.svg"
                alt="Madni Public School Emblem Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="block font-heading font-extrabold text-lg sm:text-xl text-school-primary tracking-tight leading-tight group-hover:text-emerald-800 transition-colors">
                Madni Public School
              </span>
              <span className="block text-xs font-semibold text-school-secondary tracking-wide uppercase">
                Classes 1 to 8 • D.I. Khan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                    isCurrent
                      ? 'text-school-primary bg-emerald-50'
                      : 'text-slate-700 hover:text-school-primary hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Admissions CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/#admissions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-school-primary hover:bg-school-primary-dark text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-school-primary"
            >
              <GraduationCap className="w-4 h-4 text-emerald-300" aria-hidden="true" />
              <span>Admissions</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/#admissions"
              className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-school-primary text-white text-xs font-bold"
            >
              <span>Admissions</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-school-primary hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-school-primary"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open main menu'}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-slate-800" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[108px] z-50 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-full max-h-[calc(100vh-108px)] overflow-y-auto px-6 py-6 border-b border-slate-200 shadow-2xl animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:text-school-primary hover:bg-emerald-50 transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/#admissions"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-school-primary text-white font-bold text-base shadow-sm"
              >
                <GraduationCap className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                <span>Contact Us for Admission</span>
              </Link>

              <a
                href={SCHOOL_INFO.phoneTel}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-50 text-school-secondary font-bold text-base border border-blue-200"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>Call {SCHOOL_INFO.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
