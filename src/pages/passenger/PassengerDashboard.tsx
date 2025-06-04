
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FlightSearch from '@/components/passenger/FlightSearch';
import FlightQuote from '@/components/passenger/FlightQuote';
import { useToast } from '@/components/ui/use-toast';
import { getMockFlightPrediction, airports } from '@/utils/flightData';
import { useNavigate } from 'react-router-dom';

const PassengerDashboard = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [flightDetails, setFlightDetails] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSearch = (data: {
    departureAirport: string;
    arrivalAirport: string;
    flightNumber: string;
    departureDate: string;
  }) => {
    // Generate a flight ID from the data
    const flightId = `${data.flightNumber}-${data.departureDate}`;
    
    // Get the prediction from our utility
    const prediction = getMockFlightPrediction(flightId);
    
    // Find the departure and arrival airport details
    const departure = airports.find(airport => airport.code === data.departureAirport);
    const arrival = airports.find(airport => airport.code === data.arrivalAirport);
    
    if (!departure || !arrival) {
      toast({
        title: "Error",
        description: "Could not find airport details",
        variant: "destructive"
      });
      return;
    }
    
    // Set the flight details
    setFlightDetails({
      id: flightId,
      flightNumber: data.flightNumber,
      departure,
      arrival,
      departureDate: data.departureDate,
      ...prediction
    });
    
    setSearchPerformed(true);
  };
  
  const handlePurchase = (flightId: string, walletAddress: string) => {
    // Show a loading toast
    toast({
      title: "Processing your purchase...",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Insurance Purchased!",
        description: "Your policy has been confirmed",
      });
      
      // Navigate to policies page
      navigate('/passenger/policies');
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Flight Delay Insurance</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FlightSearch onSearch={handleSearch} />
          
          <div className="flex items-center justify-center lg:justify-start">
            {!searchPerformed ? (
              <div className="text-center lg:text-left max-w-md">
                <h2 className="text-xl font-medium mb-2">Get protected against delays</h2>
                <p className="text-muted-foreground">
                  Search for your flight and get an instant quote based on our AI delay prediction model.
                </p>
              </div>
            ) : flightDetails ? (
              <FlightQuote flightDetails={flightDetails} onPurchase={handlePurchase} />
            ) : (
              <div className="text-center">
                <p className="text-lg font-medium text-red-500">Could not find flight details</p>
                <p className="text-muted-foreground">Please try a different flight</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PassengerDashboard;
