import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VoterLogin from "./pages/VoterLogin";
import VoterRegister from "./pages/VoterRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VoterDashboard from "./pages/VoterDashboard";
import VotingPage from "./pages/VotingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import PartyLogin from "./pages/PartyLogin";
import PartyRegister from "./pages/PartyRegister";
import PartyDashboard from "./pages/PartyDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voter-login" element={<VoterLogin />} />
          <Route path="/voter-register" element={<VoterRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/voter-dashboard" element={<VoterDashboard />} />
          <Route path="/vote/:electionId" element={<VotingPage />} />
          <Route path="/party-login" element={<PartyLogin />} />
          <Route path="/party-register" element={<PartyRegister />} />
          <Route path="/party-dashboard" element={<PartyDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;