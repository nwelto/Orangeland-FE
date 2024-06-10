import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
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
        .catch((error) => console.error('Error fetching RV sites:', error));
    }
  }, [user]);

  if (!user || !user.isAdmin) {
    return <Typography variant="h6">Access Denied</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="rv sites table">
        <TableHead>
          <TableRow>
            <TableCell>Site ID</TableCell>
            <TableCell>Site Number</TableCell>
            <TableCell>Has Grassy Area</TableCell>
            <TableCell>Is Pull-Through</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rvSites.map((site) => (
            <TableRow key={site.siteId}>
              <TableCell>{site.siteId}</TableCell>
              <TableCell>{site.siteNumber}</TableCell>
              <TableCell>{site.hasGrassyArea ? 'Yes' : 'No'}</TableCell>
              <TableCell>{site.isPullThrough ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RVSitePage;
