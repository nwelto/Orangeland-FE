import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonBase from '@mui/material/ButtonBase';
import { useRouter } from 'next/router';
import { deleteReservationById } from '../../API/ReservationData';
import { getGuestById } from '../../API/GuestData';
import { getUserById } from '../../API/UserData';
import { getRVSiteById } from '../../API/RVSiteData';

const ReservationCard = ({ reservation, onEdit }) => {
  const [guestName, setGuestName] = useState('');
  const [userName, setUserName] = useState('');
  const [siteNumber, setSiteNumber] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (reservation.guestId && !Number.isNaN(reservation.guestId)) {
      getGuestById(reservation.guestId)
        .then((guest) => {
          setGuestName(guest.name);
        })
        .catch();
    }

    if (reservation.userId) {
      getUserById(reservation.userId)
        .then((user) => {
          setUserName(user.name);
        })
        .catch();
    }

    if (reservation.siteId) {
      getRVSiteById(reservation.siteId)
        .then((site) => {
          setSiteNumber(site.siteNumber);
        })
        .catch();
    }
  }, [reservation.guestId, reservation.userId, reservation.siteId]);

  const handleDelete = (reservationId) => {
    deleteReservationById(reservationId)
      .then(() => {
        onEdit();
      })
      .catch();
  };

  const handleEdit = (reservationId) => {
    router.push(`/reservations/edit/${reservationId}`);
  };

  const handleView = (reservationId) => {
    router.push(`/reservations/${reservationId}`);
  };

  const statusMap = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Closed',
  };

  return (
    <ButtonBase onClick={() => handleView(reservation.id)} sx={{ width: '100%' }}>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: '#008080',
          color: 'white',
          borderRadius: 4,
          border: '2px solid #000',
          boxShadow: 3,
          width: '100%',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: 'white' }}>
            Reservation ID: {reservation.id}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            User: {userName}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Site: {siteNumber}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Guest: {guestName}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Start Date: {reservation.startDate}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            End Date: {reservation.endDate}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Number of Guests: {reservation.numberOfGuests}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Number of Dogs: {reservation.numberOfDogs}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Status: {statusMap[reservation.status]}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            size="small"
            sx={{ backgroundColor: '#33658A', color: 'white', marginRight: 1 }}
            onClick={(e) => { e.stopPropagation(); handleEdit(reservation.id); }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ backgroundColor: '#8B0000', color: 'white' }}
            onClick={(e) => { e.stopPropagation(); handleDelete(reservation.id); }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </ButtonBase>
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
