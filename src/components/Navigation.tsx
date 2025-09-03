import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { 
  GraduationCap, 
  Briefcase, 
  MessageSquare, 
  User, 
  Menu, 
  X,
  Sparkles,
  FileText,
  Video,
  LogOut,
  LogIn,
  Scan,
  Edit3
} from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  const navItems = [
    { name: "Training", icon: GraduationCap, href: "/training" },
    { name: "Jobs", icon: Briefcase, href: "https://synapse-recruitment.lovable.app/student-dashboard", external: true },
    { name: "Resume Generator", icon: Edit3, href: "/resume-generator" },
    { name: "Resume Scanner", icon: Scan, href: "/resume-scanner" },
    { name: "AI Tools", icon: Sparkles, href: "/ai-tools" },
    { name: "About", icon: FileText, href: "/about" },
    { name: "Contact", icon: Video, href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/training" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PlacementPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
                asChild
              >
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link to={item.href}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </Button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && (
              <Button variant="glass" size="icon" className="glass-button" asChild>
                <a href="https://quickchat.greatstack.in/" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-4 h-4" />
                </a>
              </Button>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary transition-smooth">
                    <AvatarFallback className="bg-gradient-primary text-white text-sm">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Button variant="outline" size="icon" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button variant="hero" className="bg-gradient-primary hover:opacity-90 transition-smooth" asChild>
                <Link to="/auth">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
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
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                ) : (
                  <Link to={item.href}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )}
              </Button>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
              {isAuthenticated && (
                <Button variant="glass" className="glass-button justify-start" asChild>
                  <a href="https://quickchat.greatstack.in/" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </a>
                </Button>
              )}
              
              {isAuthenticated ? (
                <Button variant="outline" className="justify-start" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button variant="hero" className="bg-gradient-primary justify-start" asChild>
                  <Link to="/auth">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};