import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
    <Card
      variant="outlined"
      sx={{
        backgroundColor: '#008080',
        color: 'white',
        borderRadius: 4,
        border: '2px solid #000',
        boxShadow: 3,
      }}
    >
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
        <IconButton
          size="small"
          sx={{ backgroundColor: '#33658A', color: 'white', marginRight: 1 }}
          onClick={() => handleEdit(guest.guestId)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{ backgroundColor: '#8B0000', color: 'white' }}
          onClick={() => handleDelete(guest.guestId)}
        >
          <DeleteIcon />
        </IconButton>
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
