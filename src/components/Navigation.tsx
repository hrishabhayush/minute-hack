
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, PlaneTakeoff } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <PlaneTakeoff size={24} className="text-sky" />
          <span className="font-bold text-xl">Cove</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/passenger" className="nav-link font-medium">Passenger</Link>
          <Link to="/insurer" className="nav-link font-medium">Insurer</Link>
          <Button asChild variant="outline" className="border-sky text-sky hover:bg-sky hover:text-white">
            <Link to="/connect-wallet">Connect Wallet</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/passenger" 
              className="nav-link font-medium p-2" 
              onClick={closeMenu}
            >
              Passenger
            </Link>
            <Link 
              to="/insurer" 
              className="nav-link font-medium p-2" 
              onClick={closeMenu}
            >
              Insurer
            </Link>
            <Button asChild variant="outline" className="border-sky text-sky hover:bg-sky hover:text-white">
              <Link to="/connect-wallet" onClick={closeMenu}>Connect Wallet</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
