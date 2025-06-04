
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import FlightRiskCard from '@/components/insurer/FlightRiskCard';
import StakeModal from '@/components/insurer/StakeModal';
import { useToast } from '@/components/ui/use-toast';
import { generateMockFlights } from '@/utils/flightData';
import { useNavigate } from 'react-router-dom';

const InsurerDashboard = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setFlights(generateMockFlights(8));
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleStakeClick = (flightId: string) => {
    const flight = flights.find(f => f.id === flightId);
    if (flight) {
      setSelectedFlight(flight);
      setModalOpen(true);
    }
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFlight(null);
  };
  
  const handleStake = (flightId: string, amount: number, walletAddress: string) => {
    // Show a loading toast
    toast({
      title: "Processing your stake...",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Stake Successful!",
        description: `You've staked $${amount} on flight ${selectedFlight?.flightNumber}`,
      });
      
      setModalOpen(false);
      
      // Navigate to stakes page
      navigate('/insurer/stakes');
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Flights</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-sky border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {flights.map(flight => (
              <FlightRiskCard 
                key={flight.id} 
                flight={flight} 
                onStake={handleStakeClick} 
              />
            ))}
          </div>
        )}
        
        {selectedFlight && (
          <StakeModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            flight={selectedFlight}
            onStake={handleStake}
          />
        )}
      </div>
    </Layout>
  );
};

export default InsurerDashboard;
