import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'pricing' | 'book' | 'confirmed';
  onViewChange: (view: 'home' | 'pricing' | 'book' | 'confirmed') => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (view: 'home' | 'pricing' | 'book' | 'confirmed', sectionId?: string) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-surface-container-high transition-all">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-10 h-20 w-full">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="font-heading text-2xl font-extrabold text-primary tracking-tight hover:opacity-85 transition-opacity cursor-pointer"
        >
          CleanSerene
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleLinkClick('home')}
            className={`font-sans text-[15px] font-medium transition-all cursor-pointer ${
              currentView === 'home'
                ? 'text-primary font-bold border-b-2 border-primary pb-1'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => handleLinkClick('pricing')}
            className={`font-sans text-[15px] font-medium transition-all cursor-pointer ${
              currentView === 'pricing'
                ? 'text-primary font-bold border-b-2 border-primary pb-1'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => handleLinkClick('home', 'how-it-works-section')}
            className="font-sans text-[15px] font-medium text-on-surface-variant hover:text-primary cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => handleLinkClick('home', 'testimonials-section')}
            className="font-sans text-[15px] font-medium text-on-surface-variant hover:text-primary cursor-pointer"
          >
            Reviews
          </button>
        </nav>

        {/* Call to Action button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleLinkClick('book')}
            className="bg-primary text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-primary/10 animate-pulse-subtle"
          >
            Book Now
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary p-2 hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-surface-container-high py-5 px-6 space-y-4 animate-fade-in absolute top-20 left-0 w-full shadow-xl z-40">
          <button
            onClick={() => handleLinkClick('home')}
            className={`block w-full text-left py-2 font-sans text-[15px] font-semibold ${
              currentView === 'home' ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => handleLinkClick('pricing')}
            className={`block w-full text-left py-2 font-sans text-[15px] font-semibold ${
              currentView === 'pricing' ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => handleLinkClick('home', 'how-it-works-section')}
            className="block w-full text-left py-2 font-sans text-[15px] font-semibold text-on-surface-variant hover:text-primary"
          >
            About Us
          </button>
          <button
            onClick={() => handleLinkClick('home', 'testimonials-section')}
            className="block w-full text-left py-2 font-sans text-[15px] font-semibold text-on-surface-variant hover:text-primary"
          >
            Reviews
          </button>
          <div className="pt-2 border-t border-surface-container-high">
            <button
              onClick={() => handleLinkClick('book')}
              className="block w-full text-center bg-primary text-white font-sans text-[15px] font-bold py-3 px-4 rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-primary/10"
            >
              Book Premium Clean
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
