import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box,
} from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import { getAllRVSites } from '../API/RVSiteData';

const RVSitePage = () => {
  const { user } = useAuth();
  const [rvSites, setRVSites] = useState([]);

  useEffect(() => {
    if (user && user.isAdmin) {
      getAllRVSites()
        .then(setRVSites)
        .catch();
    }
  }, [user]);

  if (!user || !user.isAdmin) {
    return <Typography variant="h6">Access Denied</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', marginBottom: '1rem' }}>RV Sites</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table aria-label="rv sites table">
          <TableHead sx={{ backgroundColor: '#33658A', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Site ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Site Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Has Grassy Area</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '2px solid #000' }}>Is Pull-Through</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rvSites.map((site, index) => (
              <TableRow key={site.siteId} sx={{ backgroundColor: index % 2 === 0 ? '#008080' : '#33658A', color: 'white' }}>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{site.siteId}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{site.siteNumber}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{site.hasGrassyArea ? 'Yes' : 'No'}</TableCell>
                <TableCell sx={{ color: 'white', border: '2px solid #000' }}>{site.isPullThrough ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RVSitePage;
