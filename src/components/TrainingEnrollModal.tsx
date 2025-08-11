import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Star, 
  CreditCard, 
  CheckCircle,
  Calendar,
  BookOpen
} from "lucide-react";

interface TrainingProgram {
  id: number;
  title: string;
  duration: string;
  students: string;
  rating: number;
  price: string;
  skills: string[];
  level: string;
  nextBatch: string;
}

interface TrainingEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: TrainingProgram | null;
}

export const TrainingEnrollModal = ({ isOpen, onClose, program }: TrainingEnrollModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
    paymentMethod: "",
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    // Simulate enrollment
    toast({
      title: "Enrollment Successful!",
      description: `Welcome to ${program?.title}! Check your email for next steps.`,
    });
    
    // Reset form and close modal
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      motivation: "",
      paymentMethod: "",
      agreeToTerms: false
    });
    onClose();
  };

  if (!program) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Enroll in Program</DialogTitle>
          <DialogDescription>
            Complete your enrollment for this training program
          </DialogDescription>
        </DialogHeader>

        {/* Program Summary */}
        <Card className="glass-card border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-xl">{program.title}</h3>
                  <Badge variant="secondary">{program.level}</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 rounded-lg bg-background/30">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-semibold text-sm">{program.duration}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/30">
                    <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">Students</p>
                    <p className="font-semibold text-sm">{program.students}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/30">
                    <Star className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="font-semibold text-sm">{program.rating}/5</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/30">
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">Next Batch</p>
                    <p className="font-semibold text-sm">{program.nextBatch}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold gradient-text">{program.price}</div>
                <p className="text-sm text-muted-foreground">Total Program Fee</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select onValueChange={(value) => handleSelectChange('experience', value)}>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </h3>
              
              <div className="space-y-4">
                <Select onValueChange={(value) => handleSelectChange('paymentMethod', value)}>
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI Payment</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                    <SelectItem value="emi">EMI (3-12 months)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Secure Payment</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. We support all major payment methods.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program Benefits */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                What's Included
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Live interactive sessions with experts",
                  "Hands-on projects and assignments", 
                  "1-on-1 mentorship sessions",
                  "Industry-recognized certificate",
                  "Lifetime access to course materials",
                  "Job placement assistance",
                  "24/7 community support",
                  "Resume and interview preparation"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                  className="mt-1"
                />
                <div className="space-y-2">
                  <Label htmlFor="agreeToTerms" className="text-sm font-medium">
                    I agree to the Terms and Conditions *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By enrolling, you agree to our refund policy, course guidelines, and 
                    commitment to complete the program. You can review our full terms 
                    and conditions on our website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-3 pt-6">
            <Button variant="glass" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button 
              variant="hero" 
              type="submit" 
              className="glow-effect"
              disabled={!formData.agreeToTerms}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Enroll Now - {program.price}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};