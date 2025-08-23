import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Download, 
  FileText, 
  Plus, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  GraduationCap,
  Briefcase,
  Award
} from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  linkedin: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

const ResumeGenerator = () => {
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    linkedin: ""
  });
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean, contemporary design with emphasis on typography",
      preview: "bg-gradient-to-br from-primary/20 to-secondary/20"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional layout perfect for corporate environments",
      preview: "bg-gradient-to-br from-muted to-muted/50"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold design with colors and visual elements",
      preview: "bg-gradient-to-br from-accent/30 to-primary/30"
    }
  ];

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      gpa: ""
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false
    };
    setExperience([...experience, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      link: ""
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      link: ""
    };
    setCertifications([...certifications, newCert]);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleGenerateResume = () => {
    // In a real implementation, this would generate a PDF
    toast.success("Resume generated successfully!");
  };

  const handleDownloadResume = () => {
    // In a real implementation, this would trigger PDF download
    toast.success("Resume downloaded!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Resume Generator</h1>
            <p className="text-muted-foreground">Create a professional resume with our easy-to-use templates</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resume Builder Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Template Selection */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Choose Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          activeTemplate === template.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setActiveTemplate(template.id)}
                      >
                        <div className={`w-full h-24 rounded mb-3 ${template.preview}`} />
                        <h4 className="font-semibold">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Form Tabs */}
              <Tabs defaultValue="personal" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                {/* Personal Information */}
                <TabsContent value="personal">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={personalInfo.fullName}
                            onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={personalInfo.address}
                            onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={personalInfo.website}
                            onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={personalInfo.linkedin}
                            onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Education */}
                <TabsContent value="education">
                  <Card className="glass-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          Education
                        </CardTitle>
                        <Button onClick={addEducation} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {education.map((edu) => (
                        <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">Education Entry</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Institution</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Field of Study</Label>
                              <Input
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>GPA (Optional)</Label>
                              <Input
                                value={edu.gpa}
                                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Start Year</Label>
                              <Input
                                value={edu.startYear}
                                onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>End Year</Label>
                              <Input
                                value={edu.endYear}
                                onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {education.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No education entries yet. Click "Add Education" to get started.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Experience */}
                <TabsContent value="experience">
                  <Card className="glass-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5" />
                          Professional Experience
                        </CardTitle>
                        <Button onClick={addExperience} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {experience.map((exp) => (
                        <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">Experience Entry</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Position</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Input
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                disabled={exp.current}
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </div>
                      ))}
                      {experience.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No experience entries yet. Click "Add Experience" to get started.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Projects */}
                <TabsContent value="projects">
                  <Card className="glass-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Projects
                        </CardTitle>
                        <Button onClick={addProject} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {projects.map((project) => (
                        <div key={project.id} className="p-4 border rounded-lg space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">Project Entry</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(project.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label>Project Title</Label>
                              <Input
                                value={project.title}
                                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={project.description}
                                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                placeholder="Describe the project..."
                              />
                            </div>
                            <div>
                              <Label>Technologies Used</Label>
                              <Input
                                value={project.technologies}
                                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                                placeholder="e.g. React, Node.js, MongoDB"
                              />
                            </div>
                            <div>
                              <Label>Project Link (Optional)</Label>
                              <Input
                                value={project.link}
                                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {projects.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No projects yet. Click "Add Project" to get started.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Skills */}
                <TabsContent value="skills">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Skills & Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Skills Section */}
                      <div>
                        <Label className="text-base font-semibold">Skills</Label>
                        <div className="flex gap-2 mt-2 mb-4">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill..."
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          />
                          <Button onClick={addSkill}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <button
                                onClick={() => removeSkill(skill)}
                                className="ml-1 hover:text-destructive"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Certifications Section */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Label className="text-base font-semibold">Certifications</Label>
                          <Button onClick={addCertification} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Certification
                          </Button>
                        </div>
                        {certifications.map((cert) => (
                          <div key={cert.id} className="p-4 border rounded-lg space-y-4 mb-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold">Certification</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCertification(cert.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Certification Name</Label>
                                <Input
                                  value={cert.name}
                                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Issuer</Label>
                                <Input
                                  value={cert.issuer}
                                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Date</Label>
                                <Input
                                  value={cert.date}
                                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>Link (Optional)</Label>
                                <Input
                                  value={cert.link}
                                  onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview & Actions */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Resume Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[8.5/11] bg-white border rounded-lg p-4 text-black text-xs overflow-hidden">
                    {/* Resume Preview Content */}
                    <div className="text-center mb-4">
                      <h1 className="text-lg font-bold">{personalInfo.fullName || 'Your Name'}</h1>
                      <div className="text-xs space-y-1">
                        {personalInfo.email && <div>{personalInfo.email}</div>}
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.address && <div>{personalInfo.address}</div>}
                      </div>
                    </div>
                    
                    {education.length > 0 && (
                      <div className="mb-3">
                        <h2 className="font-bold border-b mb-2">Education</h2>
                        {education.slice(0, 2).map((edu) => (
                          <div key={edu.id} className="mb-2">
                            <div className="font-semibold">{edu.degree} - {edu.field}</div>
                            <div>{edu.institution}</div>
                            <div>{edu.startYear} - {edu.endYear}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {experience.length > 0 && (
                      <div className="mb-3">
                        <h2 className="font-bold border-b mb-2">Experience</h2>
                        {experience.slice(0, 2).map((exp) => (
                          <div key={exp.id} className="mb-2">
                            <div className="font-semibold">{exp.position}</div>
                            <div>{exp.company}</div>
                            <div className="text-xs">{exp.startDate} - {exp.endDate}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {skills.length > 0 && (
                      <div>
                        <h2 className="font-bold border-b mb-2">Skills</h2>
                        <div className="flex flex-wrap gap-1">
                          {skills.slice(0, 10).map((skill) => (
                            <span key={skill} className="bg-gray-200 px-1 py-0.5 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button 
                      onClick={handleGenerateResume}
                      className="w-full bg-gradient-primary"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Resume
                    </Button>
                    <Button 
                      onClick={handleDownloadResume}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeGenerator;