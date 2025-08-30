import { WorkflowCard, WorkflowCategory } from '../types/workflow';

const leadGenerationWorkflows: WorkflowCard[] = [
  {
    id: 'apollo-scraping',
    name: 'Apollo Scraping',
    description: 'Automatically extract high-quality contact data from Apollo.io search results to build targeted prospect lists',
    icon: 'Search',
    status: 'ready',
    endpoint: '/startApolloScrape',
    fields: [
      {
        id: 'apolloUrl',
        label: 'Apollo URL',
        description: 'Paste the full Apollo.io search results URL from your browser. Make sure you\'re logged into Apollo and the search contains the prospects you want to extract.',
        type: 'url',
        required: true,
        placeholder: 'https://app.apollo.io/...'
      },
      {
        id: 'scrapeName',
        label: 'Scrape Name',
        description: 'Give this scraping session a memorable name so you can easily identify it later in your workflow history.',
        type: 'text',
        required: true,
        placeholder: 'My Apollo Scrape'
      },
      {
        id: 'straightToEnrich',
        label: 'Straight to Enrich',
        description: 'Enable this to automatically enrich the scraped contacts with additional data points like phone numbers and social profiles.',
        type: 'toggle'
      }
    ]
  },
  {
    id: 'google-maps',
    name: 'Google Maps Scraping',
    description: 'Extract comprehensive business information from Google Maps including contact details, reviews, and location data',
    icon: 'MapPin',
    status: 'ready',
    endpoint: '/startGoogleOutscraper',
    fields: [
      {
        id: 'searchTerms',
        label: 'Search Terms',
        description: 'Enter the types of businesses you want to find. Use specific terms like "dental clinics", "physical therapy", or "medical centers" for better results.',
        type: 'text',
        required: true,
        placeholder: 'healthcare clinics, medical centers'
      },
      {
        id: 'locations',
        label: 'Locations',
        description: 'Specify the cities, states, or regions where you want to search. Separate multiple locations with commas for broader coverage.',
        type: 'text',
        required: true,
        placeholder: 'New York, Los Angeles, Chicago'
      },
      {
        id: 'resultsPerSearch',
        label: 'Results per Search',
        description: 'Set the maximum number of businesses to extract per search term and location combination. Higher numbers take longer but provide more comprehensive data.',
        type: 'number',
        required: true,
        placeholder: '20'
      },
      {
        id: 'scrapeName',
        label: 'Scrape Name',
        description: 'Create a descriptive name for this Google Maps scraping session to help you organize and track your data collection efforts.',
        type: 'text',
        required: true,
        placeholder: 'Google Maps Healthcare Scrape'
      }
    ]
  },
  {
    id: 'email-validation',
    name: 'Email Validation',
    description: 'Clean and verify your email lists using advanced validation to improve deliverability and reduce bounce rates',
    icon: 'CheckCircle',
    status: 'ready',
    endpoint: '/leadmagic',
    fields: [
      {
        id: 'spreadsheetId',
        label: 'Spreadsheet ID',
        description: 'Enter the Google Sheets ID containing your email list. The sheet should have an "email" column with the addresses you want to validate.',
        type: 'text',
        required: true,
        placeholder: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
      }
    ]
  },
  {
    id: 'campaign-deploy',
    name: 'Campaign Deploy',
    description: 'Automatically deploy your validated prospect lists to SmartLead for personalized email campaign execution',
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