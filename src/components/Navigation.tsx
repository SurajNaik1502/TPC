import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Briefcase, 
  MessageSquare, 
  User, 
  Menu, 
  X,
  Sparkles,
  FileText,
  Video
} from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Training", icon: GraduationCap, href: "#training" },
    { name: "Jobs", icon: Briefcase, href: "#jobs" },
    { name: "AI Tools", icon: Sparkles, href: "#ai-tools" },
    { name: "Resources", icon: FileText, href: "#resources" },
    { name: "Live Sessions", icon: Video, href: "#sessions" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PlacementPro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="glass" className="glass-button">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button variant="hero" className="bg-gradient-primary hover:opacity-90 transition-smooth">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="glass"
            size="icon"
            className="md:hidden glass-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Button>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
              <Button variant="glass" className="glass-button justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button variant="hero" className="bg-gradient-primary justify-start">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};