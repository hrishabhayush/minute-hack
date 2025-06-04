
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaneTakeoff, Clock, DollarSign, AlertCircle } from 'lucide-react';

interface Stake {
  id: string;
  flightId: string;
  flightNumber: string;
  departure: { code: string; city: string };
  arrival: { code: string; city: string };
  departureDate: string;
  stakeAmount: number;
  status: 'active' | 'settled' | 'loss';
  earnings?: number;
  loss?: number;
}

interface StakeCardProps {
  stake: Stake;
}

const StakeCard: React.FC<StakeCardProps> = ({ stake }) => {
  const isSettled = stake.status === 'settled';
  const isActive = stake.status === 'active';
  const isLoss = stake.status === 'loss';
  
  const formattedDate = new Date(stake.departureDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const getStatusBadge = () => {
    if (isSettled) {
      return <Badge className="bg-green-500">Settled</Badge>;
    } else if (isActive) {
      return <Badge className="bg-sky">Active</Badge>;
    } else {
      return <Badge variant="destructive">Loss</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{stake.flightNumber}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <PlaneTakeoff className="h-4 w-4 mr-1 text-sky" />
            <span>{stake.departure.code}</span>
          </div>
          <div className="border-b border-dashed flex-grow mx-2"></div>
          <div>
            <span>{stake.arrival.code}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">Staked:</span>
            </div>
            <span className="font-medium">${stake.stakeAmount.toFixed(2)}</span>
          </div>
          
          {isSettled && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                <span className="text-green-500">Earnings:</span>
              </div>
              <span className="font-medium text-green-500">+${stake.earnings?.toFixed(2)}</span>
            </div>
          )}
          
          {isLoss && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
                <span className="text-red-500">Loss:</span>
              </div>
              <span className="font-medium text-red-500">-${stake.loss?.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-md ${
          isSettled ? 'bg-green-50 border border-green-100' : 
          isActive ? 'bg-blue-50 border border-blue-100' :
          'bg-red-50 border border-red-100'
        }`}>
          {isSettled && (
            <div className="flex items-center text-green-800">
              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
              <div>
                <p className="font-medium">Stake settled successfully</p>
                <p className="text-xs mt-0.5">Flight completed without qualifying delays</p>
              </div>
            </div>
          )}
          
          {isActive && (
            <div className="flex items-center text-sky-800">
              <Clock className="h-4 w-4 mr-2 text-sky-600" />
              <div>
                <p className="font-medium">Stake Active</p>
                <p className="text-xs mt-0.5">Will settle after flight completion</p>
              </div>
            </div>
          )}
          
          {isLoss && (
            <div className="flex items-center text-red-800">
              <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
              <div>
                <p className="font-medium">Payout Triggered</p>
                <p className="text-xs mt-0.5">Flight delay of 45+ minutes occurred</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Stake ID: {stake.id.slice(0, 8)}...
      </CardFooter>
    </Card>
  );
};

export default StakeCard;
