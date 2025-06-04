import { openai } from '@ai-sdk/openai';
import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { insuranceTool } from '../tools/insurance-tool';
import { insuranceAgent } from '../agents/insurance-agent';

const llm = openai('gpt-4o-mini');

const agent = insuranceAgent;

const insuranceInputSchema = z.object({
  amount: z.number().describe('Investment amount in USD'),
  insuranceType: z.string().describe('Type of insurance, e.g., flight'),
  preferences: z.object({
    dates: z.array(z.string()).optional(),
    locations: z.array(z.string()).optional(),
    airlines: z.array(z.string()).optional(),
  }).optional(),
});

const insuranceOutputSchema = z.object({
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
});

const predictInsurance = createStep({
  id: 'predict-insurance',
  description: 'Predicts yield and risk for insurance investments',
  inputSchema: insuranceInputSchema,
  outputSchema: insuranceOutputSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }
    // Bypass type check for demo purposes
    return await insuranceTool.execute({ context: inputData } as any);
  },
});

const explainDiversification = createStep({
  id: 'explain-diversification',
  description: 'Explains the diversification and risk/yield breakdown to the user',
  inputSchema: insuranceOutputSchema,
  outputSchema: z.object({
    explanation: z.string(),
  }),
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Insurance prediction data not found');
    }
    const prompt = `A user has invested $${inputData.totalInvested} in flight insurance. Here is the diversification and risk/yield breakdown: ${JSON.stringify(inputData, null, 2)}.\nExplain to the user how their money is diversified, what their expected yield is, and what risks are involved. Be concise but informative.`;
    const response = await agent.stream([
      {
        role: 'user',
        content: prompt,
      },
    ]);
    let explanation = '';
    for await (const chunk of response.textStream) {
      explanation += chunk;
    }
    return { explanation };
  },
});

const insuranceWorkflow = createWorkflow({
  id: 'insurance-workflow',
  inputSchema: insuranceInputSchema,
  outputSchema: z.object({
    explanation: z.string(),
  }),
})
  .then(predictInsurance)
  .then(explainDiversification);

insuranceWorkflow.commit();

export { insuranceWorkflow };
