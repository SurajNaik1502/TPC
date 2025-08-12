import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
  Video,
  Users
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  room_id: string;
  created_at: string;
  message_type: string;
  profiles?: {
    user_id: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string | null;
  is_private: boolean;
  created_at: string;
}

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
}

const Chat = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load chat rooms
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadChatRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_rooms')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setChatRooms(data || []);
        
        // Set the first room as current
        if (data && data.length > 0) {
          setCurrentRoom(data[0]);
        }
      } catch (error) {
        console.error('Error loading chat rooms:', error);
        toast.error('Failed to load chat rooms');
      } finally {
        setLoading(false);
      }
    };

    loadChatRooms();
  }, [isAuthenticated]);

  // Load messages for current room
  useEffect(() => {
    if (!currentRoom || !isAuthenticated) return;

    const loadMessages = async () => {
      try {
        // Get messages first
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('room_id', currentRoom.id)
          .order('created_at', { ascending: true });

        if (messagesError) throw messagesError;

        // Get profiles for all unique sender IDs
        const senderIds = [...new Set(messagesData?.map(m => m.sender_id) || [])];
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('user_id, display_name, avatar_url')
          .in('user_id', senderIds);

        if (profilesError) throw profilesError;

        // Combine messages with profiles
        const messagesWithProfiles = messagesData?.map(message => ({
          ...message,
          profiles: profilesData?.find(p => p.user_id === message.sender_id) || null
        })) || [];

        setMessages(messagesWithProfiles);
      } catch (error) {
        console.error('Error loading messages:', error);
        toast.error('Failed to load messages');
      }
    };

    loadMessages();
  }, [currentRoom, isAuthenticated]);

  // Subscribe to new messages
  useEffect(() => {
    if (!currentRoom || !isAuthenticated) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${currentRoom.id}`
        },
        async (payload) => {
          // Get profile data for the new message
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('user_id, display_name, avatar_url')
            .eq('user_id', payload.new.sender_id)
            .single();

          const newMessageWithProfile = {
            ...payload.new,
            profiles: profileError ? null : profileData
          };

          setMessages(prev => [...prev, newMessageWithProfile as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentRoom, isAuthenticated]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentRoom || !user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          content: newMessage,
          sender_id: user.id,
          room_id: currentRoom.id,
          message_type: 'text'
        });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getSenderDisplayName = (message: Message) => {
    return message.profiles?.display_name || 'Unknown User';
  };

  const isOwnMessage = (message: Message) => {
    return user && message.sender_id === user.id;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading chat...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to auth
  }

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
                Chat Rooms
              </CardTitle>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="p-4 space-y-3">
                {chatRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setCurrentRoom(room)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentRoom?.id === room.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-accent/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {room.is_private ? <User className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{room.name}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(room.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {room.description || 'No description'}
                        </p>
                      </div>
                      {currentRoom?.id === room.id && (
                        <Badge variant="secondary" className="text-xs">Active</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentRoom ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 glass-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {currentRoom.is_private ? <User className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{currentRoom.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {currentRoom.description || 'Chat room'}
                        </p>
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
                          isOwnMessage(message) ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className={
                            isOwnMessage(message)
                              ? "bg-secondary"
                              : "bg-gradient-primary text-white"
                          }>
                            {getSenderDisplayName(message).charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className={`max-w-[70%] ${
                          isOwnMessage(message) ? 'text-right' : 'text-left'
                        }`}>
                          <div className={`inline-block p-3 rounded-2xl ${
                            isOwnMessage(message)
                              ? 'bg-primary text-primary-foreground'
                              : 'glass-card border border-white/10'
                          }`}>
                            <p className="text-sm font-medium mb-1">
                              {getSenderDisplayName(message)}
                            </p>
                            <p className="text-sm">{message.content}</p>
                          </div>
                          
                          <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                            isOwnMessage(message) ? 'justify-end' : 'justify-start'
                          }`}>
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(message.created_at)}</span>
                            {isOwnMessage(message) && (
                              <CheckCheck className="w-3 h-3 text-primary" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
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
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Chat Room Selected</h3>
                  <p className="text-muted-foreground">
                    Select a chat room from the sidebar to start messaging.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;