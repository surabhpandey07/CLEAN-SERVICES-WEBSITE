import { Menu } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'pricing' | 'book' | 'confirmed';
  onViewChange: (view: 'home' | 'pricing' | 'book' | 'confirmed') => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-surface-container-high transition-all">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-10 h-20 w-full">
        {/* Logo */}
        <button
          onClick={() => onViewChange('home')}
          className="font-heading text-2xl font-extrabold text-primary tracking-tight hover:opacity-85 transition-opacity cursor-pointer"
        >
          CleanSerene
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => onViewChange('home')}
            className={`font-sans text-[15px] font-medium transition-all cursor-pointer ${
              currentView === 'home'
                ? 'text-primary font-bold border-b-2 border-primary pb-1'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => onViewChange('pricing')}
            className={`font-sans text-[15px] font-medium transition-all cursor-pointer ${
              currentView === 'pricing'
                ? 'text-primary font-bold border-b-2 border-primary pb-1'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => {
              onViewChange('home');
              setTimeout(() => {
                const element = document.getElementById('how-it-works-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="font-sans text-[15px] font-medium text-on-surface-variant hover:text-primary cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => {
              onViewChange('home');
              setTimeout(() => {
                const element = document.getElementById('testimonials-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="font-sans text-[15px] font-medium text-on-surface-variant hover:text-primary cursor-pointer"
          >
            Reviews
          </button>
        </nav>

        {/* Call to Action button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onViewChange('book')}
            className="bg-primary text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer shadow-sm shadow-primary/10"
          >
            Book Now
          </button>
          
          <button className="md:hidden text-primary p-1 hover:bg-surface-container rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
