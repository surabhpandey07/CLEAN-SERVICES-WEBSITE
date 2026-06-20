import { useState, useMemo, FormEvent } from 'react';
import { BookingState } from '../types';
import { 
  Sparkles, Calendar as CalendarIcon, MapPin, User, Info, 
  ChevronLeft, ChevronRight, Check, ShieldCheck, Mail, Phone, Clock 
} from 'lucide-react';

interface BookingFormViewProps {
  bookingState: BookingState;
  onUpdateState: (updates: Partial<BookingState>) => void;
  onSubmitBooking: () => void;
}

export default function BookingFormView({ 
  bookingState, 
  onUpdateState, 
  onSubmitBooking 
}: BookingFormViewProps) {
  
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [stepErrors, setStepErrors] = useState<string>('');

  // Calendar State
  const [currentCalDate, setCurrentCalDate] = useState(() => {
    const today = new Date();
    // Default to year 2026 or current year/month
    return new Date(2026, 5, 1); // June 2026 as represented in designs
  });

  const timeSlots = [
    { value: '08:00 AM', label: '8:00 AM', desc: 'Early Morning Launch' },
    { value: '11:00 AM', label: '11:00 AM', desc: 'Late Morning Reset' },
    { value: '02:00 PM', label: '2:00 PM', desc: 'Afternoon Care' },
    { value: '05:00 PM', label: '5:00 PM', desc: 'Evening Sweep' }
  ];

  // Pricing calculations
  const prices = useMemo(() => {
    const base = bookingState.cleanType === 'deep' ? 100 : 60;
    const bedCost = bookingState.bedrooms * 25;
    const bathCost = bookingState.bathrooms * 15;
    const fee = 5.00;
    const total = base + bedCost + bathCost + fee;
    return {
      base,
      bedCost,
      bathCost,
      fee,
      total
    };
  }, [bookingState.cleanType, bookingState.bedrooms, bookingState.bathrooms]);

  // Stepping navigation validation
  const handleNext = () => {
    if (currentStep === 1) {
      if (bookingState.bedrooms < 0 || bookingState.bathrooms < 0) {
        setStepErrors('Please choose valid quantities of rooms.');
        return;
      }
      setStepErrors('');
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!bookingState.date) {
        setStepErrors('Please select a preferred date on the calendar matrix.');
        return;
      }
      if (!bookingState.timeSlot) {
        setStepErrors('Please choose an available appointment time slot.');
        return;
      }
      setStepErrors('');
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setStepErrors('');
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingState.fullName || !bookingState.email || !bookingState.address || !bookingState.city || !bookingState.zipCode) {
      setStepErrors('Please complete all required fields mark with (*).');
      return;
    }
    setStepErrors('');
    onSubmitBooking();
  };

  // Calendar generation helpers
  const calendarDays = useMemo(() => {
    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(d);
    }
    return days;
  }, [currentCalDate]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const changeMonth = (offset: number) => {
    setCurrentCalDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() + offset);
      return copy;
    });
  };

  const handleSelectDay = (day: number) => {
    const year = currentCalDate.getFullYear();
    const month = String(currentCalDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const formatted = `${year}-${month}-${dayStr}`;
    onUpdateState({ date: formatted });
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 md:px-10 py-12">
      
      {/* Title block */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-heading text-3xl font-bold text-primary">Book Your Serene Space</h1>
        <p className="font-sans text-xs text-on-surface-variant mt-1.5">
          Configure your service options and finalize a spot in under 60 seconds.
        </p>
      </div>

      {/* Grid: Form Left, Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left main form wrapper */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-surface-dim shadow-sm p-6 md:p-8 space-y-8">
          
          {/* Stepper Progress Bar */}
          <div className="flex justify-between items-center relative border-b border-surface-container pb-6">
            <div className={`absolute top-1/2 left-0 right-0 h-0.5 bg-surface-container-high -translate-y-[14px] -z-10`}></div>
            <div 
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-[14px] -z-10 transition-all duration-300"
            ></div>

            {/* Step 1 indicator */}
            <button 
              onClick={() => setCurrentStep(1)} 
              className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all ${
                currentStep >= 1 ? 'bg-primary text-white scale-110 shadow-md' : 'bg-surface-container text-on-surface-variant'
              }`}>
                1
              </div>
              <span className={`font-sans text-[11px] font-black uppercase tracking-wider ${
                currentStep >= 1 ? 'text-primary' : 'text-on-surface-variant'
              }`}>Customize Plan</span>
            </button>

            {/* Step 2 indicator */}
            <button 
              onClick={() => { if (bookingState.bedrooms >= 0) setCurrentStep(2); }} 
              className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all ${
                currentStep >= 2 ? 'bg-primary text-white scale-110 shadow-md' : 'bg-surface-container text-on-surface-variant'
              }`}>
                2
              </div>
              <span className={`font-sans text-[11px] font-black uppercase tracking-wider ${
                currentStep >= 2 ? 'text-primary' : 'text-on-surface-variant'
              }`}>Schedule</span>
            </button>

            {/* Step 3 indicator */}
            <button 
              className="flex flex-col items-center gap-2 group focus:outline-none cursor-not-allowed"
              disabled
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-xs font-bold transition-all ${
                currentStep >= 3 ? 'bg-primary text-white scale-110 shadow-md' : 'bg-surface-container text-on-surface-variant'
              }`}>
                3
              </div>
              <span className={`font-sans text-[11px] font-black uppercase tracking-wider ${
                currentStep >= 3 ? 'text-primary' : 'text-on-surface-variant'
              }`}>Personal & Address</span>
            </button>
          </div>

          {/* Validation Alert */}
          {stepErrors && (
            <div className="bg-error-container/40 border border-error/20 p-4 rounded-xl text-error text-xs font-semibold flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-error text-white flex items-center justify-center text-[11px]">!</span>
              <span>{stepErrors}</span>
            </div>
          )}

          {/* Core Stepped Forms Container */}
          <div>
            {/* Step 1: Customize Plan */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Service type card select */}
                <div className="space-y-3">
                  <h3 className="font-heading text-lg font-bold text-primary">1. Select Service Level Directive</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Standard Cleaning */}
                    <button
                      type="button"
                      onClick={() => onUpdateState({ cleanType: 'standard' })}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 relative cursor-pointer ${
                        bookingState.cleanType === 'standard'
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-surface-dim bg-white hover:border-surface-container-highest'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-heading text-base font-bold text-primary">Standard Serene Clean</span>
                        <span className="font-heading text-lg font-black text-primary">$60 Base</span>
                      </div>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                        Weekly upkeep including complete dusting, vacuuming floors, bathroom grout wipes, and kitchen resets.
                      </p>
                      {bookingState.cleanType === 'standard' && (
                        <div className="absolute bottom-4 right-4 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>

                    {/* Deep Cleaning */}
                    <button
                      type="button"
                      onClick={() => onUpdateState({ cleanType: 'deep' })}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 relative cursor-pointer ${
                        bookingState.cleanType === 'deep'
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-surface-dim bg-white hover:border-surface-container-highest'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-heading text-base font-bold text-primary">Deep Sanitizing Reset</span>
                        <span className="font-heading text-lg font-black text-primary">$100 Base</span>
                      </div>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                        Intensive scrubbing adding deep baseboard restore, detailed oven inside, heavy grout steam brush, and fixtures.
                      </p>
                      {bookingState.cleanType === 'deep' && (
                        <div className="absolute bottom-4 right-4 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>

                  </div>
                </div>

                {/* Bedrooms & Bathrooms Counter Rows */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-heading text-base font-bold text-primary">2. Room Count Estimate</h3>
                  
                  <div className="p-4 bg-surface-container-low rounded-2xl flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-primary">Bedrooms Area</h4>
                      <p className="font-sans text-[11px] text-on-surface-variant">Each bedroom area adds $25.00 to estimated sweep</p>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-start gap-4 bg-white px-3 py-1.5 rounded-xl border border-surface-dim shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateState({ bedrooms: Math.max(0, bookingState.bedrooms - 1) })}
                        className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center font-bold font-sans hover:bg-surface-container-high transition-colors active:scale-95 disabled:opacity-40 cursor-pointer"
                        disabled={bookingState.bedrooms <= 0}
                      >
                        －
                      </button>
                      <span className="font-sans text-sm font-black text-primary min-w-[32px] text-center">
                        {bookingState.bedrooms} Bed{bookingState.bedrooms !== 1 ? 's' : ''}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateState({ bedrooms: bookingState.bedrooms + 1 })}
                        className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center font-bold font-sans hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
                      >
                        ＋
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-surface-container-low rounded-2xl flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-primary">Bathrooms Area</h4>
                      <p className="font-sans text-[11px] text-on-surface-variant">Thorough floor and fixtures cleanup ($15.00 each)</p>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-start gap-4 bg-white px-3 py-1.5 rounded-xl border border-surface-dim shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateState({ bathrooms: Math.max(0, bookingState.bathrooms - 1) })}
                        className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center font-bold font-sans hover:bg-surface-container-high transition-colors active:scale-95 disabled:opacity-40 cursor-pointer"
                        disabled={bookingState.bathrooms <= 0}
                      >
                        －
                      </button>
                      <span className="font-sans text-sm font-black text-primary min-w-[32px] text-center">
                        {bookingState.bathrooms} Bath{bookingState.bathrooms !== 1 ? 's' : ''}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateState({ bathrooms: bookingState.bathrooms + 1 })}
                        className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center font-bold font-sans hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
                      >
                        ＋
                      </button>
                    </div>
                  </div>

                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary text-white font-sans text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Next: Schedule Window</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* Step 2: Choose Schedule */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Calendar Matrix Card */}
                  <div className="space-y-3">
                    <h3 className="font-heading text-base font-bold text-primary flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      <span>Select Preferred Date</span>
                    </h3>

                    <div className="border border-surface-dim rounded-2xl bg-white p-4">
                      {/* Month Switcher Header */}
                      <div className="flex justify-between items-center mb-4">
                        <button
                          type="button"
                          onClick={() => changeMonth(-1)}
                          className="p-1.5 hover:bg-surface-container rounded-lg text-primary transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-heading text-sm font-bold text-primary">
                          {monthNames[currentCalDate.getMonth()]} {currentCalDate.getFullYear()}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeMonth(1)}
                          className="p-1.5 hover:bg-surface-container rounded-lg text-primary transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Day Labels */}
                      <div className="grid grid-cols-7 gap-1 text-center font-sans text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                        <div>Su</div>
                        <div>Mo</div>
                        <div>Tu</div>
                        <div>We</div>
                        <div>Th</div>
                        <div>Fr</div>
                        <div>Sa</div>
                      </div>

                      {/* Date Cells */}
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, idx) => {
                          if (day === null) {
                            return <div key={`empty-${idx}`} className="aspect-square"></div>;
                          }
                          
                          // Format corresponding matching string
                          const cellYr = currentCalDate.getFullYear();
                          const cellMth = String(currentCalDate.getMonth() + 1).padStart(2, '0');
                          const cellDay = String(day).padStart(2, '0');
                          const cellDateStr = `${cellYr}-${cellMth}-${cellDay}`;
                          const isSelected = bookingState.date === cellDateStr;

                          // Sunday index check for disable or custom visual style (e.g., weekends off or light styling)
                          const isSunday = (idx % 7) === 0;

                          return (
                            <button
                              key={`day-${day}`}
                              type="button"
                              onClick={() => handleSelectDay(day)}
                              className={`aspect-square w-full rounded-lg font-sans text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-primary text-white font-bold scale-102 shadow-md shadow-primary/20'
                                  : isSunday 
                                    ? 'text-on-surface-variant/40 hover:bg-surface-container-low'
                                    : 'text-primary hover:bg-surface-container-low'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                      *Selected Date: <span className="font-bold text-primary">{bookingState.date || 'None selected'}</span>
                    </p>
                  </div>

                  {/* Time slots Card */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-base font-bold text-primary flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Choose Clock Window</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-2.5">
                      {timeSlots.map((slot) => {
                        const isSelectedSlot = bookingState.timeSlot === slot.value;
                        return (
                          <button
                            key={slot.value}
                            type="button"
                            onClick={() => onUpdateState({ timeSlot: slot.value })}
                            className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                              isSelectedSlot
                                ? 'border-primary bg-primary/5 shadow-sm'
                                : 'border-surface-dim hover:border-surface-container-highest bg-white'
                            }`}
                          >
                            <div>
                              <p className="font-sans text-xs font-black text-primary uppercase tracking-wide">{slot.label}</p>
                              <p className="font-sans text-[11px] text-on-surface-variant mt-0.5">{slot.desc}</p>
                            </div>
                            {isSelectedSlot ? (
                              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px]">
                                ✓
                              </span>
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-outline-variant text-primary font-sans text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-surface-container transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary text-white font-sans text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Next: Personal Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* Step 3: Contact & Address */}
            {currentStep === 3 && (
              <form onSubmit={handleFormSubmit} className="space-y-6 animate-fade-in">
                <h3 className="font-heading text-lg font-bold text-primary">Provide Service Address & Credentials</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-primary uppercase tracking-wide">Full Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={bookingState.fullName}
                        onChange={(e) => onUpdateState({ fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-surface-dim rounded-xl font-sans text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-on-surface-variant/50"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-primary uppercase tracking-wide">Email Address *</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={bookingState.email}
                        onChange={(e) => onUpdateState({ email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-surface-dim rounded-xl font-sans text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-on-surface-variant/50"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-primary uppercase tracking-wide">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={bookingState.phone}
                      onChange={(e) => onUpdateState({ phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-surface-dim rounded-xl font-sans text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-on-surface-variant/50"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-primary uppercase tracking-wide">Booking Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Street number and name"
                      value={bookingState.address}
                      onChange={(e) => onUpdateState({ address: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-surface-dim rounded-xl font-sans text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-on-surface-variant/50"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-primary uppercase tracking-wide">City Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="Austin"
                      value={bookingState.city}
                      onChange={(e) => onUpdateState({ city: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-surface-dim rounded-xl font-sans text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-on-surface-variant/50"
                    />
                  </div>

                  {/* Zip Code */}
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-bold text-primary uppercase tracking-wide">Zip Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="78701"
                      value={bookingState.zipCode}
                      onChange={(e) => onUpdateState({ zipCode: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-surface-dim rounded-xl font-sans text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-on-surface-variant/50"
                    />
                  </div>
                </div>

                {/* Special Instructions text */}
                <div className="space-y-1 text-left">
                  <label className="font-sans text-xs font-bold text-primary uppercase tracking-wide">Special Requests or Entry Instructions (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="E.g., spare key under mat, pet-friendly products requested, key-code is 2468..."
                    value={bookingState.specialInstructions}
                    onChange={(e) => onUpdateState({ specialInstructions: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-surface-dim rounded-xl font-sans text-xs text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-on-surface-variant/50 resize-y"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-outline-variant text-primary font-sans text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-surface-container transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="bg-secondary text-white font-sans text-sm font-bold px-10 py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Check className="w-4 h-4 text-white font-extrabold stroke-[3]" />
                    <span>Confirm & Book Sweep</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

        {/* Right Sidebar Calculation Breakdowns matching Screen 3 */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-white rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
            {/* Top image decoration */}
            <div className="h-28 relative bg-surface-container">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOv7h26QQKSd7b02QGzRtSAIKuJ7otBjZalSDicCBHAmy3OBggk5jKApI3BE9pKAudU9AtkBK6Ym5Tf4zUqI4YrfvbzWLfJivu58U6pM8NahxvyvoXmOr10MXKvO5Fa11TNlgU3C3Ia7WfwThrMkMKQfWOuiW-o3U7M1dKRqL4jGYnYWZ-1-Sou1qD8ETWC812c7fT4A1lzDjDwCuh5JeIP-h-uidWt_ajKj01l-XbQ9cw808eioxMBrKUo6zccVqLcBBuNJ1Wqg"
                alt="Chic tidy room gray theme"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
                <span className="font-heading text-xs font-black text-white uppercase tracking-widest bg-secondary px-2.5 py-1 rounded-md shadow-sm">
                  Estimate Breakdown
                </span>
              </div>
            </div>

            {/* Price Calculations breakdown list */}
            <div className="p-6 space-y-4">
              <h3 className="font-heading text-sm font-bold text-primary border-b border-surface-container pb-2">
                Booking Summary Details
              </h3>

              <div className="space-y-3.5 text-xs text-on-surface-variant">
                
                {/* Clean level base item */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">
                      {bookingState.cleanType === 'deep' ? 'Deep Sanitizing Clean' : 'Standard Routine Clean'}
                    </span>
                    <span className="text-[10px] text-on-surface-variant/70">Master base rate</span>
                  </div>
                  <span className="font-semibold text-primary">${prices.base.toFixed(2)}</span>
                </div>

                {/* Bedrooms line */}
                {bookingState.bedrooms > 0 && (
                  <div className="flex justify-between items-center animate-fade-in">
                    <span className="font-medium">{bookingState.bedrooms} Bed Area{bookingState.bedrooms > 1 ? 's' : ''} x $25.00</span>
                    <span className="font-semibold text-primary">${prices.bedCost.toFixed(2)}</span>
                  </div>
                )}

                {/* Bathrooms line */}
                {bookingState.bathrooms > 0 && (
                  <div className="flex justify-between items-center animate-fade-in">
                    <span className="font-medium">{bookingState.bathrooms} Bath Area{bookingState.bathrooms > 1 ? 's' : ''} x $15.00</span>
                    <span className="font-semibold text-primary">${prices.bathCost.toFixed(2)}</span>
                  </div>
                )}

                {/* Admin/Service Fee line */}
                <div className="flex justify-between items-center">
                  <span className="font-medium">Trust-Insured Admin Fee</span>
                  <span className="font-semibold text-primary">${prices.fee.toFixed(2)}</span>
                </div>

                <hr className="border-dashed border-surface-container-highest" />

                {/* Scheduled details if set */}
                {(bookingState.date || bookingState.timeSlot) && (
                  <div className="bg-surface-container-low p-3 rounded-xl space-y-1 text-[11px] text-primary animate-fade-in border border-surface-container">
                    {bookingState.date && (
                      <p className="flex items-center gap-1.5 font-bold">
                        <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                        <span>Date: {bookingState.date}</span>
                      </p>
                    )}
                    {bookingState.timeSlot && (
                      <p className="flex items-center gap-1.5 font-medium text-on-surface-variant">
                        <Clock className="w-3.5 h-3.5 text-primary/70" />
                        <span>Hours: {bookingState.timeSlot}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Total grand estimate */}
                <div className="flex justify-between items-center pt-2">
                  <span className="font-sans text-sm font-black text-primary uppercase">Total Estimated</span>
                  <span className="font-heading text-xl font-extrabold text-secondary">${prices.total.toFixed(2)}</span>
                </div>

              </div>
            </div>
          </div>

          {/* Secure details safety label */}
          <div className="bg-surface-container-low border border-surface-container rounded-2xl p-4 flex gap-3 text-left">
            <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <h5 className="font-sans text-[11px] font-black text-primary uppercase tracking-wide">SSL Socket Secure</h5>
              <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed mt-0.5">
                Every input session is 256-bit SSL certified encrypted. No prepayment details are acquired directly in this tool.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
