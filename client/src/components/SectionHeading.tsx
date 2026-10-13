import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  description,
  center = true,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            center ? 'mx-auto' : ''
          } bg-emerald-50 text-school-primary border border-emerald-200/80 shadow-xs`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-school-accent" />
          {badge}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-school-text tracking-tight font-heading leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-school-muted leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
