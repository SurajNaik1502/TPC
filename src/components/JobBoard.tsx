import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Building, 
  Calendar, 
  DollarSign,
  Bookmark,
  ArrowRight,
  Filter,
  Briefcase,
  Clock
} from "lucide-react";

export const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹8-15 LPA",
      postedDate: "2 days ago",
      skills: ["React", "TypeScript", "Node.js"],
      logo: "TC",
      isRemote: true,
      applicants: 45
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "DataMinds Inc",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹12-20 LPA",
      postedDate: "1 day ago",
      skills: ["Python", "Machine Learning", "SQL"],
      logo: "DM",
      isRemote: false,
      applicants: 32
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "CloudVision",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹6-12 LPA",
      postedDate: "3 days ago",
      skills: ["Java", "Spring Boot", "AWS"],
      logo: "CV",
      isRemote: true,
      applicants: 67
    },
    {
      id: 4,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Delhi, India",
      type: "Full-time",
      experience: "4-6 years",
      salary: "₹15-25 LPA",
      postedDate: "1 week ago",
      skills: ["Strategy", "Analytics", "Leadership"],
      logo: "IT",
      isRemote: false,
      applicants: 28
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "ScaleTech",
      location: "Pune, India",
      type: "Contract",
      experience: "2-4 years",
      salary: "₹10-18 LPA",
      postedDate: "4 days ago",
      skills: ["Docker", "Kubernetes", "CI/CD"],
      logo: "ST",
      isRemote: true,
      applicants: 23
    },
    {
      id: 6,
      title: "UX Designer",
      company: "DesignStudio",
      location: "Chennai, India",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹7-14 LPA",
      postedDate: "5 days ago",
      skills: ["Figma", "User Research", "Prototyping"],
      logo: "DS",
      isRemote: true,
      applicants: 41
    }
  ];

  return (
    <section id="jobs" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 glass-card border-secondary/20">
            Job Opportunities
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your
            <span className="block gradient-text">Dream Job</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through thousands of job opportunities from top companies. 
            Filter by skills, location, and experience level.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 rounded-2xl mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-white/10"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="glass" className="glass-button">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </Button>
              <Button variant="glass" className="glass-button">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="hero">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {jobs.map((job) => (
            <Card key={job.id} className="glass-card border-white/10 hover:border-primary/30 transition-smooth group hover:scale-[1.01]">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center font-bold text-white">
                      {job.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {job.title}
                        </CardTitle>
                        {job.isRemote && (
                          <Badge variant="secondary" className="text-xs">Remote</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Building className="w-4 h-4 mr-1" />
                        {job.company}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:text-primary">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Job Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {job.experience}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {job.postedDate}
                  </div>
                </div>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{job.applicants} applicants</span>
                  <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'} className="text-xs">
                    {job.type}
                  </Badge>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="hero" className="flex-1">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="glass" className="glass-button">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="glass-button">
            Load More Jobs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};