import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Grid, Box, FormControl,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createGuest, updateGuest, getGuestById } from '../../API/GuestData';

const GuestForm = ({ guestId, existingGuest, onFormSubmit }) => {
  const [name, setName] = useState('');
  const [rvType, setRvType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (guestId) {
      getGuestById(guestId)
        .then((guest) => {
          setName(guest.name);
          setRvType(guest.rvType);
          setPhoneNumber(guest.phoneNumber);
          setEmail(guest.email);
        })
        .catch();
    } else if (existingGuest) {
      setName(existingGuest.name);
      setRvType(existingGuest.rvType);
      setPhoneNumber(existingGuest.phoneNumber);
      setEmail(existingGuest.email);
    }
  }, [guestId, existingGuest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGuest = {
      name, rvType, phoneNumber, email,
    };

    if (guestId) {
      updateGuest(guestId, newGuest)
        .then(() => {
          if (onFormSubmit) {
            onFormSubmit();
          }
          router.push('/guests/guestPage');
        })
        .catch(() => {
          setFormError('Error updating guest');
        });
    } else {
      createGuest(newGuest)
        .then(() => {
          if (onFormSubmit) {
            onFormSubmit();
          }
          router.push('/guests/guestPage');
        })
        .catch(() => {
          setFormError('Error creating guest');
        });
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: 2 }}>
        {guestId ? 'Update Guest' : 'Create Guest'}
      </Typography>
      {formError && <Typography color="error">{formError}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>Name</Typography>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>RV Type</Typography>
              <TextField
                value={rvType}
                onChange={(e) => setRvType(e.target.value)}
                required
                fullWidth
                margin="normal"
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>Phone Number</Typography>
              <TextField
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                fullWidth
                margin="normal"
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'black' }}>Email</Typography>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {guestId ? 'Update Guest' : 'Create Guest'}
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button variant="contained" color="secondary" fullWidth onClick={() => router.back()}>
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

GuestForm.propTypes = {
  guestId: PropTypes.number,
  existingGuest: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rvType: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
  }),
  onFormSubmit: PropTypes.func,
};

GuestForm.defaultProps = {
  guestId: null,
  existingGuest: null,
  onFormSubmit: () => {},
};

export default GuestForm;
