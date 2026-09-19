export interface Lawyer {
  id: string;
  name: string;
  oab: string;
  role: string;
  specialty: string;
  education: string[];
  bio: string;
  areas: string[];
  photo: string;
  email: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'individual' | 'business' | 'both';
  icon: string;
  services: string[];
  whenToConsult: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  category: string;
  author: {
    name: string;
    oab: string;
    role: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  keyTakeaways: string[];
}

export interface Testimonial {
  id: string;
  initials: string;
  clientType: string;
  area: string;
  feedback: string;
  year: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  areaOfLaw: string;
  message: string;
  preferredContact: 'whatsapp' | 'email' | 'phone';
  urgency: 'normal' | 'urgent';
  acceptedPrivacy: boolean;
}

export interface AppointmentData {
  fullName: string;
  email: string;
  phone: string;
  areaOfLaw: string;
  modality: 'presential' | 'online';
  date: string;
  timeSlot: string;
  briefSummary: string;
}
