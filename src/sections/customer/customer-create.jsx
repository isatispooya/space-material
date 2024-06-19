import React, { useState, useEffect } from 'react';
import { Card, Stack, Button, Container, Typography, Modal, Box, FormControl, TextField, Grid, CircularProgress } from '@mui/material';
import Iconify from 'src/components/iconify';
import axios from 'axios';
import { Onrun } from 'src/api/OnRun';
import Autocomplete from '@mui/material/Autocomplete';
import TableComponent from './view/customerTable';
import { getCookieValue } from '../../utils/cookie';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// eslint-disable-next-line react/prop-types
function CustomModal({ open, handleClose }) {
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [takeStock, setTakeStock] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookieValue('UID');
        const [companiesResponse, usersResponse] = await Promise.all([
          axios.get(`${Onrun}/api/customer/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get(`${Onrun}/api/user/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]);
        setCompanies(companiesResponse.data);
        setUsers(usersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = getCookieValue('UID');
      const data = {
        user: selectedUser.id,
        company: selectedCompany.id,
      };
  
      const response = await axios.post(`${Onrun}/api/customer/`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      handleClose();
    } catch (error) {
      console.error('Error customer:', error);
    }
  };

  const checkUID = () => {
    const uid = getCookieValue('UID');
  };

  useEffect(() => {
    checkUID();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          افزودن مشتری جدید
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
              <Autocomplete
                options={users}
                getOptionLabel={(user) => `${user.username} ${user.national_code}`}
                value={selectedUser}
                onChange={(event, newValue) => setSelectedUser(newValue)}
                renderInput={(params) => <TextField {...params} label="نام کاربر" />}
                key={(user) => user.national_code}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                options={companies}
                getOptionLabel={(company) => company.name}
                value={selectedCompany}
                onChange={(event, newValue) => setSelectedCompany(newValue)}
                renderInput={(params) => <TextField {...params} label="نام شرکت" />}
                key={(company) => company.id}
              />
            </Grid>
            <TextField
              label="مقدار سهام"
              fullWidth
              margin="normal"
              name="shareValue"
              required
              value={takeStock}
              onChange={(event) => setTakeStock(event.target.value)}
            />
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleSubmit}>
              ثبت
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default function CustomerPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">امور مشتریان</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
          کاربر جدید
        </Button>
      </Stack>
      <Card>
        <TableComponent />
      </Card>
      <CustomModal open={open} handleClose={handleClose} />
    </Container>
  );
}
