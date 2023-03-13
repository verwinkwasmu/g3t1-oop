import axios from 'axios';

import accountsData from './mock-data/accounts.json';
import workflowsData from './mock-data/workflows.json';

export function getAccounts() {
  return accountsData;  
}

export function getWorkflows() {
  return workflowsData;  
}