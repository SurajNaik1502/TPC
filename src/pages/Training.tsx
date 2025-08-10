import { TrainingPrograms } from "@/components/TrainingPrograms";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Training = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                Training Programs
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive courses designed to enhance your skills and boost your career prospects
              </p>
            </div>
          </div>
        </section>
        <TrainingPrograms />
      </main>
      <Footer />
    </div>
  );
};

export default Training;