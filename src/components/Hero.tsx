import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl float-animation" />
        <div className="absolute top-1/3 -right-4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-accent/15 rounded-full blur-3xl float-animation" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">AI-Powered Career Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            Transform Your
            <span className="block gradient-text">Career Journey</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Connect with top recruiters, enhance your skills with AI-powered training, 
            and land your dream job through our comprehensive placement platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-fade-in">
            <Button variant="hero" size="lg" className="bg-gradient-primary hover:scale-105 transition-bounce glow-effect">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="glass" size="lg" className="glass-button">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-smooth">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">10,000+</div>
              <div className="text-muted-foreground">Students Placed</div>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-smooth">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-smooth">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">500+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};