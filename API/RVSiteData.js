import 'firebase/auth';
import { clientCredentials } from '../utils/client';

// Get All RV Sites
const getAllRVSites = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rvsites`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(() => {
      reject(new Error('Error fetching all RV sites'));
    });
});

// Get RV Site by ID
const getRVSiteById = (siteId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/rvsites/${siteId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(() => {
      reject(new Error('Error fetching RV site by ID'));
    });
});

export {
  getAllRVSites,
  getRVSiteById,
};
