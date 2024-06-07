import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { getAllGuests } from '../../API/GuestData';
import GuestCard from '../../components/Cards/GuestCard';

const GuestPage = () => {
  const [guests, setGuests] = useState([]);

  const fetchGuests = () => {
    getAllGuests().then(setGuests).catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleEdit = () => {
    fetchGuests();
  };

  return (
    <div>
      <h1>All Guests</h1>
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
    </div>
  );
};

export default GuestPage;
