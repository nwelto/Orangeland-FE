import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, MenuItem, Select, Typography, FormControl, Grid, Box,
} from '@mui/material';
import { useRouter } from 'next/router';
import { createReservation, updateReservation } from '../../API/ReservationData';
import { getAllGuests } from '../../API/GuestData';
import { getAllRVSites } from '../../API/RVSiteData';
import { useAuth } from '../../utils/context/authContext';

const ReservationForm = ({ onSave, existingReservation }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [reservation, setReservation] = useState({
    siteId: '',
    startDate: '',
    endDate: '',
    numberOfGuests: '',
    numberOfDogs: '',
    status: 0,
    guestId: '',
    userId: user ? user.id : '',
  });
  const [guests, setGuests] = useState([]);
  const [rvSites, setRVSites] = useState([]);
  const [conflict, setConflict] = useState(null);

  useEffect(() => {
    getAllGuests()
      .then((data) => {
        setGuests(data);
      });

    getAllRVSites()
      .then((data) => {
        setRVSites(data);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setReservation((prev) => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (existingReservation) {
      setReservation((prev) => ({
        ...prev,
        ...existingReservation,
        userId: existingReservation.userId ?? user.id,
      }));
    }
  }, [existingReservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reservation.siteId || !reservation.guestId || !reservation.startDate || !reservation.endDate || !reservation.userId) {
      return;
    }

    const payload = {
      ...reservation,
      userId: reservation.userId,
      siteId: parseInt(reservation.siteId, 10),
      guestId: parseInt(reservation.guestId, 10),
      numberOfGuests: parseInt(reservation.numberOfGuests, 10),
      numberOfDogs: parseInt(reservation.numberOfDogs, 10),
    };

    try {
      if (existingReservation && existingReservation.id) {
        await updateReservation(existingReservation.id, payload);
      } else {
        await createReservation(payload);
      }
      onSave();
      router.back();
    } catch (error) {
      if (error.message.includes('Conflict')) {
        setConflict('Reservation conflict detected.');
      } else {
        setConflict('That Date is not available for that Site.');
      }
    }
  };

  const handleStatusChange = (status) => {
    setReservation((prev) => ({
      ...prev,
      status,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {conflict && (
          <Grid item xs={12}>
            <Typography variant="body1" color="error">
              {conflict}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Guest</Typography>
            <Select
              name="guestId"
              value={reservation.guestId}
              onChange={handleChange}
              required
              style={{ backgroundColor: 'white' }}
            >
              {guests.map((guest) => (
                <MenuItem key={guest.guestId} value={guest.guestId}>
                  {guest.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>RV Site</Typography>
            <Select
              name="siteId"
              value={reservation.siteId}
              onChange={handleChange}
              required
              style={{ backgroundColor: 'white' }}
            >
              {rvSites.map((site) => (
                <MenuItem key={site.siteId} value={site.siteId}>
                  {site.siteNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Start Date</Typography>
          <TextField
            name="startDate"
            type="date"
            value={reservation.startDate}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>End Date</Typography>
          <TextField
            name="endDate"
            type="date"
            value={reservation.endDate}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Number of Guests</Typography>
          <TextField
            name="numberOfGuests"
            type="number"
            value={reservation.numberOfGuests}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Number of Dogs</Typography>
          <TextField
            name="numberOfDogs"
            type="number"
            value={reservation.numberOfDogs}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleStatusChange(0)}
              sx={{
                backgroundColor: reservation.status === 0 ? 'black' : '#008080',
                color: 'white',
                width: '32%',
              }}
            >
              Pending
            </Button>
            <Button
              variant="contained"
              onClick={() => handleStatusChange(1)}
              sx={{
                backgroundColor: reservation.status === 1 ? 'black' : '#008080',
                color: 'white',
                width: '32%',
              }}
            >
              Confirmed
            </Button>
            <Button
              variant="contained"
              onClick={() => handleStatusChange(2)}
              sx={{
                backgroundColor: reservation.status === 2 ? 'black' : '#008080',
                color: 'white',
                width: '32%',
              }}
            >
              Closed
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Reservation
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" fullWidth onClick={() => router.back()}>
            Back
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ReservationForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  existingReservation: PropTypes.shape({
    id: PropTypes.number,
    siteId: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    numberOfGuests: PropTypes.number,
    numberOfDogs: PropTypes.number,
    status: PropTypes.number,
    guestId: PropTypes.number,
    userId: PropTypes.number,
  }),
};

ReservationForm.defaultProps = {
  existingReservation: null,
};

export default ReservationForm;
