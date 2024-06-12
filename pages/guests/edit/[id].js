import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getGuestById } from '../../../API/GuestData';
import GuestForm from '../../../components/forms/GuestForm';

export default function EditGuestPage() {
  const [editGuest, setEditGuest] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getGuestById(id).then(setEditGuest);
    }
  }, [id]);

  return (<GuestForm guestId={id} existingGuest={editGuest} onSave={() => router.push('/guests/guestPage')} />);
}
