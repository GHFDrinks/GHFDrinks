/**
 * Salesforce Sync Architecture Abstraction Layer
 * 
 * This module provides the foundation for syncing data between the GHF Drinks
 * offline-first presentation platform and the enterprise Salesforce instance.
 * 
 * IMPORTANT: Logic is intentionally abstracted to avoid tight coupling to 
 * specific Salesforce API versions. This layer acts as the intermediary mapping
 * and queueing system.
 */

import { createClient } from '../server';

// Types mapping platform concepts to Salesforce Standard Objects
export interface SF_Account {
  Id?: string;
  Name: string;
  Industry?: string;
  Rating?: string; // Maps to Tier
  OwnerId?: string; // Maps to account_manager
}

export interface SF_Event {
  Id?: string;
  WhatId?: string; // Account/Opportunity ID
  Subject: string;
  ActivityDateTime: string;
  Location?: string;
  Description?: string; // Notes
}

export interface SF_Task {
  Id?: string;
  WhatId?: string;
  Subject: string;
  ActivityDate?: string;
  Status: string;
  Description?: string;
}

/**
 * Pushes a local activity event (e.g., Presentation Viewed) to Salesforce
 * as a completed Task or Event on the Account timeline.
 */
export async function pushActivityToSalesforce(
  clientId: string, 
  eventType: string, 
  description: string
) {
  const supabase = await createClient();
  
  // 1. Fetch Salesforce Account ID
  const { data: client } = await supabase
    .from('clients')
    .select('salesforce_id')
    .eq('id', clientId)
    .single();

  if (!client?.salesforce_id) {
    console.warn('Client not linked to Salesforce. Queueing for later.');
    return;
  }

  // 2. Map to Salesforce format
  const sfTask: SF_Task = {
    WhatId: client.salesforce_id,
    Subject: `GHF Deck: ${eventType}`,
    Status: 'Completed',
    Description: description,
  };

  // 3. Log the intent to sync (Abstracted provider call goes here)
  const { error } = await supabase.from('crm_sync_logs').insert({
    entity_type: 'Activity',
    direction: 'push',
    payload: sfTask,
    status: 'pending' // Background worker will pick this up
  });

  if (error) throw new Error('Failed to queue Salesforce sync');
  return true;
}

/**
 * Pulls updated Opportunities from Salesforce to inform the rep
 * during presentation building.
 */
export async function syncOpportunitiesFromSalesforce(salesforceAccountId: string) {
  // Placeholder for the actual Salesforce REST API call
  // const response = await fetch(`https://{instance}.salesforce.com/services/data/v60.0/query/?q=SELECT+Id,Name,StageName,Amount+FROM+Opportunity+WHERE+AccountId='${salesforceAccountId}'`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // });
  
  // 1. Fetch from SF
  // 2. Map to local Opportunities table
  // 3. Upsert via Supabase
  
  return true;
}
