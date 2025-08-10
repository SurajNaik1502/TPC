import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Search, 
  MoreVertical, 
  Users, 
  Phone, 
  Video,
  Paperclip,
  Smile
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'student' | 'recruiter';
  };
  timestamp: Date;
  isOwn: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  role: 'student' | 'recruiter';
  company?: string;
  lastMessage: string;
  timestamp: Date;
  isOnline: boolean;
  unreadCount: number;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "recruiter",
    company: "Google",
    lastMessage: "Looking forward to our interview discussion",
    timestamp: new Date(Date.now() - 300000),
    isOnline: true,
    unreadCount: 2
  },
  {
    id: "2", 
    name: "Alex Chen",
    role: "student",
    lastMessage: "Thanks for the coding resources!",
    timestamp: new Date(Date.now() - 3600000),
    isOnline: false,
    unreadCount: 0
  },
  {
    id: "3",
    name: "Maria Garcia",
    role: "recruiter", 
    company: "Microsoft",
    lastMessage: "Can we schedule a call tomorrow?",
    timestamp: new Date(Date.now() - 7200000),
    isOnline: true,
    unreadCount: 1
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hi! I saw your profile and I'm interested in discussing a Frontend Developer position at Google.",
    sender: {
      id: "recruiter1",
      name: "Sarah Johnson", 
      role: "recruiter"
    },
    timestamp: new Date(Date.now() - 3600000),
    isOwn: false
  },
  {
    id: "2", 
    text: "Hello Sarah! Thank you for reaching out. I'm very interested in learning more about the opportunity.",
    sender: {
      id: "student1",
      name: "John Doe",
      role: "student"
    },
    timestamp: new Date(Date.now() - 3000000),
    isOwn: true
  },
  {
    id: "3",
    text: "Great! Could you tell me about your experience with React and TypeScript?",
    sender: {
      id: "recruiter1", 
      name: "Sarah Johnson",
      role: "recruiter"
    },
    timestamp: new Date(Date.now() - 1800000),
    isOwn: false
  },
  {
    id: "4",
    text: "I have 2+ years of experience with React and have been working with TypeScript for the past year. I've built several full-stack applications using these technologies.",
    sender: {
      id: "student1",
      name: "John Doe", 
      role: "student"
    },
    timestamp: new Date(Date.now() - 600000),
    isOwn: true
  }
];

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState<Contact>(mockContacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: {
        id: "student1",
        name: "John Doe",
        role: "student"
      },
      timestamp: new Date(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      
      <div className="pt-20 h-screen flex">
        {/* Contacts Sidebar */}
        <div className="w-80 glass-card border-r border-white/10 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold gradient-text">Messages</h1>
              <Button variant="glass" size="icon" className="glass-button">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-input"
              />
            </div>
          </div>

          {/* Contacts List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-3 rounded-lg cursor-pointer transition-smooth hover:bg-white/5 ${
                    selectedContact.id === contact.id ? 'bg-white/10' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground truncate">
                          {contact.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {formatLastMessageTime(contact.timestamp)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage}
                        </p>
                        {contact.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {contact.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {contact.role === 'recruiter' && contact.company && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {contact.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 glass-card border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {selectedContact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedContact.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedContact.isOnline ? 'Online' : 'Offline'} • {selectedContact.role}
                    {selectedContact.company && ` at ${selectedContact.company}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="glass" size="icon" className="glass-button">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="glass" size="icon" className="glass-button">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="glass" size="icon" className="glass-button">
                  <Users className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    {!message.isOwn && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback className="bg-gradient-primary text-white text-xs">
                            {message.sender.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {message.sender.name}
                        </span>
                      </div>
                    )}
                    
                    <div
                      className={`p-3 rounded-xl ${
                        message.isOwn
                          ? 'bg-gradient-primary text-white'
                          : 'glass-card'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 glass-card border-t border-white/10">
            <div className="flex items-center space-x-3">
              <Button variant="glass" size="icon" className="glass-button">
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="glass-input pr-10"
                />
                <Button
                  variant="glass"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 glass-button"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-primary hover:opacity-90 transition-smooth"
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;