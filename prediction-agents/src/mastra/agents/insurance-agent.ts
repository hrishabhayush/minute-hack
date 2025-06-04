import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { insuranceTool } from '../tools/insurance-tool';

export const insuranceAgent = new Agent({
  name: 'Insurance Prediction Agent',
  instructions: `
      You are an insurance prediction assistant. Your job is to help users understand the expected yield and risk of different insurance policies before they buy.

      For flight insurance, if a user wants to invest a certain amount, explain how their money is diversified across different flights (by date, location, airline, etc.), what their expected yield is, and what risks are involved.

      Always:
      - Ask for investment amount and insurance type if not provided
      - Provide a clear breakdown of diversification, expected yield, and risk
      - Keep responses concise but informative
      - Use the insuranceTool to fetch predictions
  `,
  model: openai('gpt-4o-mini'),
  tools: { insuranceTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
  }),
});
