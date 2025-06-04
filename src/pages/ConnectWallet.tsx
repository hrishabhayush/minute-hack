
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import WalletConnect from '@/components/WalletConnect';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Wallet, Shield, DollarSign } from 'lucide-react';

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleConnect = (address: string) => {
    setWalletAddress(address);
    setIsConnected(true);
    
    toast({
      title: "Wallet Connected",
      description: "You can now purchase insurance or provide liquidity",
    });
    
    // Redirect after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md border border-silver-light">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-8 w-8 text-sky" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
            <p className="text-muted-foreground">
              Connect your wallet to access all features
            </p>
          </div>
          
          <div className="mb-8 flex justify-center">
            <WalletConnect onConnect={handleConnect} />
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="flex">
              <Shield className="h-5 w-5 text-sky mr-3 flex-shrink-0" />
              <p>
                <span className="font-medium">For Passengers:</span> Connect your wallet to purchase insurance and receive automatic payouts.
              </p>
            </div>
            
            <div className="flex">
              <DollarSign className="h-5 w-5 text-sky mr-3 flex-shrink-0" />
              <p>
                <span className="font-medium">For Insurers:</span> Connect your wallet to provide liquidity and earn returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConnectWallet;
