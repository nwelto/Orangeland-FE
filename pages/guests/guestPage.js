import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { getAllGuests } from '../../API/GuestData';
import GuestCard from '../../components/Cards/GuestCard';

const GuestPage = () => {
  const [guests, setGuests] = useState([]);
  const router = useRouter();

  const fetchGuests = () => {
    getAllGuests().then(setGuests).catch();
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleEdit = () => {
    fetchGuests();
  };

  const handleCreateGuest = () => {
    router.push('/guests/new');
  };

  return (
    <div style={{ position: 'relative', marginTop: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Guests</h1>
      <Grid container spacing={2}>
        {guests.map((guest) => (
          <Grid item key={guest.guestId} xs={12} sm={6} md={4}>
            <GuestCard
              guest={guest}
              onEdit={handleEdit}
            />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleCreateGuest}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default GuestPage;
