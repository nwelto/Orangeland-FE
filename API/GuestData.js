import 'firebase/auth';
import { clientCredentials } from '../utils/client';

// Create Guest
const createGuest = (newGuest) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/guests`, {
    method: 'POST',
    body: JSON.stringify(newGuest),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error creating guest:', error);
      reject(new Error('Error creating guest'));
    });
});

// Update Guest
const updateGuest = (guestId, updatedGuest) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/guests/${guestId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedGuest),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error updating guest:', error);
      reject(new Error('Error updating guest'));
    });
});

// Get All Guests
const getAllGuests = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/guests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error fetching all guests:', error);
      reject(new Error('Error fetching all guests'));
    });
});

// Get Guest by ID
const getGuestById = (guestId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/guests/${guestId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error fetching guest by ID:', error);
      reject(new Error('Error fetching guest by ID'));
    });
});

// Delete Guest by ID
const deleteGuestById = (guestId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/guests/${guestId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error deleting guest:', error);
      reject(new Error('Error deleting guest'));
    });
});

export {
  createGuest,
  updateGuest,
  getAllGuests,
  getGuestById,
  deleteGuestById,
};
