import 'firebase/auth';
import { clientCredentials } from '../utils/client';

// Create Reservation
const createReservation = (newReservation) => new Promise((resolve, reject) => {
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
        return resp.json().then(() => {
          throw new Error('Error creating reservation');
        });
      }
      return resp.json();
    })
    .then((data) => {
      resolve(data);
    })
    .catch(() => {
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
    .catch(() => {
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
    .catch(() => {
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
    .catch(() => {
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
    .catch(() => {
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
    .catch(() => {
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
    .catch(() => {
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
    .catch(() => {
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
