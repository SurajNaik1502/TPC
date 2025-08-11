import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Building, 
  MapPin, 
  DollarSign,
  Clock
} from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
}

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export const JobApplicationModal = ({ isOpen, onClose, job }: JobApplicationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate application submission
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job?.title} at ${job?.company} has been submitted successfully.`,
    });
    
    // Reset form and close modal
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
      resume: null
    });
    onClose();
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Apply for Position</DialogTitle>
          <DialogDescription>
            Submit your application for this exciting opportunity
          </DialogDescription>
        </DialogHeader>

        {/* Job Summary Card */}
        <Card className="glass-card border-white/10 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center font-bold text-white">
                {job.company.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.type}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="bg-background/50 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                className="bg-background/50 border-white/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                required
                className="bg-background/50 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 3 years"
                className="bg-background/50 border-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume *</Label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-primary/30 transition-colors">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                required
              />
              <label htmlFor="resume" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  {formData.resume ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-success" />
                      <p className="text-sm font-medium">{formData.resume.name}</p>
                      <p className="text-xs text-muted-foreground">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload resume</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Tell us why you're the perfect fit for this role..."
              rows={4}
              className="bg-background/50 border-white/10"
            />
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button variant="glass" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="hero" type="submit" className="glow-effect">
              <FileText className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};