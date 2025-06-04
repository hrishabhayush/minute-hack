
import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneTakeoff, Mail, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <PlaneTakeoff size={24} className="text-sky" />
              <span className="font-bold text-xl">Cove</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Smart, blockchain-powered flight delay insurance that pays out instantly.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Passengers</h3>
            <ul className="space-y-2">
              <li><Link to="/passenger" className="text-sm nav-link">Get Insured</Link></li>
              <li><Link to="/passenger/policies" className="text-sm nav-link">My Policies</Link></li>
              <li><Link to="/faq" className="text-sm nav-link">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Insurers</h3>
            <ul className="space-y-2">
              <li><Link to="/insurer" className="text-sm nav-link">Available Flights</Link></li>
              <li><Link to="/insurer/stakes" className="text-sm nav-link">My Stakes</Link></li>
              <li><Link to="/about" className="text-sm nav-link">How It Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-sky transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-sky transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-sky transition-colors">
                <Github size={20} />
              </a>
              <a href="mailto:contact@cove-insurance.com" className="text-muted-foreground hover:text-sky transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Cove Insurance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
