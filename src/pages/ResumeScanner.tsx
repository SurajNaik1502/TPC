import { useState, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Upload, 
  FileText, 
  Scan, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  Target,
  Lightbulb
} from "lucide-react";

interface ScanResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywords: string[];
  atsSuggestions: string[];
}

const ResumeScanner = () => {
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.type.includes('document')) {
        setFile(selectedFile);
        setResult(null);
      } else {
        toast.error('Please select a PDF or document file');
      }
    }
  };

  const handleScanResume = async () => {
    if (!file) {
      toast.error('Please select a resume file first');
      return;
    }

    setScanning(true);
    try {
      // Convert file to base64 for API transmission
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]); // Remove data:application/pdf;base64, prefix
        };
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke('resume-scanner', {
        body: {
          fileContent: base64,
          fileName: file.name,
          mimeType: file.type
        }
      });

      if (error) throw error;

      setResult(data.analysis);
      toast.success('Resume scanned successfully!');
    } catch (error) {
      console.error('Error scanning resume:', error);
      toast.error('Failed to scan resume. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">AI Resume Scanner</h1>
            <p className="text-muted-foreground">
              Get instant feedback on your resume with AI-powered analysis and ATS optimization suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-1">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {file && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleScanResume}
                    disabled={!file || scanning}
                    className="w-full bg-gradient-primary"
                  >
                    {scanning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Scan className="w-4 h-4 mr-2" />
                        Scan Resume
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="glass-card mt-6">
                <CardHeader>
                  <CardTitle>What We Analyze</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-sm">ATS Compatibility</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm">Content Quality</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm">Industry Keywords</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <span className="text-sm">Improvement Tips</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              {result ? (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                            {result.score}/100
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {getScoreLabel(result.score)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="w-20 h-20 relative">
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="stroke-current text-muted opacity-20"
                                strokeDasharray="100, 100"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className={`stroke-current ${getScoreColor(result.score)}`}
                                strokeDasharray={`${result.score}, 100`}
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <Progress value={result.score} className="h-2" />
                    </CardContent>
                  </Card>

                  {/* Strengths */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-success">
                        <CheckCircle className="w-5 h-5" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Areas for Improvement */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-warning">
                        <AlertCircle className="w-5 h-5" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Suggestions */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Improvement Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {result.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Keywords & ATS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle>Keywords Found</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {result.keywords.map((keyword, index) => (
                            <Badge key={index} variant="secondary">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle>ATS Optimization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.atsSuggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card className="glass-card">
                  <CardContent className="py-16">
                    <div className="text-center">
                      <Scan className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ready to Scan</h3>
                      <p className="text-muted-foreground">
                        Upload your resume to get instant AI-powered feedback and optimization suggestions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeScanner;