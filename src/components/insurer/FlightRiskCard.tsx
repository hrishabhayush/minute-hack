
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaneTakeoff, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface FlightRiskCardProps {
  flight: {
    id: string;
    flightNumber: string;
    departure: { code: string; city: string };
    arrival: { code: string; city: string };
    departureDate: string;
    delayMinutes: number;
    riskTier: "Low" | "Medium" | "High";
    expectedAPR: number;
  };
  onStake: (flightId: string) => void;
}

const FlightRiskCard: React.FC<FlightRiskCardProps> = ({ flight, onStake }) => {
  const getRiskColor = (risk: "Low" | "Medium" | "High") => {
    switch (risk) {
      case "Low": return "bg-risk-low";
      case "Medium": return "bg-risk-medium";
      case "High": return "bg-risk-high";
    }
  };
  
  const getRiskTextColor = (risk: "Low" | "Medium" | "High") => {
    switch (risk) {
      case "Low": return "text-risk-low";
      case "Medium": return "text-risk-medium";
      case "High": return "text-risk-high";
    }
  };
  
  const formattedDate = new Date(flight.departureDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="h-full card-hover">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>{flight.flightNumber}</CardTitle>
          <Badge className={`${getRiskColor(flight.riskTier)} text-white`}>{flight.riskTier} Risk</Badge>
        </div>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-3">
        <div className="text-sm flex justify-between">
          <div>
            <span className="text-muted-foreground">From: </span>
            <span className="font-medium">{flight.departure.code}</span>
          </div>
          <div>
            <span className="text-muted-foreground">To: </span>
            <span className="font-medium">{flight.arrival.code}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-sky/10 flex items-center justify-center mr-2">
              <Clock className="h-4 w-4 text-sky" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expected Delay</p>
              <p className="font-medium">{flight.delayMinutes} minutes</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expected APR</p>
              <p className="font-medium text-green-600">{flight.expectedAPR}%</p>
            </div>
          </div>
        </div>
        
        <div className={`p-3 rounded-md border ${
          flight.riskTier === "Low" ? "border-risk-low/20 bg-risk-low/5" :
          flight.riskTier === "Medium" ? "border-risk-medium/20 bg-risk-medium/5" :
          "border-risk-high/20 bg-risk-high/5"
        }`}>
          <div className="flex items-start">
            <AlertTriangle className={`h-4 w-4 mt-0.5 mr-2 ${getRiskTextColor(flight.riskTier)}`} />
            <div>
              <p className={`text-sm font-medium ${getRiskTextColor(flight.riskTier)}`}>
                {flight.riskTier === "Low" ? "Low risk of delay" : 
                 flight.riskTier === "Medium" ? "Moderate delay risk" : 
                 "High chance of delay"}
              </p>
              <p className="text-xs mt-1 text-muted-foreground">
                {flight.riskTier === "Low" ? 
                  "Historically reliable route with minimal delays" :
                 flight.riskTier === "Medium" ? 
                  "Some potential for delays based on route history" :
                  "Route has frequent delays, higher potential returns"
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onStake(flight.id)} 
          className="w-full bg-sky hover:bg-sky-dark"
        >
          <PlaneTakeoff className="mr-2 h-4 w-4" />
          Provide Liquidity
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FlightRiskCard;
