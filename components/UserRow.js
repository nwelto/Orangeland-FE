import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const UserRow = ({ user, reservations }) => (
  <TableRow key={user.userId}>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
    <TableCell>
      {reservations.map((reservation) => (
        <div key={reservation.id}>
          {`Reservation ID: ${reservation.id}, Start: ${reservation.startDate}, End: ${reservation.endDate}`}
        </div>
      ))}
    </TableCell>
  </TableRow>
);

UserRow.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default UserRow;
