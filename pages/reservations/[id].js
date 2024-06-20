import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, CircularProgress, Grid, MenuItem, Select, FormControl, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import {
  getReservationById, addBikeToReservation, removeBikeFromReservation, deleteReservationById,
} from '../../API/ReservationData';
import { getAllBikes } from '../../API/BikeData';
import { getUserById } from '../../API/UserData';
import { getGuestById } from '../../API/GuestData';
import { getRVSiteById } from '../../API/RVSiteData';

const ReservationById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newBikeId, setNewBikeId] = useState('');
  const [bikes, setBikes] = useState([]);
  const [userName, setUserName] = useState('');
  const [guestName, setGuestName] = useState('');
  const [siteNumber, setSiteNumber] = useState('');

  const fetchReservation = () => {
    setLoading(true);
    getReservationById(id)
      .then((response) => {
        setReservation(response);
        if (response.userId) {
          getUserById(response.userId)
            .then((user) => {
              setUserName(user.name);
            })
            .catch((error) => {
              console.error('Error fetching user data', error);
            });
        }
        if (response.guestId) {
          getGuestById(response.guestId)
            .then((guest) => {
              setGuestName(guest.name);
            })
            .catch((error) => {
              console.error('Error fetching guest data', error);
            });
        }
        if (response.siteId) {
          getRVSiteById(response.siteId)
            .then((site) => {
              setSiteNumber(site.siteNumber);
            })
            .catch((error) => {
              console.error('Error fetching site data', error);
            });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the reservation!', error);
        setLoading(false);
      });
  };

  const fetchBikes = () => {
    getAllBikes()
      .then((data) => {
        const availableBikes = data.filter((bike) => bike.isAvailable);
        setBikes(availableBikes);
      })
      .catch((error) => {
        console.error('There was an error fetching bikes!', error);
      });
  };

  useEffect(() => {
    if (id) {
      fetchReservation();
      fetchBikes();
    }
  }, [id]);

  const handleAddBike = () => {
    const bikeRental = {
      bikeId: parseInt(newBikeId, 10),
    };
    addBikeToReservation(id, bikeRental)
      .then(() => {
        fetchReservation();
        fetchBikes();
        setNewBikeId('');
      })
      .catch((error) => {
        console.error('Error adding bike to reservation:', error);
      });
  };

  const handleRemoveBike = (bikeId) => {
    removeBikeFromReservation(id, bikeId)
      .then(() => {
        fetchReservation();
        fetchBikes();
      })
      .catch((error) => {
        console.error('Error removing bike from reservation:', error);
      });
  };

  const handleEdit = () => {
    router.push(`/reservations/edit/${id}`);
  };

  const handleDelete = () => {
    deleteReservationById(id)
      .then(() => {
        router.push('/reservations/reservationPage');
      })
      .catch((error) => {
        console.error('Error deleting reservation:', error);
      });
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
      }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!reservation) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">Reservation not found.</Typography>
      </Box>
    );
  }

  const statusMap = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Closed',
  };

  return (
    <Box sx={{ padding: 2, position: 'relative' }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', paddingTop: 2,
        }}
      >Reservation Details
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <IconButton
          size="small"
          sx={{ backgroundColor: '#33658A', color: 'white', marginRight: 1 }}
          onClick={handleEdit}
        >
          <EditIcon sx={{ fontSize: 24 }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{ backgroundColor: '#8B0000', color: 'white' }}
          onClick={handleDelete}
        >
          <DeleteIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 1, marginBottom: 3, boxShadow: 3, border: '2px solid #000',
        }}
      >
        <Table aria-label="reservation details table">
          <TableHead sx={{ backgroundColor: '#33658A', color: 'white' }}>
            <TableRow>
              <TableCell sx={{
                fontWeight: 'bold', color: 'white', borderBottom: '2px solid #000', width: '20%',
              }}
              >Detail
              </TableCell>
              <TableCell sx={{
                fontWeight: 'bold', color: 'white', borderBottom: '2px solid #000', width: '80%',
              }}
              >Information
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ backgroundColor: '#008080', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{reservation.id}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#33658A', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>User</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{userName}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#008080', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>Guest</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{guestName}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#33658A', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>Site</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{siteNumber}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#008080', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>Start Date</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{reservation.startDate}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#33658A', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>End Date</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{reservation.endDate}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#008080', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>Number of Guests</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{reservation.numberOfGuests}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#33658A', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>Number of Dogs</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{reservation.numberOfDogs}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: '#008080', color: 'white' }}>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{statusMap[reservation.status]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" sx={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Bike Reservations</Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 1, marginBottom: 3, boxShadow: 3, border: '2px solid #000',
        }}
      >
        <Table aria-label="bike reservations table">
          <TableHead sx={{ backgroundColor: '#33658A', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: '2px solid #000' }}>Bike ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: '2px solid #000' }}>Rental Fee</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: '2px solid #000' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservation.bikeRentals.map((bikeRental, index) => (
              <TableRow key={bikeRental.bikeId} sx={{ backgroundColor: index % 2 === 0 ? '#008080' : '#33658A', color: 'white' }}>
                <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{bikeRental.bikeId}</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>{bikeRental.bike.rentalFee}</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '2px solid #000' }}>
                  <Button variant="contained" color="error" size="small" onClick={() => handleRemoveBike(bikeRental.bikeId)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginBottom: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold', fontSize: '1.5rem', color: 'black', marginBottom: '0.5rem',
          }}
        >Bike
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#33658A', borderRadius: 1 }}>
              <Select
                labelId="bike-select-label"
                id="bike-select"
                value={newBikeId}
                onChange={(e) => setNewBikeId(e.target.value)}
                sx={{
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
                {bikes.map((bike) => (
                  <MenuItem key={bike.id} value={bike.id} sx={{ backgroundColor: '#33658A', color: 'white', '&:hover': { backgroundColor: 'green' } }}>
                    {bike.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddBike}>
              Add Bike
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Button variant="contained" color="primary" onClick={() => router.back()} sx={{ marginTop: 3 }}>
        Back
      </Button>
    </Box>
  );
};

export default ReservationById;
