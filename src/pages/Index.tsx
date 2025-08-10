import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrainingPrograms } from "@/components/TrainingPrograms";
import { JobBoard } from "@/components/JobBoard";
import { AITools } from "@/components/AITools";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <TrainingPrograms />
        <JobBoard />
        <AITools />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
