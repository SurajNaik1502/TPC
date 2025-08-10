import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Video, 
  Upload,
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users
} from "lucide-react";

export const AITools = () => {
  const tools = [
    {
      id: 1,
      title: "AI Resume Analyzer",
      description: "Get instant feedback on your resume with AI-powered analysis and improvement suggestions.",
      icon: FileText,
      features: ["Skills Gap Analysis", "ATS Optimization", "Format Suggestions", "Industry Benchmarking"],
      usage: "12,500+ resumes analyzed",
      rating: "4.9/5",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Mock Interview Bot",
      description: "Practice interviews with our AI interviewer that adapts questions based on your performance.",
      icon: MessageSquare,
      features: ["Adaptive Questions", "Real-time Feedback", "Performance Analytics", "Industry-specific Prep"],
      usage: "8,300+ interviews conducted",
      rating: "4.8/5",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Skill Assessment",
      description: "Evaluate your technical and soft skills with comprehensive AI-driven assessments.",
      icon: BarChart3,
      features: ["Multi-domain Testing", "Skill Scoring", "Learning Recommendations", "Progress Tracking"],
      usage: "15,200+ assessments taken",
      rating: "4.7/5",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      title: "Interview Simulator",
      description: "Experience realistic video interviews with AI-powered facial expression and speech analysis.",
      icon: Video,
      features: ["Video Analysis", "Speech Evaluation", "Body Language Tips", "Confidence Building"],
      usage: "6,800+ simulations completed",
      rating: "4.9/5",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section id="ai-tools" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 glass-card border-accent/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Tools
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Supercharge Your
            <span className="block gradient-text">Job Preparation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leverage cutting-edge AI technology to analyze your skills, practice interviews, 
            and get personalized feedback to land your dream job.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool) => (
            <Card key={tool.id} className="glass-card border-white/10 hover:border-primary/30 transition-smooth group hover:scale-[1.02] overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
              
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{tool.usage}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{tool.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardDescription className="text-base leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button variant="hero" className="flex-1">
                    Try Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="glass" className="glass-button">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Tool CTA */}
        <div className="glass-card p-8 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Upload your resume now and get instant AI-powered analysis with personalized 
              recommendations to improve your job prospects.
            </p>
            <Button variant="hero" size="lg" className="glow-effect">
              <Upload className="w-5 h-5 mr-2" />
              Upload Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};