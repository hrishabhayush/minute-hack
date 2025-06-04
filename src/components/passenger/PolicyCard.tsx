
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaneTakeoff, PlaneLanding, Calendar, Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface Policy {
  id: string;
  flightNumber: string;
  departure: { code: string; city: string };
  arrival: { code: string; city: string };
  departureDate: string;
  premium: number;
  coverage: number;
  status: 'active' | 'paid' | 'expired';
  delayMinutes?: number;
  payout?: number;
}

interface PolicyCardProps {
  policy: Policy;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy }) => {
  const isPaid = policy.status === 'paid';
  const isActive = policy.status === 'active';
  const isExpired = policy.status === 'expired';
  
  const formattedDate = new Date(policy.departureDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const getStatusBadge = () => {
    if (isPaid) {
      return <Badge className="bg-green-500">Paid Out</Badge>;
    } else if (isActive) {
      return <Badge className="bg-sky">Active</Badge>;
    } else {
      return <Badge variant="outline" className="text-muted-foreground">Expired</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{policy.flightNumber}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <PlaneTakeoff className="h-4 w-4 mr-1 text-sky" />
            <span>{policy.departure.city} ({policy.departure.code})</span>
          </div>
          <div className="flex items-center">
            <PlaneLanding className="h-4 w-4 mr-1 text-sky" />
            <span>{policy.arrival.city} ({policy.arrival.code})</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Premium:</span>
            <span className="font-medium ml-1">${policy.premium.toFixed(2)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Coverage:</span>
            <span className="font-medium ml-1">${policy.coverage.toFixed(2)}</span>
          </div>
        </div>
        
        <div className={`p-3 rounded-md ${
          isPaid ? 'bg-green-50 border border-green-100' : 
          isActive ? 'bg-blue-50 border border-blue-100' :
          'bg-gray-50 border border-gray-200'
        }`}>
          {isPaid && (
            <div className="flex items-center text-green-800">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              <div>
                <p className="font-medium">Payout of ${policy.payout?.toFixed(2)} completed</p>
                <p className="text-xs mt-0.5">Flight was delayed by {policy.delayMinutes} minutes</p>
              </div>
            </div>
          )}
          
          {isActive && (
            <div className="flex items-center text-sky-800">
              <Clock className="h-4 w-4 mr-2 text-sky-600" />
              <div>
                <p className="font-medium">Policy Active</p>
                <p className="text-xs mt-0.5">You'll receive ${policy.coverage.toFixed(2)} if delayed over 30 mins</p>
              </div>
            </div>
          )}
          
          {isExpired && (
            <div className="flex items-center text-gray-700">
              <AlertCircle className="h-4 w-4 mr-2 text-gray-500" />
              <div>
                <p className="font-medium">Policy Expired</p>
                <p className="text-xs mt-0.5">Flight completed with no qualifying delay</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex items-center">
        <HelpCircle className="h-3 w-3 mr-1" />
        Policy ID: {policy.id.slice(0, 8)}...
      </CardFooter>
    </Card>
  );
};

export default PolicyCard;
