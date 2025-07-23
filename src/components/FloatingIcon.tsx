
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingIconProps {
  icon: LucideIcon;
  className: string;
  delay: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, className, delay }) => {
  return (
    <div 
      className={`absolute ${className} animate-float opacity-20 hover:opacity-40 transition-opacity duration-300`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default FloatingIcon;
