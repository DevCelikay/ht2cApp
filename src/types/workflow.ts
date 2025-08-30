export interface WorkflowCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'ready' | 'running' | 'needs-setup' | 'coming-soon';
  endpoint?: string;
  fields?: WorkflowField[];
}

export interface WorkflowField {
  id: string;
  label: string;
  description: string;
  type: 'text' | 'url' | 'number' | 'toggle' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface WorkflowFormData {
  [key: string]: string | number | boolean;
}

export interface WorkflowCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  workflows: WorkflowCard[];
}