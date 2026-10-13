export const SCHOOL_INFO = {
  name: 'Madni Public School',
  tagline: 'Building Knowledge, Character & A Brighter Future',
  description:
    'Providing quality education and nurturing confident, responsible, and successful students from Classes 1 to 8 in D.I. Khan.',
  mission:
    'To foster an engaging, disciplined, and nurturing educational environment where every student develops strong moral values, academic mastery, critical thinking, and confidence to succeed in future pursuits.',
  yearsOfExcellence: '23 Years of Excellence',
  establishedYear: '2001',
  classesOffered: 'Classes 1 to 8',
  phone: '0318-9969994',
  phoneFormatted: '+92 318 9969994',
  phoneTel: 'tel:+923189969994',
  whatsappUrl:
    'https://wa.me/923189969994?text=Hello%20Madni%20Public%20School,%20I%20would%20like%20to%20inquire%20about%20admissions.',
  emailPlaceholder: 'info@madnipublicschool.edu.pk',
  address: {
    street: 'Madni Town, near Shah Alam Abad',
    city: 'Dera Ismail Khan (D.I. Khan)',
    province: 'Khyber Pakhtunkhwa',
    country: 'Pakistan',
    full: 'Madni Town, near Shah Alam Abad, D.I. Khan, Khyber Pakhtunkhwa, Pakistan',
  },
  hours: 'Monday – Saturday: 7:45 AM – 1:30 PM (Friday: 7:45 AM – 12:00 PM)',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13658.237303031025!2d70.88725895!3d31.8315189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39260d8435d070ff%3A0x6b45a0b7762691e8!2sDera%20Ismail%20Khan%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
  googleMapsDirectionsUrl:
    'https://maps.google.com/?q=Madni+Town+Shah+Alam+Abad+Dera+Ismail+Khan+Pakistan',
};

export const NAV_LINKS = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Academics', href: '/#academics' },
  { name: 'Activities', href: '/#activities' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Admissions', href: '/#admissions' },
  { name: 'Contact', href: '/#contact' },
];

export const WHY_CHOOSE_CARDS = [
  {
    id: 1,
    title: 'Quality Education',
    description:
      'Rigorous academic standards aligned with modern learning goals, delivering strong conceptual foundations for every student.',
    iconName: 'GraduationCap',
  },
  {
    id: 2,
    title: 'Experienced Teachers',
    description:
      'Dedicated, qualified educators who mentor learners with patience, deep subject expertise, and individualized attention.',
    iconName: 'Users',
  },
  {
    id: 3,
    title: 'Safe & Supportive Environment',
    description:
      'A secure campus setting that promotes positive social interaction, emotional safety, discipline, and healthy peer friendships.',
    iconName: 'ShieldCheck',
  },
  {
    id: 4,
    title: 'Character Building',
    description:
      'Integrating moral ethics, honesty, civic duty, and mutual respect directly into daily school routines and assembly discourses.',
    iconName: 'HeartHandshake',
  },
  {
    id: 5,
    title: 'Modern Learning Approach',
    description:
      'Focusing on conceptual comprehension, logical problem-solving, and communicative confidence rather than rote memorization.',
    iconName: 'Lightbulb',
  },
  {
    id: 6,
    title: 'Focus on Student Development',
    description:
      'Nurturing well-rounded learners who excel not only in exams, but also in public expression, physical fitness, and leadership.',
    iconName: 'Sparkles',
  },
];

export const ACADEMIC_WINGS = [
  {
    title: 'Primary Classes (1 to 5)',
    subtitle: 'Building Strong Foundations',
    description:
      'Our primary wing focuses on foundational literacy (Urdu and English), numeracy, and basic scientific awareness. We emphasize active curiosity, neat handwriting, disciplined routines, and joyful classroom discovery.',
    highlights: [
      'Foundational Urdu & English reading and writing',
      'Core mental mathematics and number fluency',
      'General science and environmental curiosity',
      'Islamic moral values and ethical conduct',
      'Art, sports, and motor skill development',
    ],
    badge: 'Classes 1–5',
    color: 'emerald',
  },
  {
    title: 'Middle Classes (6 to 8)',
    subtitle: 'Analytical Growth & Academic Rigor',
    description:
      'The middle wing bridges early learning with advanced secondary preparation. Students develop structured study habits, analytical reasoning in science and mathematics, clear written expression, and confident public articulation.',
    highlights: [
      'Comprehensive Science (Physics, Chemistry, Biology concepts)',
      'Algebra, Geometry, and practical problem solving',
      'Advanced English and Urdu grammar and comprehension',
      'Pakistan Studies, History, and Social Sciences',
      'Debating, speech recitation, and collaborative projects',
    ],
    badge: 'Classes 6–8',
    color: 'blue',
  },
];

export const ACADEMIC_PILLARS = [
  {
    title: 'Experienced Teaching',
    description:
      'Our faculty brings years of classroom experience, employing clear instructional frameworks and constructive feedback to help each child thrive.',
    iconName: 'Award',
  },
  {
    title: 'Student-Centered Learning',
    description:
      'We recognize that every child learns at their own pace. Teachers assess understanding continuously and provide targeted guidance where needed.',
    iconName: 'Target',
  },
];

export const GALLERY_CATEGORIES = [
  'All',
  'Classroom',
  'Learning',
  'Events',
  'Prize Distribution',
  'Sports',
  'School Building',
] as const;
