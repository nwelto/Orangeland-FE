import 'firebase/auth';
import { clientCredentials } from '../utils/client';

// Get User by ID
const getUserById = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(() => {
      reject(new Error('Error fetching user by ID'));
    });
});

// Get All Users
const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(() => {
      reject(new Error('Error fetching all users'));
    });
});

// Update User
const updateUser = (userId, updatedUser) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedUser),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(() => {
      reject(new Error('Error updating user'));
    });
});

// Delete User
const deleteUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(() => {
      reject(new Error('Error deleting user'));
    });
});

export {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
