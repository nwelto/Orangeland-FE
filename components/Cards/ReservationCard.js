import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { deleteReservationById } from '../../API/ReservationData';
import { getGuestById } from '../../API/GuestData';
import { getUserById } from '../../API/UserData';

const ReservationCard = ({ reservation, onEdit }) => {
  const [guestName, setGuestName] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (reservation.guestId && !Number.isNaN(reservation.guestId)) {
      getGuestById(reservation.guestId)
        .then((guest) => {
          console.warn('Fetched guest:', guest);
          setGuestName(guest.name);
        })
        .catch((error) => console.error(`Error fetching guest with ID: ${reservation.guestId}`, error));
    }

    if (reservation.userId) {
      getUserById(reservation.userId)
        .then((user) => {
          console.warn('Fetched user:', user);
          setUserName(user.name);
        })
        .catch((error) => console.error(`Error fetching user with ID: ${reservation.userId}`, error));
    }
  }, [reservation.guestId, reservation.userId]);

  const handleDelete = (reservationId) => {
    deleteReservationById(reservationId)
      .then(() => {
        onEdit();
      })
      .catch((error) => console.error(`Error deleting reservation with ID: ${reservationId}`, error));
  };

  const statusMap = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Closed',
  };

  console.warn('Reservation data:', reservation);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          Reservation ID: {reservation.id}
        </Typography>
        <Typography color="text.secondary">
          User: {userName}
        </Typography>
        <Typography color="text.secondary">
          Site ID: {reservation.siteId}
        </Typography>
        <Typography color="text.secondary">
          Guest: {guestName}
        </Typography>
        <Typography color="text.secondary">
          Start Date: {reservation.startDate}
        </Typography>
        <Typography color="text.secondary">
          End Date: {reservation.endDate}
        </Typography>
        <Typography color="text.secondary">
          Number of Guests: {reservation.numberOfGuests}
        </Typography>
        <Typography color="text.secondary">
          Number of Dogs: {reservation.numberOfDogs}
        </Typography>
        <Typography color="text.secondary">
          Status: {statusMap[reservation.status]}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(reservation.id)}>Edit</Button>
        <Button size="small" onClick={() => handleDelete(reservation.id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

ReservationCard.propTypes = {
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    siteId: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numberOfGuests: PropTypes.number.isRequired,
    numberOfDogs: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    guestId: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ReservationCard;
