export interface Integration {
  id: string;
  name: string;
  category: 'CRM' | 'Communication' | 'ERP' | 'Marketing' | 'Collaboration' | 'Workspace';
  provider: string; // 'salesforce' | 'hubspot' | 'dynamics' | 'google_workspace' | 'm365' | 'slack' | 'email' | 'erp'
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
  uptime: number;
  latency: number;
  errorRate: number;
  description: string;
  config: Record<string, any>;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  secret: string;
  created_at: string;
  lastTriggered?: string;
  successRate?: number;
}

export interface APIKey {
  id: string;
  name: string;
  prefix: string;
  key: string;
  scopes: string[];
  status: 'active' | 'revoked';
  created_at: string;
  last_used_at: string;
  expires_at: string | null;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  isActive: boolean;
  lastRunStatus: 'success' | 'failed' | 'idle';
  lastRunTime?: string;
}

export interface EventLog {
  id: string;
  eventType: string;
  source: string;
  timestamp: string;
  status: 'processed' | 'failed' | 'pending';
  payload: Record<string, any>;
}

export interface SyncJob {
  id: string;
  integrationId: string;
  integrationName: string;
  type: 'incremental' | 'full' | 'realtime';
  status: 'success' | 'failed' | 'running';
  processed: number;
  failed: number;
  conflicts: number;
  startedAt: string;
  completedAt?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  details: string;
  ip: string;
  timestamp: string;
}

export const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: 'int_salesforce',
    name: 'Salesforce CRM',
    category: 'CRM',
    provider: 'salesforce',
    status: 'active',
    lastSync: '2026-05-30T14:00:00Z',
    uptime: 99.98,
    latency: 245,
    errorRate: 0.05,
    description: 'Sync Accounts, Opportunities, and Presentation Sessions to the core Salesforce CRM pipeline.',
    config: {
      instanceUrl: 'https://ghf-drinks.my.salesforce.com',
      apiVersion: 'v60.0',
      syncOpportunities: true,
      syncActivities: true,
    }
  },
  {
    id: 'int_hubspot',
    name: 'HubSpot',
    category: 'Marketing',
    provider: 'hubspot',
    status: 'inactive',
    lastSync: '2026-05-29T10:15:00Z',
    uptime: 100.00,
    latency: 180,
    errorRate: 0.00,
    description: 'Synchronize brand interaction, marketing engagement, and client email preferences with HubSpot.',
    config: {
      portalId: '827419',
      syncContacts: false,
    }
  },
  {
    id: 'int_slack',
    name: 'Slack Enterprise Grid',
    category: 'Communication',
    provider: 'slack',
    status: 'active',
    lastSync: '2026-05-30T14:05:00Z',
    uptime: 99.99,
    latency: 120,
    errorRate: 0.01,
    description: 'Post real-time client activity notifications and deal updates directly to GHF Slack channels.',
    config: {
      defaultChannel: '#ghf-deals-live',
      notificationEvents: ['presentation_shared', 'client_viewed_portal'],
    }
  },
  {
    id: 'int_google_workspace',
    name: 'Google Workspace',
    category: 'Workspace',
    provider: 'google_workspace',
    status: 'active',
    lastSync: '2026-05-30T13:45:00Z',
    uptime: 99.95,
    latency: 190,
    errorRate: 0.12,
    description: 'Sync customer meetings, presentations, and calendar invitations with Google Calendar.',
    config: {
      syncCalendar: true,
      calendarName: 'GHF Client Meetings',
    }
  },
  {
    id: 'int_sap_erp',
    name: 'SAP S/4HANA ERP',
    category: 'ERP',
    provider: 'erp',
    status: 'error',
    lastSync: '2026-05-30T11:00:00Z',
    uptime: 94.20,
    latency: 850,
    errorRate: 8.40,
    description: 'Reconcile wholesale ordering, inventory, and support package billing items directly with ERP ledger.',
    config: {
      endpoint: 'https://sap-gateway.ghf-drinks.internal/sap/opu/odata/sap',
      fallbackQueue: true,
    }
  },
  {
    id: 'int_m365',
    name: 'Microsoft 365',
    category: 'Workspace',
    provider: 'm365',
    status: 'inactive',
    lastSync: 'N/A',
    uptime: 100,
    latency: 0,
    errorRate: 0,
    description: 'Synchronize client engagements with Outlook Calendar and share decks via OneDrive.',
    config: {}
  },
  {
    id: 'int_dynamics',
    name: 'Microsoft Dynamics 365',
    category: 'CRM',
    provider: 'dynamics',
    status: 'inactive',
    lastSync: 'N/A',
    uptime: 100,
    latency: 0,
    errorRate: 0,
    description: 'Synchronize high-level luxury retail pipeline with Microsoft Dynamics accounts.',
    config: {}
  },
  {
    id: 'int_email',
    name: 'SMTP / SendGrid',
    category: 'Communication',
    provider: 'email',
    status: 'active',
    lastSync: '2026-05-30T14:02:00Z',
    uptime: 99.99,
    latency: 90,
    errorRate: 0.02,
    description: 'Automated follow-up emails, activation invitations, and tasting notes PDFs delivery.',
    config: {
      senderEmail: 'relations@ghfdrinks.com',
      useSendGrid: true,
    }
  }
];

