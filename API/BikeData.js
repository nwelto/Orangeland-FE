import 'firebase/auth';
import { clientCredentials } from '../utils/client';

// Get All Bikes
const getAllBikes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bikes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(() => {
      reject(new Error('Error fetching all bikes'));
    });
});

// Get Bike by ID
const getBikeById = (bikeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bikes/${bikeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(() => {
      reject(new Error('Error fetching bike by ID'));
    });
});

export {
  getAllBikes,
  getBikeById,
};
