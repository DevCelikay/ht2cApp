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
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-teal-200 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-100 transition-colors duration-200">
            {IconComponent && (
              <IconComponent className="w-6 h-6 text-teal-600" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-200">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {category.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>{workflowCount} workflow{workflowCount !== 1 ? 's' : ''}</span>
              {workflowCount > 0 && (
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full">
                  Available
                </span>
              )}
            </div>
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all duration-200" />
      </div>
    </div>
  );
};