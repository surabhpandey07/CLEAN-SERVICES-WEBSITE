import { useState } from 'react';
import { Check, Star, HelpCircle } from 'lucide-react';

interface PricingViewProps {
  onSelectPlan: (plan: 'standard' | 'deep') => void;
  onViewChange: (view: 'home' | 'pricing' | 'book' | 'confirmed') => void;
}

export default function PricingView({ onSelectPlan, onViewChange }: PricingViewProps) {
  // Frequently Asked Questions accordion toggles
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const plans = [
    {
      id: 'standard' as const,
      name: 'Standard Weekly',
      rate: '$45',
      unit: 'per hour',
      description: 'Meticulous maintenance perfect for routine upkeep.',
      features: [
        'Dusting & vacuuming',
        'Surface sanitization',
        'Trash & recycling removal',
        'Kitchen & bathroom light scrub',
        'Eco-friendly supplies included',
        'Same dedicated cleaner available'
      ],
      ctaText: 'Book Standard Clean',
      popular: false
    },
    {
      id: 'deep' as const,
      name: 'Deep Clean Reset',
      rate: 'Starts $199',
      unit: 'flat rate',
      description: 'Intensive restoration for homes needing special care.',
      features: [
        'EVERYTHING in Standard Weekly',
        'Baseboards and window tracks detailed',
        'Inside microwave & range surfaces',
        'High-density shower grout scrubbing',
        'Sanitizing behind heavy furniture',
        'Polishing cabinet exteriors'
      ],
      ctaText: 'Book Deep Clean',
      popular: true
    },
    {
      id: 'move' as const,
      name: 'Move In / Move Out',
      rate: 'Starts $299',
      unit: 'comprehensive',
      description: 'Total sanitization for stress-free property handovers.',
      features: [
        'Full empty interior scrub-down',
        'Inside drawers, cabinets, and closets',
        'Inside entire refrigerator scrub',
        'Oven carbon grease removal',
        'Window tracks & full glass polished',
        'Landlord-ready check Guarantee'
      ],
      ctaText: 'Book Transition Clean',
      popular: false
    }
  ];

  const comparisonRows = [
    { name: 'Dusting & Vacuuming floors', std: 'Included', deep: 'Included', move: 'Included' },
    { name: 'Trash removal & Linens reset', std: 'Included', deep: 'Included', move: 'Included' },
    { name: 'Sanitize kitchen counters & sink', std: 'Included', deep: 'Included', move: 'Included' },
    { name: 'Baseboards & interior door frames', std: 'Light dusting', deep: 'Surgical detail wipe', move: 'Restorative sanitizing' },
    { name: 'Inside of microwave appliance', std: '$15 Add-on', deep: 'Included', move: 'Included' },
    { name: 'Inside refrigerator & oven cavities', std: '$40 Add-on', deep: '$45 Add-on', move: 'Included' },
    { name: 'Inside cupboards & drawers', std: 'Not available', deep: 'Exteriors only', move: 'Full detail clean' },
    { name: 'High-density tile grout scrubbing', std: 'Not available', deep: 'Intensive steam reset', move: 'Intensive steam reset' },
    { name: 'Under & behind heavy furniture', std: 'Light vacuuming', deep: 'Deep sanitization', move: 'Full empty room scope' }
  ];

  const faqs = [
    {
      question: "What is included in a Standard Clean versus a Deep Clean?",
      answer: "A standard clean focuses on routine upkeep: dusting, vacuuming floors, emptying bins, wiping countertops, and sanitizing toilets, showers, and sinks. A Deep Clean adds rigorous restoration including wiping baseboards, detailed window tracks, inside the microwave, deep shower grout steam-scrubbing, and detailing cabinet exteriors."
    },
    {
      question: "Are cleaning supplies and bulky vacuum cleaners provided?",
      answer: "Yes, absolutely! Our experts show up with state-of-the-art HEPA vacuums, microfiber cloths, and comprehensive eco-friendly sanitizing products. If you prefer us to utilize your personal specialized products, simply leave notes in the booking form step."
    },
    {
      question: "What is your reschedule or cancellation policy?",
      answer: "We understand that lives are unpredictable. You can reschedule or cancel any reservation entirely free of charge up to 24 hours prior to your scheduled slot. Cancellations within 24 hours incur a flat $50 late-notice fee."
    },
    {
      question: "Are your cleaners background vetted, insured, and licensed?",
      answer: "Every single cleaner undergoes a strict criminal background report, multiple reference validation checks, and intensive professional training. In addition, CleanSerene is fully bonded and backed by a comprehensive $2,000,000 liability policy."
    }
  ];

  return (
    <div className="animate-fade-in bg-background min-h-screen pt-12 pb-24 px-6 md:px-10 max-w-7xl mx-auto space-y-16">
      
      {/* Page Title Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-container text-white text-[11px] font-extrabold uppercase tracking-widest">
          Transparent, Flat-Rate Pricing
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
          Invest in Your Peace of Mind
        </h1>
        <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-lg mx-auto">
          No hidden fees, no complex quotes. Choose the plan that aligns with your sanctuary’s specific blueprint.
        </p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative bg-white rounded-3xl p-8 flex flex-col justify-between border shadow-sm transition-all duration-300 ${
              p.popular 
                ? 'border-primary ring-2 ring-primary/40 md:-translate-y-2.5 shadow-xl' 
                : 'border-surface-dim hover:shadow-lg'
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white font-sans text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Recommended Resets
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-primary">{p.name}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-1">{p.description}</p>
              </div>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="font-heading text-3xl font-black text-primary">{p.rate}</span>
                <span className="font-sans text-xs text-on-surface-variant">/ {p.unit}</span>
              </div>

              <hr className="border-surface-container" />

              <ul className="space-y-3">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-on-surface-variant">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5 stroke-[3]" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => {
                  if (p.id === 'standard' || p.id === 'deep') {
                    onSelectPlan(p.id);
                  } else {
                    onSelectPlan('deep'); // default to deep for move in out
                  }
                }}
                className={`w-full py-4 rounded-xl font-sans text-sm font-bold transition-all cursor-pointer ${
                  p.popular
                    ? 'bg-primary text-white hover:bg-primary-container active:scale-[0.98]'
                    : 'bg-surface-container hover:bg-surface-container-highest text-primary active:scale-[0.98]'
                }`}
              >
                {p.ctaText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grand Feature Comparison Table */}
      <div className="bg-white rounded-3xl border border-surface-dim shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-surface-container flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-primary">In-Depth Comparison Directory</h3>
            <p className="font-sans text-xs text-on-surface-variant mt-1">See exactly what our professionals analyze and address side-by-side.</p>
          </div>
          <button
            onClick={() => onViewChange('book')}
            className="bg-primary/5 text-primary text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
          >
            Customize Checklist in Booking Form
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low text-primary border-b border-surface-dim font-bold text-xs uppercase tracking-wider font-sans">
                <th className="py-4.5 px-6 font-semibold w-1/3">Included Tasks</th>
                <th className="py-4.5 px-6 font-semibold">Standard Clean</th>
                <th className="py-4.5 px-6 font-semibold">Deep Clean</th>
                <th className="py-4.5 px-6 font-semibold">Move In / Out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-xs text-on-surface-variant">
              {comparisonRows.map((r) => (
                <tr key={r.name} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4.5 px-6 font-medium text-primary text-[13px]">{r.name}</td>
                  <td className="py-4.5 px-6 font-sans">
                    {r.std === 'Included' ? (
                      <span className="inline-flex items-center gap-1 text-secondary font-bold">
                        <Check className="w-4 h-4 stroke-[3]" /> {r.std}
                      </span>
                    ) : (
                      <span className="text-on-surface-variant/70">{r.std}</span>
                    )}
                  </td>
                  <td className="py-4.5 px-6 font-sans">
                    {r.deep === 'Included' || r.deep.includes('Wipe') ? (
                      <span className="inline-flex items-center gap-1 text-secondary font-bold">
                        <Check className="w-4 h-4 stroke-[3]" /> {r.deep}
                      </span>
                    ) : (
                      <span className="text-primary font-medium">{r.deep}</span>
                    )}
                  </td>
                  <td className="py-4.5 px-6 font-sans">
                    {r.move === 'Included' || r.move.includes('Clean') || r.move.includes('Full') ? (
                      <span className="inline-flex items-center gap-1 text-secondary font-bold">
                        <Check className="w-4 h-4 stroke-[3]" /> {r.move}
                      </span>
                    ) : (
                      <span className="text-primary font-medium">{r.move}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Quote Promo Banner */}
      <div className="bg-secondary/5 rounded-3xl px-8 py-10 md:p-12 border border-secondary/20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-secondary">
            Experience the Serenity
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-primary leading-tight">
            Not sure which choice suits you?
          </h2>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-xl">
            Get in touch with our live consultation line or take 45 seconds to configure your parameters in our interactive billing tool to get an exact digital quote on the spot.
          </p>
        </div>
        <div className="shrink-0">
          <button
            onClick={() => onViewChange('book')}
            className="bg-secondary text-white font-sans text-sm font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-secondary/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            Go to Interactive Quoting
          </button>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-heading text-2xl font-bold text-primary">Frequently Asked Questions</h3>
          <p className="font-sans text-xs text-on-surface-variant">Simple clarification for your cleaning orchestration</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-surface-dim rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left py-5 px-6 flex justify-between items-center bg-white hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  <span className="font-sans text-sm font-bold text-primary flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-primary/70" />
                    {f.question}
                  </span>
                  <span className={`text-primary font-bold text-lg transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    ＋
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out border-t border-surface-container overflow-hidden ${
                    isOpen ? 'max-h-56 py-4 px-6 bg-surface-container-low/30' : 'max-h-0'
                  }`}
                >
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {f.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
