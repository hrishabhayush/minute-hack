
import React from 'react';
import { Plane, Shield, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Plane className="h-8 w-8 text-sky" />,
      title: "Enter Your Flight",
      description: "Input your flight details and we'll assess the delay risk using our AI prediction model."
    },
    {
      icon: <Shield className="h-8 w-8 text-sky" />,
      title: "Get Covered",
      description: "Purchase insurance with a premium based on the risk level. Connect your wallet for instant future payouts."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-sky" />,
      title: "Automatic Payouts",
      description: "If your flight is delayed beyond the threshold, funds are automatically sent to your wallet. No claims needed."
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cove makes flight delay insurance simple, transparent, and instant
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-silver-light card-hover">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-sky/5 rounded-full"></div>
                <div className="mb-4 w-16 h-16 rounded-full bg-sky/10 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <div className="text-xl font-semibold mb-2 mt-4">
                {index + 1}. {step.title}
              </div>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
