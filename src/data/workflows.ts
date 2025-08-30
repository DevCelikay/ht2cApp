import { WorkflowCard, WorkflowCategory } from '../types/workflow';

const leadGenerationWorkflows: WorkflowCard[] = [
  {
    id: 'apollo-scraping',
    name: 'Apollo Scraping',
    description: 'Extract contacts from Apollo searches',
    icon: 'Search',
    status: 'ready',
    endpoint: '/startApolloScrape',
    fields: [
      {
        id: 'apolloUrl',
        label: 'Apollo URL',
        type: 'url',
        required: true,
        placeholder: 'https://app.apollo.io/...'
      },
      {
        id: 'scrapeName',
        label: 'Scrape Name',
        type: 'text',
        required: true,
        placeholder: 'My Apollo Scrape'
      },
      {
        id: 'straightToEnrich',
        label: 'Straight to Enrich',
        type: 'toggle'
      }
    ]
  },
  {
    id: 'google-maps',
    name: 'Google Maps Scraping',
    description: 'Gather business data from Google Maps',
    icon: 'MapPin',
    status: 'ready',
    endpoint: '/startGoogleOutscraper',
    fields: [
      {
        id: 'searchTerms',
        label: 'Search Terms',
        type: 'text',
        required: true,
        placeholder: 'healthcare clinics, medical centers'
      },
      {
        id: 'locations',
        label: 'Locations',
        type: 'text',
        required: true,
        placeholder: 'New York, Los Angeles, Chicago'
      },
      {
        id: 'resultsPerSearch',
        label: 'Results per Search',
        type: 'number',
        required: true,
        placeholder: '20'
      },
      {
        id: 'scrapeName',
        label: 'Scrape Name',
        type: 'text',
        required: true,
        placeholder: 'Google Maps Healthcare Scrape'
      }
    ]
  },
  {
    id: 'email-validation',
    name: 'Email Validation',
    description: 'Validate emails with LeadMagic & BounceBan',
    icon: 'CheckCircle',
    status: 'ready',
    endpoint: '/leadmagic',
    fields: [
      {
        id: 'spreadsheetId',
        label: 'Spreadsheet ID',
        type: 'text',
        required: true,
        placeholder: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
      }
    ]
  },
  {
    id: 'campaign-deploy',
    name: 'Campaign Deploy',
    description: 'Launch validated leads to SmartLead',
    icon: 'Send',
    status: 'coming-soon'
  }
];

export const workflowCategories: WorkflowCategory[] = [
  {
    id: 'lead-generation',
    name: 'List Building & Campaign Launch',
    description: 'Automate your lead generation workflow from data collection to campaign deployment',
    icon: 'Users',
    workflows: leadGenerationWorkflows
  },
  {
    id: 'data-management',
    name: 'Data Management & Analytics',
    description: 'Organize, clean, and analyze your lead data for better insights',
    icon: 'Database',
    workflows: []
  },
  {
    id: 'communication',
    name: 'Communication & Follow-up',
    description: 'Automate outreach sequences and manage customer communications',
    icon: 'MessageSquare',
    workflows: []
  }
];

export const workflows = leadGenerationWorkflows;