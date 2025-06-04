import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Mock insurance data generator
function mockInsurancePrediction({ amount, preferences }: { amount: number; preferences?: any }) {
  // Simulate diversification across 3 flights
  const flights = [
    { flight: 'NYC-LON', date: '2024-07-01', airline: 'Delta', allocation: 0.4, risk: 0.12, yield: 0.08 },
    { flight: 'LAX-TYO', date: '2024-07-05', airline: 'ANA', allocation: 0.35, risk: 0.09, yield: 0.10 },
    { flight: 'SFO-PAR', date: '2024-07-10', airline: 'Air France', allocation: 0.25, risk: 0.15, yield: 0.12 },
  ];
  const breakdown = flights.map(f => ({
    ...f,
    invested: +(amount * f.allocation).toFixed(2),
    expectedReturn: +(amount * f.allocation * (1 + f.yield - f.risk)).toFixed(2),
  }));
  const totalExpectedYield = breakdown.reduce((acc, f) => acc + (f.expectedReturn - f.invested), 0);
  const avgRisk = breakdown.reduce((acc, f) => acc + f.risk * f.allocation, 0);
  return {
    totalInvested: amount,
    expectedYield: +totalExpectedYield.toFixed(2),
    averageRisk: +avgRisk.toFixed(2),
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
