import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, ArrowLeft, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const BanglaChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'নমস্কার! আমি আপনার বাংলা AI সহায়ক। আমি আপনাকে যে কোনো প্রশ্নে সাহায্য করতে পারি। আপনার প্রশ্ন লিখুন।',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversation = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('bangla-chat', {
        body: {
          message: userMessage.content,
          conversation
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "ত্রুটি",
        description: "বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              হোম
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">বাংলা ChatGPT</h1>
                <p className="text-sm text-gray-600">আপনার বাংলা AI সহায়ক</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          {/* Messages */}
          <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className={`text-xs mt-1 block ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('bn-BD')}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="এখানে আপনার প্রশ্ন লিখুন..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BanglaChat;