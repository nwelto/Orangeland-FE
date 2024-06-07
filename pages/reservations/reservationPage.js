import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { getAllReservations } from '../../API/ReservationData';
import ReservationCard from '../../components/Cards/ReservationCard';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getAllReservations()
      .then((data) => {
        console.warn('Fetched reservations:', data);
        setReservations(data);
      })
      .catch((error) => console.error('Error fetching reservations:', error));
  }, []);

  const handleEdit = () => {
    getAllReservations()
      .then((data) => setReservations(data))
      .catch((error) => console.error('Error fetching reservations:', error));
  };

  return (
    <Grid container spacing={2}>
      {reservations.map((reservation) => (
        <Grid item xs={12} sm={6} md={4} key={reservation.id}>
          <ReservationCard reservation={reservation} onEdit={handleEdit} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReservationsPage;
