import { BookingState } from '../types';
import { CheckCircle2, ShieldCheck, Mail, Calendar, Key, AlertTriangle, MessageSquare, Phone, MapPin } from 'lucide-react';

interface ConfirmedViewProps {
  bookingState: BookingState;
  onReset: () => void;
}

export default function ConfirmedView({ bookingState, onReset }: ConfirmedViewProps) {
  
  // Format comfortable display Date e.g., "June 15, 2026"
  const displayDateStr = () => {
    if (!bookingState.date) return 'June 18, 2026';
    try {
      const portions = bookingState.date.split('-');
      const year = parseInt(portions[0]);
      const month = parseInt(portions[1]) - 1;
      const day = parseInt(portions[2]);
      const parsed = new Date(year, month, day);
      return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return bookingState.date;
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-6 py-12 text-center space-y-12">
      
      {/* Pristine Checked Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary-container/65 text-secondary relative mb-2">
          {/* Animated Draw Success SVG */}
          <svg className="w-12 h-12 stroke-[3.5] stroke-current" fill="none" viewBox="0 0 24 24">
            <path 
              className="success-checkmark-draw" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.5 12.75l6 6 9-13.5" 
            />
          </svg>
        </div>
        <h1 className="font-heading text-4xl font-extrabold text-[#006c4b] tracking-tight">
          Booking Confirmed!
        </h1>
        <p className="font-sans text-xs text-on-surface-variant max-w-sm mx-auto">
          We’ve successfully processed your service request. Reclaim your calendar while we orchestrate the dust.
        </p>
      </div>

      {/* Dynamic Summary Card */}
      <div className="bg-white rounded-3xl border border-surface-dim shadow-sm p-6 md:p-8 max-w-2xl mx-auto text-left space-y-6">
        <div>
          <h2 className="font-heading text-lg font-bold text-primary">Thank you, {bookingState.fullName || 'Serene Guest'}!</h2>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-1">
            Your premium <span className="font-bold text-primary">{bookingState.cleanType === 'deep' ? 'Deep' : 'Standard'} Cleaning</span> appointment is securely scheduled for <span className="font-bold text-primary">{displayDateStr()}</span> at <span className="font-bold text-primary">{bookingState.timeSlot || '11:00 AM'}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-surface-container-low p-4 rounded-xl flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-[11px] font-black text-primary uppercase tracking-wide">Tracking Confirmation</h4>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mt-0.5">
                Arrival coordinates, keys coordination, and details were submitted to: <span className="font-bold text-primary">{bookingState.email || 'guest@example.com'}</span>
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-[11px] font-black text-primary uppercase tracking-wide">Address Destination</h4>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mt-0.5">
                {bookingState.address || '123 Sanctuary Way'}, {bookingState.city || 'Austin'}, {bookingState.zipCode || '78701'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-arrival Checklist Box */}
      <div className="space-y-4 text-left max-w-2xl mx-auto">
        <h3 className="font-heading text-base font-bold text-primary">How to Prepare for Your Sweep</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Item 1 */}
          <div className="bg-white border border-surface-dim p-4 rounded-2xl relative shadow-sm">
            <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3">
              <Key className="w-4 h-4" />
            </div>
            <h4 className="font-heading text-xs font-bold text-primary mb-1">Easy Access Keys</h4>
            <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
              Place spare keys under mats or input lockbox codes.
            </p>
            {bookingState.specialInstructions && (
              <p className="bg-surface-container text-[9px] text-primary rounded px-1.5 py-0.5 mt-2 font-mono truncate">
                Code: {bookingState.specialInstructions}
              </p>
            )}
          </div>

          {/* Item 2 */}
          <div className="bg-white border border-surface-dim p-4 rounded-2xl relative shadow-sm">
            <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4 text-secondary stroke-[2.5]" />
            </div>
            <h4 className="font-heading text-xs font-bold text-primary mb-1">Protect Happy Pets</h4>
            <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
              Deter pets into quiet spaces so vacuum frequencies don't startle.
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-white border border-surface-dim p-4 rounded-2xl relative shadow-sm">
            <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-3">
              <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
            </div>
            <h4 className="font-heading text-xs font-bold text-primary mb-1">Clear Floor Clutter</h4>
            <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
              Pick up bulky items like garments and kids' play blocks early.
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Map Display */}
      <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-surface-dim shadow-sm bg-white">
        <div className="p-4 bg-surface-container-low border-b border-surface-dim flex justify-between items-center text-left">
          <div>
            <h4 className="font-heading text-xs font-bold text-primary">Service Routing Analysis</h4>
            <p className="font-sans text-[10px] text-on-surface-variant">Dispatcher assignation: Austin Area Central Sector</p>
          </div>
          <span className="bg-secondary/15 text-secondary text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
            Ready-To-Go
          </span>
        </div>
        
        <div className="h-56 relative bg-surface-container overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8mcKYuW-TqljlIY8SEhV8E9XR32U7ZNQUuFjup6AlTjSZwUoAkjMj8IHaPK4MK6WGlykaKpL_RzAhtH9mbRZ8DMo_OmzSYMYFM2kX506MOg_NsZ1CXBTZ5Noz_2NfCamssoSPihGbDx_oqqYYTZvci77_c4nIPDwfs7ecogXnUL2gE_67CMlc6BuJrz-F4TuWK_MZP0GHnJ_1RaxyP-Wlq-tdK2OSNQN3Ru-WtULB2v6R_OnvKwvqnOmvY5i78qOlvQsKiq7hjQ"
            alt="Simulated map indicating service radius coverage area"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-surface-dim/70 shadow-md text-left">
            <p className="font-sans text-[9px] font-black text-primary uppercase">Estimated Arrival</p>
            <p className="font-heading text-xs font-bold text-secondary">{bookingState.timeSlot || '11:00 AM'} Sharp</p>
          </div>
        </div>
      </div>

      {/* Help Face-Widget with Chat options */}
      <div className="bg-white rounded-3xl p-6 border border-surface-dim max-w-md mx-auto flex items-center justify-between shadow-sm gap-4">
        <div className="flex items-center gap-3 text-left">
          <img
            className="w-12 h-12 rounded-full object-cover border border-outline-variant shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy6dG7n7hRo6C4KHI8JDpZullFnLSWXi25dlrFuNMqH5g22vrNz5d8pyNaBxwuhYLVR3A0dcyrSQ06458oiOUO8Q8ha3yHW-uiFIbURnEZOW5QkYNmaXVW9CD5RGsqHcPFs5smlXkBIWjFrCDA1OcQl77XMxTcrQ3RaZCg8-zAQ1zW6MFQV23P_DfVMeDQhda8f1Q8JwxMr1VGAoo13PUSsHG7z1tnsyV045QBwFhdTQlj6BbV8JEodPklR7FbJCp7OrtHeBppEw"
            alt="Support agent counselor smile"
            referrerPolicy="no-referrer"
          />
          <div>
            <h5 className="font-heading text-xs font-bold text-primary">Need assistance?</h5>
            <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed mt-0.5">
              Modify schedules, custom instruction updates, or support.
            </p>
          </div>
        </div>
        <button
          onClick={() => alert("Active chat session is established in background. Support crew will respond directly.")}
          className="bg-primary/5 text-primary text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary/10 transition-colors shrink-0 cursor-pointer flex items-center gap-1"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat Agent</span>
        </button>
      </div>

      {/* Re-navigate trigger button */}
      <div className="pt-6">
        <button
          onClick={onReset}
          className="bg-primary text-white font-sans text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-primary-container transition-all cursor-pointer shadow-md"
        >
          Return to Sanctuary Dashboard
        </button>
      </div>

    </div>
  );
}
