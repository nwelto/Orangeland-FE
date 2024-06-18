import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Paper, Typography,
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
    <Paper style={{ padding: '1em', marginTop: '1em' }}>
      <Typography variant="h6">{guestId ? 'Update Guest' : 'Create Guest'}</Typography>
      {formError && <Typography color="error">{formError}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="RV Type"
          value={rvType}
          onChange={(e) => setRvType(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {guestId ? 'Update Guest' : 'Create Guest'}
        </Button>
      </form>
    </Paper>
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
