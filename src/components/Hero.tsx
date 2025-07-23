
import React from 'react';
import { MessageCircle, Volume2, FileText, Image, Globe, Sparkles } from 'lucide-react';
import ToolCard from './ToolCard';
import FloatingIcon from './FloatingIcon';

const Hero = () => {
  const tools = [
    {
      title: "Bangla ChatGPT",
      description: "বাংলায় AI চ্যাটবট",
      icon: MessageCircle,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Bangla Text-to-Voice",
      description: "বাংলা টেক্সট থেকে ভয়েস",
      icon: Volume2,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "AI Resume Maker",
      description: "AI দিয়ে জীবনবৃত্তান্ত তৈরি",
      icon: FileText,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "AI Image Generator",
      description: "AI দিয়ে ছবি তৈরি",
      icon: Image,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Bangla Translator",
      description: "বাংলা অনুবাদক",
      icon: Globe,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 overflow-hidden">
      {/* Background Bangladesh Map */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <path
                d="M100 150 Q120 120 150 130 Q180 140 200 120 Q220 100 250 110 Q280 120 300 140 Q320 160 310 180 Q300 200 280 220 Q260 240 240 250 Q220 260 200 250 Q180 240 160 230 Q140 220 120 200 Q100 180 100 150 Z"
                fill="url(#bangladeshGradient)"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="bangladeshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Floating AI Icons */}
      <FloatingIcon icon={Sparkles} className="top-20 left-20" delay={0} />
      <FloatingIcon icon={MessageCircle} className="top-32 right-32" delay={1} />
      <FloatingIcon icon={Volume2} className="bottom-40 left-16" delay={2} />
      <FloatingIcon icon={Image} className="bottom-20 right-20" delay={0.5} />
      <FloatingIcon icon={Globe} className="top-1/2 left-8" delay={1.5} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-6">
            BanglaAITools.com
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            বাংলায় AI টুলের সহজ ভান্ডার
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the power of AI in Bengali language. From chatbots to voice synthesis, 
            explore cutting-edge tools designed for Bengali speakers.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10">Get Started Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default Hero;
