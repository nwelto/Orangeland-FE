import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { getAllReservations } from '../../API/ReservationData';
import ReservationCard from '../../components/Cards/ReservationCard';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllReservations()
      .then((data) => {
        setReservations(data);
      })
      .catch();
  }, []);

  const handleEdit = () => {
    getAllReservations()
      .then((data) => setReservations(data))
      .catch();
  };

  const handleCreateReservation = () => {
    router.push('/reservations/new');
  };

  return (
    <div style={{ position: 'relative', marginTop: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Reservations</h1>
      <Grid container spacing={2}>
        {reservations.map((reservation) => (
          <Grid item xs={12} sm={6} md={4} key={reservation.id}>
            <ReservationCard reservation={reservation} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
        }}
        onClick={handleCreateReservation}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default ReservationsPage;
