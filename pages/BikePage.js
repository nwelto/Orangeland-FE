import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, MenuItem, Select, Button, Box,
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
    getAllBikes()
      .then(setBikes)
      .catch();

    getAllReservations()
      .then((data) => {
        setReservations(data);
        data.forEach((reservation) => {
          getGuestById(reservation.guestId)
            .then((guest) => {
              setGuests((prev) => ({ ...prev, [reservation.guestId]: guest.name }));
            })
            .catch();
        });
      })
      .catch();
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
        .catch();
    }
  };

  const handleRemoveBikeFromReservation = (reservationId, bikeId) => {
    removeBikeFromReservation(reservationId, bikeId)
      .then(() => {
        fetchBikesAndReservations();
      })
      .catch();
  };

  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Bikes
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 1, marginBottom: 3, boxShadow: 3, border: '1px solid #000',
        }}
      >
        <Table aria-label="bikes table">
          <TableHead sx={{ backgroundColor: '#33658A', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Bike ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Rental Fee</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Available</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Reservations</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Add to Reservation</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Remove from Reservation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikes.map((bike, index) => (
              <TableRow key={bike.id} sx={{ backgroundColor: index % 2 === 0 ? '#008080' : '#33658A', color: 'white' }}>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{bike.id}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{bike.type}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{bike.rentalFee}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{bike.isAvailable ? 'Yes' : 'No'}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>
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
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Select
                      value={selectedReservations[bike.id] || ''}
                      onChange={(e) => handleReservationChange(bike.id, e.target.value)}
                      sx={{
                        backgroundColor: '#33658A',
                        color: 'white',
                        '& .MuiSelect-icon': {
                          color: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'green',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'white',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Reservation</em>
                      </MenuItem>
                      {reservations.map((reservation) => (
                        <MenuItem key={reservation.id} value={reservation.id} sx={{ backgroundColor: '#33658A', color: 'white', '&:hover': { backgroundColor: 'green' } }}>
                          {`Reservation ID: ${reservation.id} (Guest: ${guests[reservation.guestId] || 'Loading...'})`}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button variant="contained" color="primary" onClick={() => handleAddBikeToReservation(bike.id)}>Add</Button>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>
                  {bike.bikeRentals.length > 0 && bike.bikeRentals.map((rental) => (
                    <Button key={rental.reservationId} variant="contained" color="secondary" onClick={() => handleRemoveBikeFromReservation(rental.reservationId, bike.id)}>Remove</Button>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BikePage;