export const INITIAL_WEBHOOKS: Webhook[] = [
  {
    id: 'wh_1',
    name: 'Customer Portal Webhook',
    url: 'https://api.ghfdrinks.com/v1/webhooks/portal-events',
    events: ['client_viewed_portal', 'engagement_recorded'],
    status: 'active',
    secret: 'whsec_88fa298ea7b7e281cc88db9f89e2',
    created_at: '2026-05-01T08:00:00Z',
    lastTriggered: '2026-05-30T13:58:12Z',
    successRate: 99.7
  },
  {
    id: 'wh_2',
    name: 'Sales Force Automation Receiver',
    url: 'https://flow.salesforce.com/endpoints/ghf-webhook-receiver',
    events: ['meeting_completed', 'activation_updated'],
    status: 'active',
    secret: 'whsec_9910fbc28b3984caeed988f01a09',
    created_at: '2026-05-10T12:30:00Z',
    lastTriggered: '2026-05-30T13:42:01Z',
    successRate: 100.0
  },
  {
    id: 'wh_3',
    name: 'Custom ERP Inventory Trigger',
    url: 'https://erp.ghfdrinks.internal/api/deck-trigger',
    events: ['content_published'],
    status: 'inactive',
    secret: 'whsec_77acb1239aa8d8d3f1a0e98c772e',
    created_at: '2026-05-15T15:00:00Z',
    lastTriggered: '2026-05-28T09:12:00Z',
    successRate: 92.4
  }
];

export const INITIAL_API_KEYS: APIKey[] = [
  {
    id: 'key_1',
    name: 'Production Read-Only Client Key',
    prefix: 'ghf_live_',
    key: 'ghf_live_••••••••••••••••3A7f',
    scopes: ['read:brands', 'read:presentations', 'read:activations'],
    status: 'active',
    created_at: '2026-04-12T09:00:00Z',
    last_used_at: '2026-05-30T14:08:44Z',
    expires_at: null
  },
  {
    id: 'key_2',
    name: 'Salesforce Connector Sync Key',
    prefix: 'ghf_live_',
    key: 'ghf_live_••••••••••••••••7F22',
    scopes: ['read:presentations', 'write:leads', 'write:activities', 'read:clients'],
    status: 'active',
    created_at: '2026-05-02T10:30:00Z',
    last_used_at: '2026-05-30T13:45:00Z',
    expires_at: '2027-05-02T10:30:00Z'
  },
  {
    id: 'key_3',
    name: 'Staging Testing Token',
    prefix: 'ghf_test_',
    key: 'ghf_test_••••••••••••••••9e10',
    scopes: ['read:brands', 'write:brands'],
    status: 'revoked',
    created_at: '2026-05-18T14:00:00Z',
    last_used_at: '2026-05-20T11:12:05Z',
    expires_at: '2026-06-18T14:00:00Z'
  }
];

export const INITIAL_WORKFLOWS: Workflow[] = [
  {
    id: 'wf_1',
    name: 'Luxury Follow-Up Trigger',
    description: 'When a presentation is completed, queue an automatic bespoke follow-up email through SendGrid.',
    trigger: 'meeting_completed',
    actions: ['Fetch Client Details', 'Compile Tasting Deck PDF', 'Queue SendGrid Email Template'],
    isActive: true,
    lastRunStatus: 'success',
    lastRunTime: '2026-05-30T13:12:00Z'
  },
  {
    id: 'wf_2',
    name: 'Salesforce Deal Accelerator',
    description: 'When a client views the shared web portal, instantly update the Salesforce Opportunity stage to "Presentation".',
    trigger: 'client_viewed_portal',
    actions: ['Validate Opportunity Link', 'Push SF Opportunity Stage Update', 'Slack Account Manager'],
    isActive: true,
    lastRunStatus: 'success',
    lastRunTime: '2026-05-30T14:01:05Z'
  },
  {
    id: 'wf_3',
    name: 'Urgent Slack Notification on Sync Failure',
    description: 'Alert the operations channel on Slack immediately if the SAP ERP sync encounters an authentication error.',
    trigger: 'sync_failed',
    actions: ['Check Error Details', 'Assemble Slack Block Alert', 'Post to #platform-alerts'],
    isActive: true,
    lastRunStatus: 'failed',
    lastRunTime: '2026-05-30T11:00:02Z'
  },
  {
    id: 'wf_4',
    name: 'Automatic Portal Regeneration',
    description: 'When new brand variants are published, regenerate client portal recommendations using AI copilot.',
    trigger: 'content_published',
    actions: ['Trigger AI Recommendation Engine', 'Update Portal Recommendations', 'Re-index Search Cache'],
    isActive: false,
    lastRunStatus: 'idle'
  }
];

