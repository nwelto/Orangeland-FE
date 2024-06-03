import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { deleteReservationById } from '../../API/ReservationData';

const ReservationCard = ({ reservation, onEdit }) => {
  const handleDelete = (reservationId) => {
    deleteReservationById(reservationId)
      .then(() => {
        onEdit(); // Trigger a re-fetch or update in the parent component
      })
      .catch((error) => console.error(`Error deleting reservation with ID: ${reservationId}`, error));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          Reservation ID: {reservation.Id}
        </Typography>
        <Typography color="text.secondary">
          User ID: {reservation.UserId}
        </Typography>
        <Typography color="text.secondary">
          Site ID: {reservation.SiteId}
        </Typography>
        <Typography color="text.secondary">
          Guest ID: {reservation.GuestId}
        </Typography>
        <Typography color="text.secondary">
          Start Date: {reservation.StartDate}
        </Typography>
        <Typography color="text.secondary">
          End Date: {reservation.EndDate}
        </Typography>
        <Typography color="text.secondary">
          Number of Guests: {reservation.NumberOfGuests}
        </Typography>
        <Typography color="text.secondary">
          Number of Dogs: {reservation.NumberOfDogs}
        </Typography>
        <Typography color="text.secondary">
          Status: {reservation.Status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(reservation.Id)}>Edit</Button>
        <Button size="small" onClick={() => handleDelete(reservation.Id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

ReservationCard.propTypes = {
  reservation: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    UserId: PropTypes.number.isRequired,
    SiteId: PropTypes.number.isRequired,
    GuestId: PropTypes.number.isRequired,
    StartDate: PropTypes.string.isRequired,
    EndDate: PropTypes.string.isRequired,
    NumberOfGuests: PropTypes.number.isRequired,
    NumberOfDogs: PropTypes.number.isRequired,
    Status: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ReservationCard;
