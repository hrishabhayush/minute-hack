import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Mock insurance data generator
function mockInsurancePrediction({ amount, preferences }: { amount: number; preferences?: any }) {
  // Simulate diversification across 3 flights
  const flights = [
    { flight: 'NYC-LON', date: '2024-07-01', airline: 'Delta', allocation: 0.4 },
    { flight: 'LAX-TYO', date: '2024-07-05', airline: 'ANA', allocation: 0.35 },
    { flight: 'SFO-PAR', date: '2024-07-10', airline: 'Air France', allocation: 0.25 },
  ];
  // Assign a random yield between 6% and 10% for each flight
  const getRandomYield = () => +(6 + Math.random() * 4).toFixed(2) / 100;
  const breakdown = flights.map(f => {
    const yieldRate = getRandomYield();
    const invested = +(amount * f.allocation).toFixed(2);
    const expectedReturn = +(invested * (1 + yieldRate)).toFixed(2);
    return {
      ...f,
      risk: 0, // For demo, set risk to 0
      yield: +(yieldRate * 100).toFixed(2), // as percent
      invested,
      expectedReturn,
    };
  });
  // Calculate total expected yield (sum of all yields minus invested)
  const totalInvested = amount;
  const totalExpectedReturn = breakdown.reduce((acc, f) => acc + f.expectedReturn, 0);
  const expectedYield = +(totalExpectedReturn - totalInvested).toFixed(2);
  return {
    totalInvested,
    expectedYield,
    averageRisk: 0,
    diversification: breakdown,
  };
}

export const insuranceTool = createTool({
  id: 'insurance-predictor',
  description: 'Predicts yield and risk for insurance investments (e.g., flight insurance)',
  inputSchema: z.object({
    amount: z.number().describe('Investment amount in USD'),
    insuranceType: z.string().describe('Type of insurance, e.g., flight'),
    preferences: z.object({
      dates: z.array(z.string()).optional(),
      locations: z.array(z.string()).optional(),
      airlines: z.array(z.string()).optional(),
    }).optional(),
  }),
  outputSchema: z.object({
    totalInvested: z.number(),
    expectedYield: z.number(),
    averageRisk: z.number(),
    diversification: z.array(z.object({
      flight: z.string(),
      date: z.string(),
      airline: z.string(),
      allocation: z.number(),
      invested: z.number(),
      risk: z.number(),
      yield: z.number(),
      expectedReturn: z.number(),
    })),
  }),
  execute: async ({ context }) => {
    return mockInsurancePrediction(context);
  },
});
