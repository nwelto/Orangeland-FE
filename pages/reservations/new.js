import React from 'react';
import ReservationForm from '../../components/forms/ReservationForm';

const NewReservationPage = () => {
  const handleSave = () => {
    console.log('Reservation saved');
    // Perform any additional actions after saving the reservation
  };

  return (
    <div>
      <h1>Create a New Reservation</h1>
      <ReservationForm onSave={handleSave} />
    </div>
  );
};

export default NewReservationPage;
