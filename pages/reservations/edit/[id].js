import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getReservationById } from '../../../API/ReservationData';
import ReservationForm from '../../../components/forms/ReservationForm';

export default function EditReservationPage() {
  const [editReservation, setEditReservation] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getReservationById(id).then(setEditReservation);
    }
  }, [id]);

  return (<ReservationForm existingReservation={editReservation} onSave={() => router.push('/reservations/reservationPage')} />);
}
