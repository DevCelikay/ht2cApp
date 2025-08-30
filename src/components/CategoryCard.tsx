import React from 'react';
import { Users, Database, MessageSquare, ChevronRight } from 'lucide-react';
import { WorkflowCategory } from '../types/workflow';

interface CategoryCardProps {
  category: WorkflowCategory;
  onClick: () => void;
}

const iconMap = {
  Users,
  Database,
  MessageSquare,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap];
  const workflowCount = category.workflows.length;

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl hover:border-teal-300 hover:-translate-y-2 transition-all duration-400 cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center group-hover:from-teal-200 group-hover:to-teal-300 group-hover:scale-110 transition-all duration-400 shadow-lg relative z-10">
            {IconComponent && (
              <IconComponent className="w-8 h-8 text-teal-700 group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
          
          <div className="flex-1 relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {category.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="font-medium">{workflowCount} workflow{workflowCount !== 1 ? 's' : ''}</span>
              {workflowCount > 0 && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium shadow-sm">
                  Available
                </span>
              )}
            </div>
          </div>
        </div>
        
        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10" />
      </div>
    </div>
  );
};