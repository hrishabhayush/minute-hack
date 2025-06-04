
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, Clock, DollarSign } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-gradient pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8 mt-8 lg:mt-0 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Flight delay? <br />
                <span className="text-sky">Get paid instantly.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mt-4">
                Smart insurance that pays out automatically when your flight is delayed.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-sky hover:bg-sky-dark">
                <Link to="/passenger">
                  <PlaneTakeoff className="mr-2 h-5 w-5" />
                  View Flights & Get Insured
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-sky text-sky hover:bg-sky/10">
                <Link to="/insurer">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Become an Insurer
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky/10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-sky/10 rounded-full"></div>
              
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 border border-silver-light animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky/10 text-sky">
                    <Clock size={20} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-muted-foreground">Flight Status</div>
                    <div className="font-semibold text-lg">AA1234 • Delayed</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Delay</span>
                    <span className="font-medium">42 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Risk Tier</span>
                    <span className="font-medium text-amber-500">Medium</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Coverage Amount</span>
                    <span className="font-medium">$50.00</span>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3 border border-green-100 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div className="ml-2">
                    <div className="text-sm text-green-800 font-medium">Payout Triggered</div>
                    <div className="text-xs text-green-600">$50.00 sent to your wallet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
