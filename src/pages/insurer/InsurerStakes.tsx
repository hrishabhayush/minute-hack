
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import StakeCard from '@/components/insurer/StakeCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for stakes
const generateMockStakes = () => {
  const statuses = ['active', 'settled', 'loss'] as const;
  
  return Array(5).fill(null).map((_, i) => {
    const status = statuses[i % 3] as 'active' | 'settled' | 'loss';
    const flightId = `flight-${i}`;
    const flightNumber = `AA${1234 + i}`;
    const departure = {
      code: ['JFK', 'LAX', 'SFO', 'ORD', 'MIA'][i % 5],
      city: ['New York', 'Los Angeles', 'San Francisco', 'Chicago', 'Miami'][i % 5]
    };
    const arrival = {
      code: ['LHR', 'CDG', 'FRA', 'AMS', 'MAD'][i % 5],
      city: ['London', 'Paris', 'Frankfurt', 'Amsterdam', 'Madrid'][i % 5]
    };
    
    // Calculate date (current date + i days)
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const stakeAmount = 100 + i * 25;
    const earnings = status === 'settled' ? stakeAmount * 0.15 : undefined;
    const loss = status === 'loss' ? stakeAmount * 0.5 : undefined;
    
    return {
      id: `stake-${i}-${Date.now()}`,
      flightId,
      flightNumber,
      departure,
      arrival,
      departureDate: date.toISOString().split('T')[0],
      stakeAmount,
      status,
      earnings,
      loss, 
    };
  });
};

const InsurerStakes = () => {
  const [stakes, setStakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStakes(generateMockStakes());
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Stakes</h1>
          <Button asChild className="bg-sky hover:bg-sky-dark">
            <Link to="/insurer">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Stake
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-sky border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakes.map(stake => (
              <StakeCard key={stake.id} stake={stake} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InsurerStakes;
