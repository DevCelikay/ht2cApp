import React, { useState } from 'react';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { WorkflowCard } from './WorkflowCard';
import { CategoryCard } from './CategoryCard';
import { WorkflowPanel } from './WorkflowPanel';
import { workflowCategories } from '../data/workflows';
import { WorkflowCard as WorkflowCardType, WorkflowCategory } from '../types/workflow';

export const Dashboard: React.FC = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowCardType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WorkflowCategory | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleWorkflowClick = (workflow: WorkflowCardType) => {
    setSelectedWorkflow(workflow);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedWorkflow(null), 300);
  };

  const handleCategoryClick = (category: WorkflowCategory) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const showCategories = !selectedCategory;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          {!showCategories && (
            <button
              onClick={handleBackToCategories}
              className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Categories</span>
            </button>
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {showCategories ? 'Workflow Categories' : selectedCategory?.name}
        </h2>
        <p className="text-gray-600">
          {showCategories 
            ? 'Choose a category to explore available automation workflows'
            : selectedCategory?.description
          }
        </p>
      </div>

      {showCategories ? (
        /* Category Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {workflowCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      ) : (
        /* Workflow Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCategory?.workflows.map(workflow => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onClick={() => handleWorkflowClick(workflow)}
            />
          ))}
        </div>
      )}

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No recent workflow activity</h4>
            <p className="text-base text-gray-500 mt-2">
              Your workflow executions will appear here
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Configuration Panel */}
      <WorkflowPanel
        workflow={selectedWorkflow}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
};