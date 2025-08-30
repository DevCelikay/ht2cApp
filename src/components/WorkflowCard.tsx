import React from 'react';
import { 
  Search, 
  MapPin, 
  CheckCircle, 
  Send, 
  Play, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { WorkflowCard as WorkflowCardType } from '../types/workflow';

interface WorkflowCardProps {
  workflow: WorkflowCardType;
  onClick: () => void;
}

const iconMap = {
  Search,
  MapPin,
  CheckCircle,
  Send,
};

const statusConfig = {
  ready: {
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: CheckCircle,
    text: 'Ready'
  },
  running: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: Clock,
    text: 'Running'
  },
  'needs-setup': {
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: AlertCircle,
    text: 'Needs Setup'
  },
  'coming-soon': {
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    icon: Clock,
    text: 'Coming Soon'
  }
};

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onClick }) => {
  const IconComponent = iconMap[workflow.icon as keyof typeof iconMap];
  const status = statusConfig[workflow.status];
  const StatusIcon = status.icon;

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>
      
      {/* Icon and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center group-hover:from-teal-100 group-hover:to-teal-200 transition-all duration-300 shadow-sm">
            {IconComponent && (
              <IconComponent className="w-7 h-7 text-teal-600 group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${status.bgColor} ${status.borderColor} border shadow-sm`}>
          <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
          <span className={`text-xs font-semibold ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
          {workflow.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {workflow.description}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <button
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm ${
            workflow.status === 'coming-soon'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 group-hover:shadow-lg group-hover:scale-105'
          }`}
          disabled={workflow.status === 'coming-soon'}
        >
          <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span>
            {workflow.status === 'coming-soon' ? 'Coming Soon' : 'Launch'}
          </span>
        </button>
      </div>
    </div>
  );
};