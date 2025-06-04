
import React from 'react';
import { Shield, Zap, DollarSign, Clock } from 'lucide-react';

const Benefits = () => {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Better insurance for everyone</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cove uses smart contracts and real-time data to provide instant payouts for flight delays.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="text-2xl font-semibold mb-4 text-sky">For Passengers</div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-sky/10 flex items-center justify-center">
                  <Zap size={20} className="text-sky" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium mb-2">Instant Payouts</h3>
                <p className="text-muted-foreground">
                  No claims forms, no waiting. Get paid automatically the moment your flight delay hits the threshold.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-sky/10 flex items-center justify-center">
                  <Shield size={20} className="text-sky" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium mb-2">Peace of Mind</h3>
                <p className="text-muted-foreground">
                  Travel with confidence knowing you're protected. Cover hotel costs or rebookings without stress.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="text-2xl font-semibold mb-4 text-sky">For Insurers</div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-sky/10 flex items-center justify-center">
                  <DollarSign size={20} className="text-sky" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium mb-2">Attractive Returns</h3>
                <p className="text-muted-foreground">
                  Earn competitive APR by providing liquidity to flight insurance pools with risk-based pricing.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-sky/10 flex items-center justify-center">
                  <Clock size={20} className="text-sky" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium mb-2">Smart Risk Assessment</h3>
                <p className="text-muted-foreground">
                  Our AI model predicts flight delays with high accuracy, helping you make data-driven investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
