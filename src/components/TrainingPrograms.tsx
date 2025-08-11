import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrainingEnrollModal } from "./TrainingEnrollModal";
import { 
  Code, 
  Database, 
  Smartphone, 
  Cloud, 
  Clock, 
  Users, 
  Star,
  Play,
  ArrowRight
} from "lucide-react";

export const TrainingPrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const programs = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Master modern web development with React, Node.js, and cloud deployment.",
      duration: "12 weeks",
      students: "2,347",
      rating: 4.9,
      price: "₹15,999",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      icon: Code,
      level: "Intermediate",
      nextBatch: "Jan 15, 2025"
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      description: "Learn Python, machine learning, and data visualization techniques.",
      duration: "16 weeks",
      students: "1,892",
      rating: 4.8,
      price: "₹18,999",
      skills: ["Python", "Pandas", "TensorFlow", "Tableau"],
      icon: Database,
      level: "Beginner",
      nextBatch: "Jan 22, 2025"
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Build cross-platform mobile apps with React Native and Flutter.",
      duration: "10 weeks",
      students: "1,156",
      rating: 4.7,
      price: "₹12,999",
      skills: ["React Native", "Flutter", "Firebase", "API"],
      icon: Smartphone,
      level: "Intermediate",
      nextBatch: "Feb 1, 2025"
    },
    {
      id: 4,
      title: "Cloud & DevOps",
      description: "Master cloud infrastructure, containerization, and CI/CD pipelines.",
      duration: "14 weeks",
      students: "987",
      rating: 4.9,
      price: "₹21,999",
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
      icon: Cloud,
      level: "Advanced",
      nextBatch: "Jan 29, 2025"
    }
  ];

  return (
    <section id="training" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 glass-card border-primary/20">
            Training Programs
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Level Up Your
            <span className="block gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our industry-expert led training programs designed to make you job-ready 
            with hands-on projects and real-world experience.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {programs.map((program) => (
            <Card key={program.id} className="glass-card border-white/10 hover:border-primary/30 transition-smooth group hover:scale-[1.02]">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <program.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {program.level}
                      </Badge>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {program.title}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">{program.price}</div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{program.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardDescription className="text-base leading-relaxed">
                  {program.description}
                </CardDescription>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{program.students} students</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Next batch starts: <span className="text-foreground font-medium">{program.nextBatch}</span>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3 pt-2">
                  <Button 
                    variant="hero" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedProgram(program);
                      setIsEnrollModalOpen(true);
                    }}
                  >
                    Enroll Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="glass" size="icon" className="glass-button">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="glass-button">
            View All Programs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Enrollment Modal */}
        <TrainingEnrollModal
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          program={selectedProgram}
        />
      </div>
    </section>
  );
};