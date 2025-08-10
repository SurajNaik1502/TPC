import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Students Placed", value: "10,000+" },
    { icon: Target, label: "Success Rate", value: "94%" },
    { icon: Award, label: "Partner Companies", value: "500+" },
    { icon: TrendingUp, label: "Average Salary Increase", value: "67%" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former tech recruiter with 15 years of experience at Google and Microsoft.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "AI researcher and former lead engineer at OpenAI, passionate about education technology.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Training",
      bio: "Career coach and training specialist with expertise in skill development.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                About PlacementPro
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're revolutionizing career development by connecting talented individuals with 
                opportunities through AI-powered training and placement solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  At PlacementPro, we believe everyone deserves access to meaningful career opportunities. 
                  Our platform bridges the gap between talent and opportunity, providing comprehensive 
                  training programs and AI-powered tools to accelerate career growth.
                </p>
                <p className="text-muted-foreground mb-8">
                  We're committed to democratizing access to high-quality career development resources, 
                  making it easier for students and professionals to achieve their goals while helping 
                  companies find the right talent.
                </p>
                <Button className="bg-gradient-primary hover:opacity-90">
                  Join Our Mission
                </Button>
              </div>
              <div className="glass-card p-8">
                <h3 className="text-2xl font-semibold mb-6">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 gradient-text">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our diverse team of experts is passionate about transforming careers through technology and innovation.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 gradient-text">Our Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                  <p className="text-muted-foreground">
                    We leverage cutting-edge AI technology to create solutions that transform how people approach career development.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We believe quality career resources should be available to everyone, regardless of background or location.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                  <p className="text-muted-foreground">
                    We're committed to delivering the highest quality training and placement services to our community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;