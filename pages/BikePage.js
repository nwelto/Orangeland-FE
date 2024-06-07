import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, MenuItem, Select, Button,
} from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import { getAllBikes } from '../API/BikeData';
import { getAllReservations, addBikeToReservation, removeBikeFromReservation } from '../API/ReservationData';
import { getGuestById } from '../API/GuestData';

const BikePage = () => {
  const { user } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [guests, setGuests] = useState({});
  const [selectedReservations, setSelectedReservations] = useState({});

  const fetchBikesAndReservations = () => {
    if (user && user.isAdmin) {
      getAllBikes()
        .then(setBikes)
        .catch((error) => console.error('Error fetching bikes:', error));

      getAllReservations()
        .then((data) => {
          setReservations(data);
          data.forEach((reservation) => {
            getGuestById(reservation.guestId)
              .then((guest) => {
                setGuests((prev) => ({ ...prev, [reservation.guestId]: guest.name }));
              })
              .catch((error) => console.error('Error fetching guest:', error));
          });
        })
        .catch((error) => console.error('Error fetching reservations:', error));
    }
  };

  useEffect(() => {
    fetchBikesAndReservations();
  }, [user]);

  const handleReservationChange = (bikeId, reservationId) => {
    setSelectedReservations((prev) => ({
      ...prev,
      [bikeId]: reservationId,
    }));
  };

  const handleAddBikeToReservation = (bikeId) => {
    const reservationId = selectedReservations[bikeId];
    if (reservationId) {
      addBikeToReservation(reservationId, { bikeId })
        .then(() => {
          fetchBikesAndReservations();
        })
        .catch((error) => console.error('Error adding bike to reservation:', error));
    }
  };

  const handleRemoveBikeFromReservation = (reservationId, bikeId) => {
    removeBikeFromReservation(reservationId, bikeId)
      .then(() => {
        fetchBikesAndReservations();
      })
      .catch((error) => console.error('Error removing bike from reservation:', error));
  };

  if (!user || !user.isAdmin) {
    return <Typography variant="h6">Access Denied</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="bikes table">
        <TableHead>
          <TableRow>
            <TableCell>Bike ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Rental Fee</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Reservations</TableCell>
            <TableCell>Add to Reservation</TableCell>
            <TableCell>Remove from Reservation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bikes.map((bike) => (
            <TableRow key={bike.id}>
              <TableCell>{bike.id}</TableCell>
              <TableCell>{bike.type}</TableCell>
              <TableCell>{bike.rentalFee}</TableCell>
              <TableCell>{bike.isAvailable ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                {bike.bikeRentals.length > 0 ? (
                  bike.bikeRentals.map((rental) => {
                    const reservation = reservations.find((res) => res.id === rental.reservationId);
                    return reservation ? (
                      <div key={rental.reservationId}>
                        {`Reservation ID: ${reservation.id} (Guest: ${guests[reservation.guestId] || 'Loading...'})`}
                      </div>
                    ) : 'No Reservation';
                  })
                ) : 'No Reservation'}
              </TableCell>
              <TableCell>
                <Select
                  value={selectedReservations[bike.id] || ''}
                  onChange={(e) => handleReservationChange(bike.id, e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select Reservation</em>
                  </MenuItem>
                  {reservations.map((reservation) => (
                    <MenuItem key={reservation.id} value={reservation.id}>
                      {`Reservation ID: ${reservation.id} (Guest: ${guests[reservation.guestId] || 'Loading...'})`}
                    </MenuItem>
                  ))}
                </Select>
                <Button onClick={() => handleAddBikeToReservation(bike.id)}>Add</Button>
              </TableCell>
              <TableCell>
                {bike.bikeRentals.length > 0 && bike.bikeRentals.map((rental) => (
                  <Button key={rental.reservationId} onClick={() => handleRemoveBikeFromReservation(rental.reservationId, bike.id)}>Remove</Button>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BikePage;
