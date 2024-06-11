import 'firebase/auth';
import { clientCredentials } from '../utils/client';

// Create Reservation
const createReservation = (newReservation) => new Promise((resolve, reject) => {
  console.warn('Reservation to be sent to backend:', newReservation);

  fetch(`${clientCredentials.databaseURL}/reservations`, {
    method: 'POST',
    body: JSON.stringify(newReservation),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        return resp.json().then((error) => {
          console.error('Error response from backend:', error);
          throw new Error('Error creating reservation');
        });
      }
      return resp.json();
    })
    .then((data) => {
      console.warn('Response from backend:', data);
      resolve(data);
    })
    .catch((error) => {
      console.error('Error creating reservation:', error);
      reject(new Error('Error creating reservation'));
    });
});

// Get All Reservations
const getAllReservations = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error fetching all reservations:', error);
      reject(new Error('Error fetching all reservations'));
    });
});

// Get Reservation by ID
const getReservationById = (reservationId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations/${reservationId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error fetching reservation by ID:', error);
      reject(new Error('Error fetching reservation by ID'));
    });
});

// Update Reservation
const updateReservation = (reservationId, updatedReservation) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations/${reservationId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedReservation),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error updating reservation:', error);
      reject(new Error('Error updating reservation'));
    });
});

// Delete Reservation by ID
const deleteReservationById = (reservationId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations/${reservationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error deleting reservation:', error);
      reject(new Error('Error deleting reservation'));
    });
});

// Add Bike to Reservation
const addBikeToReservation = (reservationId, bikeRental) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations/${reservationId}/bikes`, {
    method: 'POST',
    body: JSON.stringify(bikeRental),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error adding bike to reservation:', error);
      reject(new Error('Error adding bike to reservation'));
    });
});

// Get Bikes for a Reservation
const getBikesForReservation = (reservationId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations/${reservationId}/bikes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error fetching bikes for reservation:', error);
      reject(new Error('Error fetching bikes for reservation'));
    });
});

// Remove Bike from Reservation
const removeBikeFromReservation = (reservationId, bikeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations/${reservationId}/bikes/${bikeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error removing bike from reservation:', error);
      reject(new Error('Error removing bike from reservation'));
    });
});

export {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservationById,
  addBikeToReservation,
  getBikesForReservation,
  removeBikeFromReservation,
};
