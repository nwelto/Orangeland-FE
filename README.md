# OrangeLand

## Overview

OrangeLand is a web application designed to manage reservations for RV sites and bike rentals. It provides users with a streamlined interface to view, add, and manage reservations and associated resources. The application leverages modern technologies such as React, Next.js, and Material-UI (MUI) for the frontend, and Firebase for authentication. The backend is built with C#.

## Features

- **User Authentication**: Secure login and logout functionality using Firebase authentication.
- **Reservation Management**: View, add, edit, and delete reservations.
- **Bike Rentals**: Manage bike rentals associated with reservations. View available bikes and add or remove bikes from reservations.
- **RV Site Management**: View details of RV sites.
- **Admin Features**: Admin-specific functionality for managing users and reservations (admin lock removed for certain pages).
- **Responsive Design**: Mobile-friendly design with a responsive layout.

## Pages

### Home
- Central hub with buttons routing to various sections of the app.

### Sign In
- Styled sign-in page with Firebase authentication and redirection to the home page upon successful login.

### Reservations
- View a list of all reservations.
- Each reservation card acts as a button to view detailed information about a single reservation.
- Form to add and edit reservations, with automatic navigation back to the previous page after editing.

### Bikes
- View a list of all bikes.
- Add or remove bikes from reservations.
- Available bikes are filtered based on their reservation status.

### RV Sites
- View a list of all RV sites with detailed information.
- Admin lock removed to allow access for all users.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/orangeland.git
   cd orangeland
   
2. Install dependencies:

        npm install
        Set up Firebase:

3. Create a Firebase project and configure authentication.
   Update utils/firebase.js with your Firebase configuration.
        Start the development server:
        
        npm run dev
## Backend
The backend for OrangeLand is built with C#. You can find the repository and installation instructions here.
https://github.com/nwelto/OrangeLand

## Technologies Used
1. Frontend: React, Next.js, Material-UI (MUI)
2. Backend: C#
3. Authentication: Firebase Authentication
4. Styling: CSS, Bootstrap

