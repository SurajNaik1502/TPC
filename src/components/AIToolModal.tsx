import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Video,
  Sparkles,
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

interface AITool {
  id: number;
  title: string;
  description: string;
  icon: any;
  features: string[];
  usage: string;
  rating: string;
  color: string;
}

interface AIToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: AITool | null;
}

export const AIToolModal = ({ isOpen, onClose, tool }: AIToolModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleStartTool = () => {
    if (!tool) return;

    setIsLoading(true);
    setProgress(0);

    // Simulate AI processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          
          toast({
            title: "Analysis Complete!",
            description: `${tool.title} has finished processing. Check your results below.`,
          });

          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getToolIcon = (toolId: number) => {
    switch (toolId) {
      case 1: return FileText;
      case 2: return MessageSquare;
      case 3: return BarChart3;
      case 4: return Video;
      default: return Sparkles;
    }
  };

  const getToolDemo = (toolId: number) => {
    switch (toolId) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-primary/30 transition-colors">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  {file ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-success" />
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-muted-foreground" />
                      <p className="font-medium">Upload your resume</p>
                      <p className="text-sm text-muted-foreground">PDF, DOC, DOCX (Max 10MB)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
            {file && (
              <Button onClick={handleStartTool} disabled={isLoading} className="w-full" variant="hero">
                {isLoading ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start AI Analysis
                  </>
                )}
              </Button>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="glass-card p-6 border-white/10">
              <h4 className="font-semibold mb-3">Practice Interview Simulation</h4>
              <p className="text-muted-foreground mb-4">
                Our AI interviewer will conduct a realistic interview session tailored to your experience level and target role.
              </p>
              <Button onClick={handleStartTool} disabled={isLoading} className="w-full" variant="hero">
                {isLoading ? (
                  <>
                    <Video className="w-4 h-4 mr-2 animate-pulse" />
                    Starting Interview...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Mock Interview
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="glass-card p-6 border-white/10">
              <h4 className="font-semibold mb-3">Comprehensive Skill Assessment</h4>
              <p className="text-muted-foreground mb-4">
                Take our AI-powered assessment to evaluate your technical and soft skills across multiple domains.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Badge variant="outline" className="justify-center py-2">Technical Skills</Badge>
                <Badge variant="outline" className="justify-center py-2">Soft Skills</Badge>
                <Badge variant="outline" className="justify-center py-2">Industry Knowledge</Badge>
                <Badge variant="outline" className="justify-center py-2">Problem Solving</Badge>
              </div>
              <Button onClick={handleStartTool} disabled={isLoading} className="w-full" variant="hero">
                {isLoading ? (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2 animate-bounce" />
                    Processing Assessment...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Begin Assessment
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="glass-card p-6 border-white/10">
              <h4 className="font-semibold mb-3">Video Interview Simulator</h4>
              <p className="text-muted-foreground mb-4">
                Practice video interviews with real-time feedback on your facial expressions, speech clarity, and body language.
              </p>
              <div className="bg-background/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center h-32 border border-white/10 rounded">
                  <Video className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <Button onClick={handleStartTool} disabled={isLoading} className="w-full" variant="hero">
                {isLoading ? (
                  <>
                    <Video className="w-4 h-4 mr-2 animate-pulse" />
                    Initializing Camera...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Interview
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!tool) return null;

  const IconComponent = getToolIcon(tool.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl gradient-text mb-2">{tool.title}</DialogTitle>
              <DialogDescription className="text-base">
                {tool.description}
              </DialogDescription>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {tool.usage}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  {tool.rating}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Features */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tool.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tool Demo/Interface */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Try it Now</h3>
              {getToolDemo(tool.id)}
              
              {isLoading && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {progress === 100 && (
                <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 text-success mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Analysis Complete!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your results are ready. You can now view detailed insights and recommendations.
                  </p>
                  <Button variant="outline" className="mt-3" onClick={() => setProgress(0)}>
                    View Results
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Close Button */}
          <div className="flex justify-end gap-3">
            <Button variant="glass" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};