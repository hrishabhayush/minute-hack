
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Clock, AlertTriangle, CheckCircle, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import WalletConnect from '@/components/WalletConnect';

interface FlightQuoteProps {
  flightDetails: {
    id: string;
    flightNumber: string;
    departure: { code: string; city: string };
    arrival: { code: string; city: string };
    departureDate: string;
    delayMinutes: number;
    riskTier: "Low" | "Medium" | "High";
    premiumUSD: number;
  };
  onPurchase: (flightId: string, walletAddress: string) => void;
}

const FlightQuote: React.FC<FlightQuoteProps> = ({ flightDetails, onPurchase }) => {
  const getRiskColor = (risk: "Low" | "Medium" | "High") => {
    switch (risk) {
      case "Low": return "text-risk-low";
      case "Medium": return "text-risk-medium";
      case "High": return "text-risk-high";
    }
  };
  
  const getRiskIcon = (risk: "Low" | "Medium" | "High") => {
    switch (risk) {
      case "Low": return <CheckCircle className="h-5 w-5 text-risk-low" />;
      case "Medium": return <Clock className="h-5 w-5 text-risk-medium" />;
      case "High": return <AlertTriangle className="h-5 w-5 text-risk-high" />;
    }
  };

  const handleConnect = (address: string) => {
    onPurchase(flightDetails.id, address);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          {flightDetails.flightNumber}
          <span className="ml-2 text-sm bg-sky/10 text-sky px-2 py-1 rounded-full">
            {new Date(flightDetails.departureDate).toLocaleDateString()}
          </span>
        </CardTitle>
        <CardDescription>
          {flightDetails.departure.city} ({flightDetails.departure.code}) to {flightDetails.arrival.city} ({flightDetails.arrival.code})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50">
          <div className="flex items-center">
            <div className="mr-4 w-10 h-10 rounded-full bg-sky/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-sky" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Delay</p>
              <p className="font-semibold text-lg">{flightDetails.delayMinutes} minutes</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getRiskIcon(flightDetails.riskTier)}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Risk Tier</p>
              <p className={`font-semibold text-lg ${getRiskColor(flightDetails.riskTier)}`}>
                {flightDetails.riskTier}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Premium Cost</span>
            <span className="font-semibold">${flightDetails.premiumUSD.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Coverage</span>
            <span className="font-semibold">$50.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delay Threshold</span>
            <span className="font-semibold">30 minutes</span>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="font-medium flex items-center text-green-800">
            <CheckCircle className="h-4 w-4 mr-2" />
            If your flight is delayed more than 30 minutes, you'll receive $50.00
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <PlaneTakeoff className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground mr-2">{flightDetails.departure.code}</span>
            <div className="w-16 h-px bg-muted-foreground"></div>
            <span className="text-xs text-muted-foreground mx-2">{flightDetails.flightNumber}</span>
            <div className="w-16 h-px bg-muted-foreground"></div>
            <PlaneLanding className="h-4 w-4 text-muted-foreground mx-1" />
            <span className="text-xs text-muted-foreground">{flightDetails.arrival.code}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <WalletConnect onConnect={handleConnect} />
      </CardFooter>
    </Card>
  );
};

export default FlightQuote;
