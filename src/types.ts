export type MainView = 'home' | 'pricing' | 'book' | 'confirmed' | 'admin';

export interface BookingState {
  cleanType: 'standard' | 'deep';
  bedrooms: number;
  bathrooms: number;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  specialInstructions: string;
}

export interface FirebaseBooking extends BookingState {
  id: string;
  createdAt: any;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
}
