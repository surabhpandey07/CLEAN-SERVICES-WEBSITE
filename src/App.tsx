import { useState, useEffect } from 'react';
import { MainView, BookingState } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import PricingView from './components/PricingView';
import BookingFormView from './components/BookingFormView';
import ConfirmedView from './components/ConfirmedView';

const initialBookingState: BookingState = {
  cleanType: 'standard',
  bedrooms: 3,
  bathrooms: 2,
  date: '2026-06-18', // Default date June 18, 2026
  timeSlot: '11:00 AM',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: 'Austin',
  zipCode: '78701',
  specialInstructions: ''
};

export default function App() {
  const [currentView, setCurrentView] = useState<MainView>('home');
  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);

  // Scroll to top immediately on view switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentView]);

  const handleUpdateBookingState = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  };

  const handleSelectPlanFromPricing = (plan: 'standard' | 'deep') => {
    handleUpdateBookingState({ cleanType: plan });
    setCurrentView('book');
  };

  const handleSubmitBooking = () => {
    setCurrentView('confirmed');
  };

  const handleResetApp = () => {
    setBookingState(initialBookingState);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between font-sans text-on-surface">
      {/* Sticky Header */}
      <Header 
        currentView={currentView} 
        onViewChange={(v) => setCurrentView(v)} 
      />

      {/* Main Container below navbar */}
      <main className="flex-grow pt-20 w-full">
        {currentView === 'home' && (
          <HomeView onViewChange={(v) => setCurrentView(v)} />
        )}

        {currentView === 'pricing' && (
          <PricingView 
            onSelectPlan={handleSelectPlanFromPricing} 
            onViewChange={(v) => setCurrentView(v)}
          />
        )}

        {currentView === 'book' && (
          <BookingFormView 
            bookingState={bookingState}
            onUpdateState={handleUpdateBookingState}
            onSubmitBooking={handleSubmitBooking}
          />
        )}

        {currentView === 'confirmed' && (
          <ConfirmedView 
            bookingState={bookingState} 
            onReset={handleResetApp} 
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onViewChange={(v) => setCurrentView(v)} />
    </div>
  );
}
