import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAuth } from '../utils/context/authContext';
import { getAllReservations } from '../API/ReservationData';
import { getAllUsers } from '../API/UserData';
import UserRow from '../components/UserRow';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    console.log('Current user:', user);
    if (user && user.isAdmin) {
      getAllUsers()
        .then((data) => {
          console.log('Fetched users:', data);
          setUsers(data);
        })
        .catch((error) => console.error(error));

      getAllReservations()
        .then((data) => {
          console.log('Fetched reservations:', data);
          setReservations(data);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  if (!user || !user.isAdmin) {
    return <Typography variant="h6">Access Denied</Typography>;
  }

  const getUserReservations = (userId) => reservations.filter((reservation) => reservation.userId === userId);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Reservations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((usr) => (
            <UserRow key={usr.userId} user={usr} reservations={getUserReservations(usr.userId)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminPage;
