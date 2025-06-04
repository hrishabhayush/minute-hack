
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import WalletConnect from '@/components/WalletConnect';
import { getDollarIconForAmount } from '@/utils/formatters';

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: {
    id: string;
    flightNumber: string;
    departure: { code: string; city: string };
    arrival: { code: string; city: string };
    departureDate: string;
    riskTier: "Low" | "Medium" | "High";
    expectedAPR: number;
  } | null;
  onStake: (flightId: string, amount: number, walletAddress: string) => void;
}

const StakeModal: React.FC<StakeModalProps> = ({ isOpen, onClose, flight, onStake }) => {
  const [amount, setAmount] = useState(100);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  if (!flight) return null;

  const handleAmountChange = (value: number[]) => {
    setAmount(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 10 && value <= 1000) {
      setAmount(value);
    }
  };

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
  };

  const handleStake = () => {
    if (isWalletConnected && flight) {
      onStake(flight.id, amount, walletAddress);
    }
  };

  const estimatedReturns = (amount * (flight.expectedAPR / 100)).toFixed(2);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Provide Liquidity for Flight {flight.flightNumber}</DialogTitle>
          <DialogDescription>
            Stake funds to back this flight and earn returns when no delays occur
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>From {flight.departure.code} to {flight.arrival.code}</span>
              <span>{new Date(flight.departureDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Risk Level:</span>
              <span className={
                flight.riskTier === "Low" ? "text-risk-low" :
                flight.riskTier === "Medium" ? "text-risk-medium" : "text-risk-high"
              }>{flight.riskTier}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Expected APR:</span>
              <span className="text-green-600">{flight.expectedAPR}%</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <label className="text-sm font-medium">Stake Amount (USD)</label>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-lg">{getDollarIconForAmount(amount)}</span>
              <Slider 
                value={[amount]} 
                min={10} 
                max={1000} 
                step={10}
                onValueChange={handleAmountChange} 
                className="flex-grow"
              />
              <Input 
                type="number" 
                value={amount} 
                onChange={handleInputChange} 
                className="w-20"
                min={10}
                max={1000}
              />
            </div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-md border border-green-100">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Estimated Returns:</span>
              <span className="font-medium text-green-600">${estimatedReturns}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Returns are paid out after flight completion if no qualifying delays occur
            </div>
          </div>
          
          <div className="pt-2 flex flex-col space-y-4">
            {!isWalletConnected ? (
              <WalletConnect onConnect={handleWalletConnect} />
            ) : (
              <Button onClick={handleStake} className="bg-sky hover:bg-sky-dark">
                Stake ${amount}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StakeModal;
