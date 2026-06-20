import { Mail, Phone, MessageSquare, ShieldCheck, Globe, Share2 } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: 'home' | 'pricing' | 'book' | 'confirmed') => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  return (
    <footer className="bg-surface-container-low border-t border-surface-dim pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => onViewChange('home')}
            className="text-left font-heading text-xl font-bold text-primary tracking-tight cursor-pointer"
          >
            CleanSerene
          </button>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Delivering premium cleaning services with a meticulous touch for over a decade. 
            Trusted by 10,000+ homeowners to transform spaces into stress-free sanctuaries.
          </p>
          <div className="flex space-x-3 pt-2">
            <button className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Globe className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 2: Navigation / Services */}
        <div>
          <h4 className="font-sans text-[13px] font-bold text-primary uppercase tracking-wider mb-4">
            Services
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => onViewChange('pricing')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left"
              >
                Home Cleaning
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange('pricing')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left"
              >
                Deep Cleaning
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange('pricing')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left"
              >
                Move In / Out
              </button>
            </li>
            <li>
              <button
                onClick={() => onViewChange('pricing')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left"
              >
                Office Sanitation
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="font-sans text-[13px] font-bold text-primary uppercase tracking-wider mb-4">
            Company
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => {
                  onViewChange('home');
                  setTimeout(() => {
                    const e = document.getElementById('how-it-works-section');
                    e?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left"
              >
                About Us
              </button>
            </li>
            <li>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left">
                Service Areas
              </button>
            </li>
            <li>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left">
                Careers
              </button>
            </li>
            <li>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left">
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Support */}
        <div>
          <h4 className="font-sans text-[13px] font-bold text-primary uppercase tracking-wider mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-3 text-on-surface-variant">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>hello@cleanserene.com</span>
            </li>
            <li className="flex items-center space-x-3 text-on-surface-variant">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>(555) 123-4567</span>
            </li>
            <li className="pt-2">
              <button 
                onClick={() => alert("Support ticket opened! Our home experts will contact you within 2 hours.")}
                className="text-primary font-bold text-xs underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer flex items-center space-x-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Support</span>
              </button>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 pt-6 border-t border-surface-container-highest flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-on-surface-variant text-xs text-center md:text-left">
          © 2026 CleanSerene Professional Cleaning Services. All rights reserved.
        </p>
        <p className="text-on-surface-variant text-[11px] flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary inline" />
          <span>Vetted Professionals & Fully Bonded Insurance Coverage</span>
        </p>
      </div>
    </footer>
  );
}
