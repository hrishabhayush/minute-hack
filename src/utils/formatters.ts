
// Function to get dollar icon for amount
export const getDollarIconForAmount = (amount: number) => {
  const numDollars = Math.min(3, Math.max(1, Math.floor(amount / 100)));
  return '$'.repeat(numDollars);
};

// Format wallet address
export const formatWalletAddress = (address: string) => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format flight date
export const formatFlightDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format risk tier with appropriate color class
export const formatRiskTier = (riskTier: "Low" | "Medium" | "High") => {
  const colorClass = 
    riskTier === "Low" ? "text-risk-low" : 
    riskTier === "Medium" ? "text-risk-medium" : 
    "text-risk-high";
    
  return { label: riskTier, colorClass };
};
