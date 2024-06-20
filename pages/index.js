import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || !user.fbUser) {
    return <div>Loading...</div>;
  }

  const navigateTo = (path) => {
    router.push(path);
  };

  const buttonStyle = {
    backgroundColor: '#33658A',
    color: 'white',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#264027',
    },
  };

  const adminButtonStyle = {
    background: 'linear-gradient(45deg, #FFA500 30%, #008080 90%)',
    color: 'white',
    marginBottom: '10px',
    '&:hover': {
      background: 'linear-gradient(45deg, #FF8C00 30%, #006666 90%)',
    },
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ marginBottom: '40px' }}>Hello {user.fbUser.displayName}!</h1>

      <div className="d-grid gap-2">
        <Button variant="contained" size="large" onClick={() => navigateTo('/guests/guestPage')} sx={buttonStyle}>
          Guests
        </Button>
        <Button variant="contained" size="large" onClick={() => navigateTo('/reservations/reservationPage')} sx={buttonStyle}>
          Reservations
        </Button>
        <Button variant="contained" size="large" onClick={() => navigateTo('/BikePage')} sx={buttonStyle}>
          Bikes
        </Button>
        <Button variant="contained" size="large" onClick={() => navigateTo('/RVSite')} sx={buttonStyle}>
          RV Sites
        </Button>
        {user.isAdmin && (
          <Button variant="contained" size="large" onClick={() => navigateTo('/AdminPage')} sx={adminButtonStyle}>
            Admin
          </Button>
        )}
        <Button variant="contained" color="error" type="button" size="large" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default Home;
