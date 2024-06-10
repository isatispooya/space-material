/* eslint-disable eqeqeq */

// import {useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import TableComponent from '../productTable';



// ----------------------------------------------------------------------

export default function UserPage() {



  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">امور مشتریان</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          کاربر جدید
        </Button>
      </Stack>

      <Card>
        <TableComponent/>
      </Card>
    </Container>
  );
}
