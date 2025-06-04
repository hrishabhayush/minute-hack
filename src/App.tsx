
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PassengerDashboard from "./pages/passenger/PassengerDashboard";
import PassengerPolicies from "./pages/passenger/PassengerPolicies";
import InsurerDashboard from "./pages/insurer/InsurerDashboard";
import InsurerStakes from "./pages/insurer/InsurerStakes";
import ConnectWallet from "./pages/ConnectWallet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/passenger" element={<PassengerDashboard />} />
          <Route path="/passenger/policies" element={<PassengerPolicies />} />
          <Route path="/insurer" element={<InsurerDashboard />} />
          <Route path="/insurer/stakes" element={<InsurerStakes />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
