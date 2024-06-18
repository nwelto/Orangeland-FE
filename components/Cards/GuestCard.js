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
        onEdit();
      })
      .catch(() => {
      });
  };

  const handleEdit = (guestId) => {
    router.push(`/guests/edit/${guestId}`);
  };

  return (
    <Card variant="outlined" sx={{ backgroundColor: '#008080', color: 'white', borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: 'white' }}>
          {guest.name || 'N/A'}
        </Typography>
        <Typography sx={{ color: 'white' }}>
          RV Type: {guest.rvType || 'N/A'}
        </Typography>
        <Typography sx={{ color: 'white' }}>
          Phone Number: {guest.phoneNumber || 'N/A'}
        </Typography>
        <Typography sx={{ color: 'white' }}>
          Email: {guest.email || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" sx={{ backgroundColor: '#33658A', color: 'white' }} onClick={() => handleEdit(guest.guestId)}>
          Edit
        </Button>
        <Button size="small" variant="contained" color="error" onClick={() => handleDelete(guest.guestId)}>
          Delete
        </Button>
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
