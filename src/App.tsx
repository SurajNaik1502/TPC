import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Training from "./pages/Training";
import Jobs from "./pages/Jobs";
import AITools from "./pages/AITools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ResumeGenerator from "./pages/ResumeGenerator";
import ResumeScanner from "./pages/ResumeScanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Training />} />
          <Route path="/home" element={<Index />} />
          <Route path="/training" element={<Training />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/resume-generator" element={<ResumeGenerator />} />
          <Route path="/resume-scanner" element={<ResumeScanner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
