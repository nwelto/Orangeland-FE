import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
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

  const statusMap = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Closed',
  };

  return (
    <Card variant="outlined" sx={{ backgroundColor: '#008080', color: 'white', borderRadius: 2 }}>
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
        <Button size="small" variant="contained" sx={{ backgroundColor: '#33658A', color: 'white' }} onClick={() => handleEdit(reservation.id)}>
          Edit
        </Button>
        <Button size="small" variant="contained" color="error" onClick={() => handleDelete(reservation.id)}>
          Delete
        </Button>
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
