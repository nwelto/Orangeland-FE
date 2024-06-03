import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { deleteGuestById } from '../../API/GuestData';

const GuestCard = ({ guest, reservations, onEdit }) => {
  const handleDelete = (guestId) => {
    deleteGuestById(guestId)
      .then(() => {
        onEdit();
      })
      .catch((error) => console.error(`Error deleting guest with ID: ${guestId}`, error));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {guest.Name}
        </Typography>
        <Typography color="text.secondary">
          RV Type: {guest.RVType}
        </Typography>
        <Typography variant="body2">
          Reservations:
        </Typography>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <Typography key={reservation.Id} variant="body2">
              {`ID: ${reservation.Id}, Start: ${reservation.StartDate}, End: ${reservation.EndDate}, Status: ${reservation.Status}`}
            </Typography>
          ))
        ) : (
          <Typography variant="body2">
            No reservations
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(guest.GuestId)}>Edit</Button>
        <Button size="small" onClick={() => handleDelete(guest.GuestId)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

GuestCard.propTypes = {
  guest: PropTypes.shape({
    GuestId: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    RVType: PropTypes.string.isRequired,
  }).isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      StartDate: PropTypes.string.isRequired,
      EndDate: PropTypes.string.isRequired,
      Status: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default GuestCard;
