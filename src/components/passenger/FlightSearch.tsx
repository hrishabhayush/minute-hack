
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { airports, mockFlightNumbers } from '@/utils/flightData';
import { PlaneTakeoff, Search } from 'lucide-react';

interface FlightSearchProps {
  onSearch: (data: {
    departureAirport: string;
    arrivalAirport: string;
    flightNumber: string;
    departureDate: string;
  }) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch }) => {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  
  // Generate today's date in YYYY-MM-DD format for the min date of the date picker
  const today = new Date().toISOString().split('T')[0];
  
  // Generate a date 6 months from now for the max date
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const maxDate = sixMonthsFromNow.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      departureAirport,
      arrivalAirport,
      flightNumber,
      departureDate
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-silver-light">
      <div className="flex items-center mb-6">
        <PlaneTakeoff className="h-6 w-6 text-sky mr-2" />
        <h2 className="text-2xl font-semibold">Find Your Flight</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Departure Airport</label>
            <Select required value={departureAirport} onValueChange={setDepartureAirport}>
              <SelectTrigger>
                <SelectValue placeholder="Select departure airport" />
              </SelectTrigger>
              <SelectContent>
                {airports.map(airport => (
                  <SelectItem key={airport.code} value={airport.code}>
                    {airport.code} - {airport.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Arrival Airport</label>
            <Select required value={arrivalAirport} onValueChange={setArrivalAirport}>
              <SelectTrigger>
                <SelectValue placeholder="Select arrival airport" />
              </SelectTrigger>
              <SelectContent>
                {airports.map(airport => (
                  <SelectItem key={airport.code} value={airport.code}>
                    {airport.code} - {airport.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Flight Number</label>
            <Select required value={flightNumber} onValueChange={setFlightNumber}>
              <SelectTrigger>
                <SelectValue placeholder="Select flight number" />
              </SelectTrigger>
              <SelectContent>
                {mockFlightNumbers.map(number => (
                  <SelectItem key={number} value={number}>
                    {number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Departure Date</label>
            <Input 
              type="date" 
              required
              min={today}
              max={maxDate}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-sky hover:bg-sky-dark">
          <Search className="mr-2 h-4 w-4" />
          Search Flights
        </Button>
      </form>
    </div>
  );
};

export default FlightSearch;
