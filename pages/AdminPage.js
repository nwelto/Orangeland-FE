import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box,
} from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import { getAllReservations } from '../API/ReservationData';
import { getAllUsers } from '../API/UserData';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.isAdmin) {
      getAllUsers()
        .then((data) => {
          setUsers(data);
        })
        .catch();

      getAllReservations()
        .then((data) => {
          setReservations(data);
        })
        .catch();
    }
  }, [user]);

  if (!user || !user.isAdmin) {
    return <Typography variant="h6">Access Denied</Typography>;
  }

  const getUserReservations = (userId) => reservations.filter((reservation) => reservation.userId === userId);

  return (
    <Box sx={{ padding: 2, marginTop: '1rem' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Admin
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 1, marginBottom: 3, boxShadow: 3, border: '1px solid #000',
        }}
      >
        <Table aria-label="users table">
          <TableHead sx={{ backgroundColor: '#33658A', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Reservations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((usr, index) => (
              <TableRow key={usr.userId} sx={{ backgroundColor: index % 2 === 0 ? '#008080' : '#33658A', color: 'white' }}>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{usr.name}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{usr.email}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{getUserReservations(usr.userId).map((res) => `ID: ${res.id}`).join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPage;
