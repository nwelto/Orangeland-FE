// ReservationForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid,
} from '@mui/material';
import { useRouter } from 'next/router';
import { createReservation } from '../../API/ReservationData';
import { getAllGuests } from '../../API/GuestData';
import { getAllRVSites } from '../../API/RVSiteData';
import { useAuth } from '../../utils/context/authContext';

const ReservationForm = ({ onSave }) => {
  const { user } = useAuth(); // Get the current user from the auth context
  const router = useRouter(); // Initialize the router
  const [reservation, setReservation] = useState({
    siteId: '',
    startDate: '',
    endDate: '',
    numberOfGuests: '',
    numberOfDogs: '',
    status: 0,
    guestId: '',
    userId: user ? user.id : '', // Set userId from the current user
  });
  const [guests, setGuests] = useState([]);
  const [rvSites, setRVSites] = useState([]);

  useEffect(() => {
    getAllGuests()
      .then((data) => {
        console.warn('Fetched guests:', data);
        setGuests(data);
      })
      .catch((error) => console.error('Error fetching guests:', error));

    getAllRVSites()
      .then((data) => {
        console.warn('Fetched RV sites:', data);
        setRVSites(data);
      })
      .catch((error) => console.error('Error fetching RV sites:', error));
  }, []);

  useEffect(() => {
    // Update userId whenever user changes
    if (user) {
      setReservation((prev) => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.warn('Updated reservation state:', { ...reservation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn('Submitting reservation:', reservation);

    if (!reservation.siteId || !reservation.guestId || !reservation.startDate || !reservation.endDate || !reservation.userId) {
      console.error('Missing required fields');
      return;
    }

    createReservation(reservation)
      .then(() => {
        console.warn('Reservation created successfully');
        onSave();
        router.push('/reservations/reservationPage'); // Navigate to the new route
      })
      .catch((error) => console.error('Error creating reservation:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Guest</InputLabel>
            <Select
              name="guestId"
              value={reservation.guestId}
              onChange={handleChange}
              required
            >
              {guests.map((guest) => (
                <MenuItem key={guest.guestId} value={guest.guestId}>
                  {guest.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>RV Site</InputLabel>
            <Select
              name="siteId"
              value={reservation.siteId}
              onChange={handleChange}
              required
            >
              {rvSites.map((site) => (
                <MenuItem key={site.siteId} value={site.siteId}>
                  {site.siteNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            value={reservation.startDate}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            value={reservation.endDate}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="numberOfGuests"
            label="Number of Guests"
            type="number"
            value={reservation.numberOfGuests}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="numberOfDogs"
            label="Number of Dogs"
            type="number"
            value={reservation.numberOfDogs}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={reservation.status}
              onChange={handleChange}
              required
            >
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Confirmed</MenuItem>
              <MenuItem value={2}>Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Reservation
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ReservationForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ReservationForm;
