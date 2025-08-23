import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2 
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Chatbot = ({ isOpen, onToggle }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you with your placement and career questions today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: {
          message: inputMessage,
          conversationHistory: messages.slice(-5) // Send last 5 messages for context
        }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      toast.error('Failed to get response from AI assistant');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-glow z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] glass-card shadow-glow z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-primary text-white">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm">AI Assistant</CardTitle>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onToggle}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <>
          <CardContent className="flex-1 p-3">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <Avatar className="w-6 h-6 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-primary text-white text-xs">
                          <Bot className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[80%] ${message.isBot ? 'order-1' : 'order-0'}`}>
                      <div
                        className={`inline-block p-2 rounded-lg text-sm ${
                          message.isBot
                            ? 'bg-muted text-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 px-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    
                    {!message.isBot && (
                      <Avatar className="w-6 h-6 flex-shrink-0">
                        <AvatarFallback className="bg-secondary text-white text-xs">
                          <User className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-2 justify-start">
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-primary text-white text-xs">
                        <Bot className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted text-foreground inline-block p-2 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          
          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
                className="bg-gradient-primary"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};