import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Modal, Box, TextField, Grid } from '@mui/material';
import axios from 'axios'; 
import { getCookieValue } from 'src/utils/cookie';
import { Onrun } from 'src/api/OnRun';
import PropTypes from 'prop-types';

const CreateCompany = ({setOpenModal,openModal, GetTableData}) => {
  const [companyName, setCompanyName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyTelephone, setCompanyTelephone] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companySymbol, setCompanySymbol] = useState('');
  const [registerCapital, setRegisterCapital] = useState('');


  const handleCloseModal = () => {
    setOpenModal(false)
  };
  

  const headerStyle = {
    bgcolor: 'rgba(0, 123, 255, 0.1)',
    color: 'primary.main',
    p: 2,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    mb: 3,
    textAlign: 'center',
  };

  const handleAddCompany = async () => {
    const token = getCookieValue('UID');
    try {
      const data = {
        name: companyName,
        national_id: nationalId,
        address: companyAddress,
        telephone: companyTelephone,
        registration_number: registrationNumber,
        website: companyWebsite,
        symbol: companySymbol,
        register_capital: registerCapital,
      };
      const api = `${Onrun}/api/company/`; 
      const response = await axios.post(api, data, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      GetTableData();
      handleCloseModal(); 
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error:', error.response.data);
      } else {
        console.error('ErrorMessage:', error.message);
      }
    }
  };  

  return (
    <Container>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography sx={headerStyle} variant="h6" gutterBottom>
            ایجاد شرکت جدید
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="نام شرکت"
                fullWidth
                margin="normal"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="شناسه ملی"
                fullWidth
                margin="normal"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="تلفن"
                fullWidth
                margin="normal"
                value={companyTelephone}
                onChange={(e) => setCompanyTelephone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="شماره ثبت"
                fullWidth
                margin="normal"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="وبسایت"
                fullWidth
                margin="normal"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="نماد"
                fullWidth
                margin="normal"
                value={companySymbol}
                onChange={(e) => setCompanySymbol(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ثبت سرمایه"
                fullWidth
                margin="normal"
                value={registerCapital}
                onChange={(e) => setRegisterCapital(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="آدرس"
                fullWidth
                margin="normal"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleAddCompany} sx={{ mt: 2 }}>
            افزودن
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

CreateCompany.propTypes = {
  setOpenModal: PropTypes.func,
  openModal:PropTypes.bool,
  GetTableData:PropTypes.func
};
export default CreateCompany;