export const MOCK_EVENT_LOGS: EventLog[] = [
  {
    id: 'evt_1',
    eventType: 'client_viewed_portal',
    source: 'web_portal',
    timestamp: '2026-05-30T14:08:12Z',
    status: 'processed',
    payload: {
      clientId: 'cli_rosewood_london',
      portalSessionId: 'sess_99a8bc',
      durationSeconds: 145,
      brandsViewed: ['Macallan Reflexion', 'Hibiki Harmony'],
      deviceType: 'iPad Pro'
    }
  },
  {
    id: 'evt_2',
    eventType: 'meeting_completed',
    source: 'sales_tablet',
    timestamp: '2026-05-30T13:59:45Z',
    status: 'processed',
    payload: {
      meetingId: 'meet_claridges_mayfair',
      clientId: 'cli_claridges',
      repId: 'rep_john_doe',
      durationMinutes: 45,
      deckShown: 'Summer Portfolio Pitch'
    }
  },
  {
    id: 'evt_3',
    eventType: 'presentation_created',
    source: 'platform',
    timestamp: '2026-05-30T13:40:00Z',
    status: 'processed',
    payload: {
      presentationId: 'pres_macallan_tasting_2026',
      ownerId: 'rep_john_doe',
      brands: ['Macallan Sherry Oak 18', 'Macallan Double Cask 12'],
      slideCount: 14
    }
  },
  {
    id: 'evt_4',
    eventType: 'activation_updated',
    source: 'salesforce_connector',
    timestamp: '2026-05-30T13:10:15Z',
    status: 'processed',
    payload: {
      activationId: 'act_london_fashion_week_2026',
      changeSet: {
        budget: 45000,
        status: 'Confirmed'
      }
    }
  },
  {
    id: 'evt_5',
    eventType: 'recommendation_generated',
    source: 'ai_copilot',
    timestamp: '2026-05-30T12:55:00Z',
    status: 'processed',
    payload: {
      clientId: 'cli_rosewood_london',
      model: 'ghf-sales-gpt-v4',
      confidenceScore: 0.94,
      suggestedBrands: ['Macallan Reflexion', 'Bowmore 15 Year Old']
    }
  },
  {
    id: 'evt_6',
    eventType: 'sync_failed',
    source: 'sap_erp_connector',
    timestamp: '2026-05-30T11:00:00Z',
    status: 'failed',
    payload: {
      connectorId: 'int_sap_erp',
      errorType: 'GATEWAY_TIMEOUT',
      errorMessage: 'SAP S/4HANA server failed to respond within 30000ms. Connection aborted.',
      syncQueueLength: 142
    }
  }
];

export const MOCK_SYNC_JOBS: SyncJob[] = [
  {
    id: 'job_1',
    integrationId: 'int_salesforce',
    integrationName: 'Salesforce CRM',
    type: 'incremental',
    status: 'success',
    processed: 24,
    failed: 0,
    conflicts: 0,
    startedAt: '2026-05-30T14:00:00Z',
    completedAt: '2026-05-30T14:00:08Z'
  },
  {
    id: 'job_2',
    integrationId: 'int_slack',
    integrationName: 'Slack Enterprise Grid',
    type: 'realtime',
    status: 'running',
    processed: 125,
    failed: 1,
    conflicts: 0,
    startedAt: '2026-05-30T00:00:00Z'
  },
  {
    id: 'job_3',
    integrationId: 'int_sap_erp',
    integrationName: 'SAP S/4HANA ERP',
    type: 'full',
    status: 'failed',
    processed: 0,
    failed: 142,
    conflicts: 0,
    startedAt: '2026-05-30T11:00:00Z',
    completedAt: '2026-05-30T11:00:30Z'
  },
  {
    id: 'job_4',
    integrationId: 'int_google_workspace',
    integrationName: 'Google Workspace',
    type: 'incremental',
    status: 'success',
    processed: 12,
    failed: 0,
    conflicts: 1,
    startedAt: '2026-05-30T13:45:00Z',
    completedAt: '2026-05-30T13:45:12Z'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud_1',
    user: 'alex.director@ghfdrinks.com',
    action: 'api_key_created',
    details: 'Created API key "Production Read-Only Client Key" with scopes [read:brands, read:presentations]',
    ip: '82.44.19.220',
    timestamp: '2026-05-30T14:05:00Z'
  },
  {
    id: 'aud_2',
    user: 'alex.director@ghfdrinks.com',
    action: 'webhook_updated',
    details: 'Enabled Webhook endpoint "Customer Portal Webhook" for events [client_viewed_portal, engagement_recorded]',
    ip: '82.44.19.220',
    timestamp: '2026-05-30T13:50:00Z'
  },
  {
    id: 'aud_3',
    user: 'system_daemon',
    action: 'sync_failure_logged',
    details: 'SAP S/4HANA sync failed. Reason: Gateway timeout (504). Autoretry scheduled in 15m.',
    ip: '127.0.0.1',
    timestamp: '2026-05-30T11:00:05Z'
  },
  {
    id: 'aud_4',
    user: 'alex.director@ghfdrinks.com',
    action: 'integration_settings_changed',
    details: 'Modified Salesforce mapping schema for Opportunity record types (added Field: GHF_Deck_Duration__c)',
    ip: '82.44.19.220',
    timestamp: '2026-05-29T16:40:00Z'
  }
];
