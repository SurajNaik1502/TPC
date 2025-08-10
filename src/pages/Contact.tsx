import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@placementpro.com",
      description: "Send us an email anytime!"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: MapPin,
      title: "Office",
      content: "123 Innovation Street, Tech City, TC 12345",
      description: "Come say hello at our office HQ"
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon-Fri: 9am-6pm",
      description: "We're here to help during business hours"
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
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions about our platform? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="glass-card text-center">
                  <CardContent className="p-6">
                    <info.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="font-medium mb-2">{info.content}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Whether you're a student looking for career guidance, a recruiter seeking talent, 
                  or a partner interested in collaboration, we're here to help.
                </p>
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help you?" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us more about your inquiry..." 
                          className="mt-1 min-h-[120px]" 
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">How do I get started with PlacementPro?</h3>
                      <p className="text-muted-foreground text-sm">
                        Simply sign up for a free account and explore our training programs. You can start with our AI resume scanner or browse available job opportunities.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Is there a fee for using the platform?</h3>
                      <p className="text-muted-foreground text-sm">
                        We offer both free and premium features. Basic access to job boards and some AI tools is free, while advanced training programs require a subscription.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">How do companies post job openings?</h3>
                      <p className="text-muted-foreground text-sm">
                        Companies can create employer accounts to post job openings, search candidate profiles, and participate in virtual job fairs.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">What makes your AI tools different?</h3>
                      <p className="text-muted-foreground text-sm">
                        Our AI tools are specifically trained for career development, offering personalized resume feedback, interview practice, and skill gap analysis.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;