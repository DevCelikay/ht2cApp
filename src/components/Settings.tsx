import React from 'react';
import { Key, Database, Globe, Bell, Shield, Users } from 'lucide-react';

export const Settings: React.FC = () => {
  const settingsSections = [
    {
      id: 'api-keys',
      title: 'API Keys',
      description: 'Manage your third-party service integrations',
      icon: Key,
      items: [
        { name: 'Apollo API Key', status: 'Connected', type: 'success' },
        { name: 'Google Maps API Key', status: 'Connected', type: 'success' },
        { name: 'LeadMagic API Key', status: 'Not Connected', type: 'warning' },
        { name: 'SmartLead API Key', status: 'Not Connected', type: 'warning' },
      ]
    },
    {
      id: 'database',
      title: 'Database',
      description: 'Configure your data storage settings',
      icon: Database,
      items: [
        { name: 'Supabase Connection', status: 'Active', type: 'success' },
        { name: 'Data Retention', status: '90 days', type: 'info' },
        { name: 'Backup Schedule', status: 'Daily', type: 'info' },
      ]
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      description: 'Manage webhook endpoints and notifications',
      icon: Globe,
      items: [
        { name: 'n8n Webhook URL', status: 'Active', type: 'success' },
        { name: 'Workflow Notifications', status: 'Enabled', type: 'success' },
      ]
    }
  ];

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">
          Configure your HealthTech2Care platform integrations and preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {settingsSections.map(section => {
          const IconComponent = section.icon;
          return (
            <div key={section.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {section.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.type)}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Configure {section.title}
              </button>
            </div>
          );
        })}

        {/* Additional Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">Configure alert preferences</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              'Workflow completion alerts',
              'Error notifications',
              'Daily summary reports',
              'System maintenance updates'
            ].map((notification, index) => (
              <label key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                <span className="text-sm font-medium text-gray-900">{notification}</span>
                <input
                  type="checkbox"
                  defaultChecked={index < 2}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              <p className="text-sm text-gray-600">Manage security settings</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Two-factor Authentication</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full text-orange-600 bg-orange-50 border border-orange-200">
                Recommended
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Session Timeout</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full text-blue-600 bg-blue-50 border border-blue-200">
                24 hours
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">API Rate Limiting</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full text-green-600 bg-green-50 border border-green-200">
                Enabled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};