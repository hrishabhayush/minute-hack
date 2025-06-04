
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Wallet, AlertCircle, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const { toast } = useToast();

  const mockWalletConnect = async () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock address
    const mockAddress = '0x' + Array.from({length: 40}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    
    setAddress(mockAddress);
    setIsConnected(true);
    setIsConnecting(false);
    
    // Show success toast
    toast({
      title: "Wallet Connected",
      description: `Connected to ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
    });
    
    // Close dialog after a delay
    setTimeout(() => {
      setIsOpen(false);
      if (onConnect) onConnect(mockAddress);
    }, 1000);
  };

  const handleOpenChange = (open: boolean) => {
    if (!isConnecting) setIsOpen(open);
  };
  
  const triggerConnect = () => {
    if (isConnected) {
      // Already connected, just notify
      if (onConnect) onConnect(address);
    } else {
      // Need to connect
      setIsOpen(true);
    }
  };

  return (
    <>
      <Button 
        onClick={triggerConnect}
        className={isConnected ? "bg-green-500 hover:bg-green-600" : ""}
        disabled={isConnecting}
      >
        {isConnected ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Connected
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>
              Connect your wallet to purchase insurance or provide liquidity.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center space-y-4">
              <Button 
                className="w-full justify-between"
                variant="outline"
                disabled={isConnecting}
                onClick={mockWalletConnect}
              >
                <div className="flex items-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                      alt="MetaMask" 
                      className="h-6 w-6 mr-2" />
                  MetaMask
                </div>
                {isConnecting ? (
                  <div className="animate-spin h-4 w-4 border-2 border-sky border-t-transparent rounded-full"/>
                ) : null}
              </Button>
              
              <Button 
                className="w-full justify-between"
                variant="outline"
                disabled={true}
              >
                <div className="flex items-center opacity-50">
                  <img src="https://cdn.worldvectorlogo.com/logos/walletconnect-1.svg" 
                      alt="WalletConnect" 
                      className="h-6 w-6 mr-2" />
                  WalletConnect (Coming Soon)
                </div>
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground pt-3 text-center">
              <AlertCircle className="h-3 w-3 inline mr-1" />
              This is a demo. No actual wallet connection is made.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;
