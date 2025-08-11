import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Target
} from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  experience: string;
  postedDate: string;
  applicants: number;
  isRemote: boolean;
}

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  job: Job | null;
}

export const JobDetailsModal = ({ isOpen, onClose, onApply, job }: JobDetailsModalProps) => {
  if (!job) return null;

  const responsibilities = [
    "Develop and maintain high-quality, responsive web applications",
    "Collaborate with cross-functional teams to define and implement features",
    "Write clean, maintainable, and well-documented code",
    "Participate in code reviews and contribute to best practices",
    "Stay up-to-date with emerging technologies and industry trends"
  ];

  const requirements = [
    "Bachelor's degree in Computer Science or related field",
    "2+ years of experience in frontend development",
    "Strong proficiency in React, TypeScript, and modern web technologies",
    "Experience with responsive design and cross-browser compatibility",
    "Excellent problem-solving and communication skills"
  ];

  const benefits = [
    "Competitive salary and performance bonuses",
    "Comprehensive health and dental coverage",
    "Flexible working hours and remote work options",
    "Professional development opportunities",
    "Modern office environment with latest technology"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center font-bold text-white text-xl">
              {job.company.charAt(0)}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl gradient-text mb-2">{job.title}</DialogTitle>
              <DialogDescription className="text-base">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  {job.isRemote && (
                    <Badge variant="secondary">Remote</Badge>
                  )}
                </div>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Job Overview */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-background/30">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Salary</p>
                  <p className="font-semibold">{job.salary}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/30">
                  <Briefcase className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-semibold">{job.experience}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/30">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Job Type</p>
                  <p className="font-semibold">{job.type}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/30">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Applicants</p>
                  <p className="font-semibold">{job.applicants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Job Description</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We are looking for a talented Frontend Developer to join our dynamic team. 
                You will be responsible for building the 'client-side' of our web applications. 
                You should be able to translate our company and customer needs into functional 
                and appealing interactive applications.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-white/10" />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-white/10" />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    What We Offer
                  </h4>
                  <ul className="space-y-2">
                    {benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building className="w-5 h-5" />
                About {job.company}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {job.company} is a leading technology company focused on delivering innovative 
                solutions that transform how businesses operate. We pride ourselves on our 
                collaborative culture, cutting-edge technology stack, and commitment to 
                professional growth.
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Posted {job.postedDate}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {job.applicants} applications received
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button variant="glass" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button variant="hero" onClick={onApply} className="flex-1 glow-effect">
              Apply Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};