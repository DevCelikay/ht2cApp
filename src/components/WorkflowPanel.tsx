import React, { useState } from 'react';
import { X, Loader2, Play } from 'lucide-react';
import { WorkflowCard, WorkflowFormData } from '../types/workflow';
import { WorkflowAPI, showToast } from '../services/api';

interface WorkflowPanelProps {
  workflow: WorkflowCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowPanel: React.FC<WorkflowPanelProps> = ({ 
  workflow, 
  isOpen, 
  onClose 
}) => {
  const [formData, setFormData] = useState<WorkflowFormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const validateForm = (): boolean => {
    if (!workflow?.fields) return true;
    
    const newErrors: Record<string, string> = {};
    
    workflow.fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      if (field.type === 'url' && formData[field.id]) {
        try {
          new URL(formData[field.id] as string);
        } catch {
          newErrors[field.id] = 'Please enter a valid URL';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!workflow || !validateForm()) return;
    
    setIsLoading(true);
    try {
      await WorkflowAPI.executeWorkflow(workflow.endpoint!, formData);
      showToast(`${workflow.name} started successfully!`, 'success');
      onClose();
      setFormData({});
    } catch (error) {
      showToast('Failed to start workflow. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!workflow) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-3/5 max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{workflow.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {workflow.status === 'coming-soon' ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-600">This workflow is under development and will be available soon.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {workflow.fields?.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'toggle' ? (
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!formData[field.id]}
                          onChange={(e) => handleInputChange(field.id, e.target.checked)}
                          className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-600">Enable this option</span>
                      </label>
                    ) : (
                      <input
                        type={field.type === 'number' ? 'number' : 'text'}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                        placeholder={field.placeholder}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                          errors[field.id] ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    )}
                    
                    {errors[field.id] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {workflow.status !== 'coming-soon' && (
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isLoading ? 'Starting...' : 'Start Workflow'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};