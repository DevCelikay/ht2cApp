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
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Icon and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-100 transition-colors">
            {IconComponent && (
              <IconComponent className="w-6 h-6 text-teal-600" />
            )}
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${status.bgColor} ${status.borderColor} border`}>
          <StatusIcon className={`w-3 h-3 ${status.color}`} />
          <span className={`text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
          {workflow.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {workflow.description}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            workflow.status === 'coming-soon'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-700 group-hover:shadow-md'
          }`}
          disabled={workflow.status === 'coming-soon'}
        >
          <Play className="w-4 h-4" />
          <span>
            {workflow.status === 'coming-soon' ? 'Coming Soon' : 'Launch'}
          </span>
        </button>
      </div>
    </div>
  );
};