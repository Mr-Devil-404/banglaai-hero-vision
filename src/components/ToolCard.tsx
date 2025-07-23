
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon: Icon, color, href }) => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    if (href) {
      navigate(href);
    }
  };
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
        <div className="flex items-center justify-center mb-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
          {title}
        </h3>
        
        <p className="text-gray-600 text-center text-sm mb-4">
          {description}
        </p>
        
        <div className="flex justify-center">
          <button 
            onClick={handleTryNow}
            disabled={!href}
            className={`px-6 py-2 bg-gradient-to-r font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md ${
              href 
                ? 'from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-purple-800 cursor-pointer' 
                : 'from-gray-100 to-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {href ? 'Try Now' : 'Coming Soon'}
          </button>
        </div>
        
        {/* Glassmorphic shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ToolCard;
