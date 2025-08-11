import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot, 
  User, 
  MessageSquare, 
  Clock,
  CheckCheck,
  Paperclip,
  Smile,
  Phone,
  Video
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot' | 'recruiter';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI placement assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 60000),
      status: 'read'
    },
    {
      id: 2,
      content: "Hi there! I'm looking for frontend developer positions. Can you help me find suitable opportunities?",
      sender: 'user',
      timestamp: new Date(Date.now() - 45000),
      status: 'read'
    },
    {
      id: 3,
      content: "Absolutely! I'd be happy to help you find frontend developer positions. Based on your profile, I've found several opportunities that match your skills. Would you like me to show you the top matches?",
      sender: 'bot',
      timestamp: new Date(Date.now() - 30000),
      status: 'read'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: "Thank you for your message! I'm processing your request and will get back to you shortly with relevant opportunities and recommendations.",
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-0">
        <div className="h-[calc(100vh-5rem)] flex">
          {/* Chat Sidebar */}
          <div className="w-80 border-r border-white/10 glass-card">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Messages
              </CardTitle>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="p-4 space-y-3">
                {/* Active Conversations */}
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-primary text-white">
                          <Bot className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">AI Assistant</p>
                          <span className="text-xs text-muted-foreground">2m</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          I'd be happy to help you find frontend...
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg hover:bg-accent/10 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>TC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">TechCorp Recruiter</p>
                          <span className="text-xs text-muted-foreground">1h</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          We'd like to schedule an interview...
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg hover:bg-accent/10 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">DataMinds HR</p>
                          <span className="text-xs text-muted-foreground">3h</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          Thank you for your application...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 glass-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-sm text-muted-foreground">Always available to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className={
                        message.sender === 'bot' 
                          ? "bg-gradient-primary text-white" 
                          : message.sender === 'user'
                          ? "bg-secondary"
                          : "bg-accent"
                      }>
                        {message.sender === 'bot' ? (
                          <Bot className="w-4 h-4" />
                        ) : message.sender === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          message.sender.charAt(0).toUpperCase()
                        )}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`max-w-[70%] ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`inline-block p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'glass-card border border-white/10'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(message.timestamp)}</span>
                        {message.sender === 'user' && (
                          <CheckCheck className={`w-3 h-3 ${
                            message.status === 'read' ? 'text-primary' : ''
                          }`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="glass-card border border-white/10 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10 glass-card">
              <div className="flex items-end gap-3">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-12 bg-background/50 border-white/10"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button 
                  variant="hero" 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;