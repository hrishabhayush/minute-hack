# Cove: The Universal Blockchain Insurance Layer

Cove is building the first blockchain Layer 1 (L1) designed to unify all parametric insurance markets—starting with flight delay insurance, but built to scale across every vertical: weather, cloud outages, sports events, and more. 

## Why Cove?

Traditional insurance is slow, fragmented, and region-locked. Each dApp or company solves just one niche (flight, weather, DeFi hacks), but liquidity and data are siloed, leading to inefficiency, high spreads, and poor user experience. Cove is different:

- **One L1, Infinite Markets:** Like Uniswap for swaps, Cove is the base layer for all insurance, not just one product. Shared liquidity, data feeds, and dev tools mean every new market strengthens the whole network.
- **Network Effects:** More money, more data, and more builders attract each other. Liquidity, data sources, and dev tooling multiply TVL and fees across all verticals.
- **Cross-Margin Collateral:** $100M in the master vault can serve multiple uncorrelated risks (flights, hurricanes, cloud outages) at once, maximizing capital efficiency.
- **Multi-Source Oracle:** We aggregate several high-quality data feeds for each event, making it nearly impossible to game the system or fake a claim.
- **Open Platform:** Third-party builders can launch new insurance products quickly, using our oracle rails and liquidity pool, instead of rolling their own.
- **Tradable Insurance:** Insurance positions are on-chain assets—hedge funds and re-insurers get mark-to-market liquidity, not multi-year lockups.
- **Governance:** Stakers vote on new insurance templates and earn a slice of protocol fees.

## Why Start with Flight Insurance?

Flight delays are a universal pain. Today, getting paid for a delay means weeks of paperwork and phone calls. With Cove:
- Anyone can insure a flight or provide insurance, not just airlines or big companies.
- Dynamic, AI-powered pricing means fairer premiums for passengers and better returns for providers.
- Claims are settled instantly, trustlessly, using zkEmail and flight oracles—no more waiting or arguing.

**Example:**
> “Whenever I fly from India to JFK, I worry about missing my bus if my flight is delayed. With Cove, I can get instant, fair insurance from anyone in the world, and if my flight is late, I'm paid automatically—no calls, no paperwork.”

## The Big Vision

- **All Markets, One Pool:** Flights, weather, cloud outages, concerts, crops, earthquakes, and more—all share one big pot of money. A smart pricing curve shifts capital to where it's needed, so idle cash in one market helps fund another.
- **Efficient, Global, Interoperable:** Anyone can insure anything, anywhere, anytime. No more regional silos or monopoly pricing.
- **Data Integrity:** Multi-mesh oracles cross-verify every claim, making cheating or errors almost impossible.
- **Capital Efficiency:** No human claims adjusters, no paperwork—just software and smart contracts. Lower costs, faster payouts.
- **Infinite Possibilities:** As new risks emerge, builders can launch new insurance markets in days, not months.

## How It Works (Demo)
- **Yield Prediction:** For demo, yields are always 6–10% (positive, fair, and realistic).
- **Diversification:** Your investment is spread across multiple flights or events, each with its own risk/yield profile.
- **AI Explanations:** The agent explains your portfolio, expected yield, and risk in plain language.

## Directory Structure
```
prediction-agents/
├── src/
│   └── mastra/
│       ├── agents/
│       │   └── insurance-agent.ts         # The insurance prediction agent definition
│       ├── tools/
│       │   └── insurance-tool.ts          # The tool that simulates insurance predictions
│       ├── workflows/
│       │   └── insurance-workflow.ts      # The workflow orchestrating prediction and explanation
│       └── index.ts                       # Mastra entrypoint (registers agent & workflow)
├── package.json
├── tsconfig.json
└── README.md
```

## Setup & Running
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the Mastra development server:**
   ```sh
   npm run dev
   ```
   This will start the Mastra server and load your insurance prediction agent.

3. **Interact with the Agent:**
   - Use the Mastra web UI (if available) or CLI to run the `insurance-workflow`.
   - Example CLI usage:
     ```sh
     npx mastra run insurance-workflow --input '{"amount": 200, "insuranceType": "flight"}'
     ```

## Customization
- Edit `src/mastra/tools/insurance-tool.ts` to change the mock prediction logic or yield range.
- Edit `src/mastra/agents/insurance-agent.ts` to update the agent's instructions or behavior.
- Edit `src/mastra/workflows/insurance-workflow.ts` to change the workflow logic or output.

## Technologies Used
- [Mastra](https://mastra.ai/) (agent framework)
- TypeScript
- Zod (schema validation)
- OpenAI (for LLM-powered explanations)

---

**Demo Focus:**
- All yields are positive and between 6-10% for demo purposes.
- No real insurance or financial data is used.

---

Cove is the first-mover in blockchain insurance, unifying all parametric insurance under one AMM + oracle layer. We're building the rails for the next generation of global, efficient, and fair insurance markets.

For questions or further customization, feel free to reach out!
