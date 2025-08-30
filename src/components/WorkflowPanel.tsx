import React, { useState } from 'react';
import { X, Loader2, Play } from 'lucide-react';
import { WorkflowCard, WorkflowFormData } from '../types/workflow';
import { WorkflowAPI, showToast, showWorkflowStarted } from '../services/api';

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
      showWorkflowStarted(workflow.name);
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
        className={`fixed right-0 top-0 h-full w-3/4 max-w-4xl bg-white shadow-2xl z-50 transform transition-transform duration-700 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{workflow.name}</h2>
              <p className="text-base text-gray-600 mt-2 max-w-2xl">{workflow.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white hover:shadow-md rounded-xl transition-all duration-300"
            >
              <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {workflow.status === 'coming-soon' ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Clock className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
                <p className="text-gray-600 text-lg max-w-md">This workflow is under development and will be available soon. We're working hard to bring you this feature!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {workflow.fields?.map(field => (
                  <div key={field.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <label className="block text-base font-semibold text-gray-800 mb-3">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-2">*</span>}
                    </label>
                    
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {field.description}
                    </p>
                    
                    {field.type === 'toggle' ? (
                      <label className="flex items-center space-x-4 cursor-pointer p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 transition-colors">
                        <input
                          type="checkbox"
                          checked={!!formData[field.id]}
                          onChange={(e) => handleInputChange(field.id, e.target.checked)}
                          className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 focus:ring-2"
                        />
                        <span className="text-base font-medium text-gray-700">Enable this option</span>
                      </label>
                    ) : (
                      <input
                        type={field.type === 'number' ? 'number' : 'text'}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-base bg-white shadow-sm ${
                          errors[field.id] ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-teal-300'
                        }`}
                      />
                    )}
                    
                    {errors[field.id] && (
                      <p className="text-red-600 text-sm mt-3 font-medium">{errors[field.id]}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {workflow.status !== 'coming-soon' && (
            <div className="p-8 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 px-6 rounded-xl hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-base"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Starting Workflow...' : 'Start Workflow'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};