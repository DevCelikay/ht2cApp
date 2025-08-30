const API_BASE = '/webhook-test';

export class WorkflowAPI {
  static async executeWorkflow(endpoint: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
}

export const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  // This would integrate with a toast library in production
  console.log(`${type.toUpperCase()}: ${message}`);
  
  // Simple toast simulation
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
};