import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { deleteGuestById } from '../../API/GuestData';

const GuestCard = ({ guest, onEdit }) => {
  const router = useRouter();

  const handleDelete = (guestId) => {
    deleteGuestById(guestId)
      .then(() => {
        console.log(`Deleted guest with ID: ${guestId}`);
        onEdit();
      })
      .catch((error) => console.error(`Error deleting guest with ID: ${guestId}`, error));
  };

  const handleEdit = (guestId) => {
    router.push(`/guests/edit/${guestId}`);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {guest.name || 'N/A'}
        </Typography>
        <Typography color="text.secondary">
          RV Type: {guest.rvType || 'N/A'}
        </Typography>
        <Typography color="text.secondary">
          Phone Number: {guest.phoneNumber || 'N/A'}
        </Typography>
        <Typography color="text.secondary">
          Email: {guest.email || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleEdit(guest.guestId)}>Edit</Button>
        <Button size="small" onClick={() => handleDelete(guest.guestId)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

GuestCard.propTypes = {
  guest: PropTypes.shape({
    guestId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rvType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default GuestCard;
