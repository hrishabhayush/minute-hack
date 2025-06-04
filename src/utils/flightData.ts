
// Mock function as provided in the brief
export const getMockFlightPrediction = (flightId: string) => {
  // Create deterministic but "random-looking" outputs based on the flight ID
  const hash = stringToHash(flightId);
  
  const delays = [0, 15, 22, 30, 42, 55, 75, 120];
  const delayIndex = hash % delays.length;
  const delayMinutes = delays[delayIndex];
  
  const risks = ["Low", "Medium", "High"] as const;
  const riskIndex = Math.floor((hash / 100) % risks.length);
  const riskTier = risks[riskIndex] as "Low" | "Medium" | "High";
  
  // Premium calculation based on risk
  let premiumBase;
  if (riskTier === "Low") premiumBase = 3.5;
  else if (riskTier === "Medium") premiumBase = 6.75;
  else premiumBase = 9.9;
  
  // Add some variation to the premium
  const premiumVariation = ((hash % 20) - 10) / 10; // -1.0 to 1.0
  const premiumUSD = premiumBase + premiumVariation;
  
  // Expected APR for insurers (higher for higher risk)
  const baseAPR = riskTier === "Low" ? 5 : (riskTier === "Medium" ? 12 : 20);
  const aprVariation = ((hash % 40) - 20) / 20;
  const expectedAPR = baseAPR + aprVariation;
  
  return {
    delayMinutes,
    riskTier,
    premiumUSD: Number(premiumUSD.toFixed(2)),
    expectedAPR: Number(expectedAPR.toFixed(1)),
  };
};

// Simple hash function for string input
const stringToHash = (str: string): number => {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash);
};

// Mock airport data
export const airports = [
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA" },
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
  { code: "SYD", name: "Sydney Airport", city: "Sydney", country: "Australia" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
];

// Mock flight numbers
export const mockFlightNumbers = [
  "AA1234", "UA789", "DL456", "BA291", "LH710", 
  "EK432", "SQ121", "AF367", "QF809", "JL057"
];

// Generate a list of mock flights
export const generateMockFlights = (count = 10) => {
  const flights = [];
  
  for (let i = 0; i < count; i++) {
    const departureIndex = i % airports.length;
    const arrivalIndex = (i + 3) % airports.length;
    
    const flightNumber = mockFlightNumbers[i % mockFlightNumbers.length];
    const flightId = `${flightNumber}-${new Date().toISOString().slice(0, 10)}`;
    
    // Generate a date in the near future (1-14 days from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + ((i % 14) + 1));
    const departureDate = futureDate.toISOString().slice(0, 10);
    
    const prediction = getMockFlightPrediction(flightId);
    
    flights.push({
      id: flightId,
      flightNumber,
      departure: airports[departureIndex],
      arrival: airports[arrivalIndex],
      departureDate,
      ...prediction
    });
  }
  
  return flights;
};
