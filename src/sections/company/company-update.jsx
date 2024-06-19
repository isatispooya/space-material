/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCookieValue } from 'src/utils/cookie';
import { Onrun } from 'src/api/OnRun';

const UpdateCompany = ({ updateModalData ,setUpdateModalData,GetTableData}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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


  useEffect(() => {
    if (updateModalData) {
      setIsOpen(true);
      }
  }, [updateModalData]);



  const handleSave = async () => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.put(`${Onrun}/api/company/${updateModalData.id}/`, updateModalData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      GetTableData()
      
      console.log(response);
      setIsOpen(false);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error details:', error.response);
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-view-title"
      aria-describedby="modal-view-description"
    >
      <Box sx={style}>
        <Typography sx={headerStyle} id="modal-modal-title" variant="h6" component="h2">
          ویرایش شرکت
        </Typography>

        {updateModalData && (
          <Grid container spacing={2}>
             
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="نام شرکت"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={updateModalData.name || ''}
                    onChange={(e) => setUpdateModalData({ ...updateModalData,name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="شناسه ملی"
                    fullWidth
                    margin="normal"
                    name="nationalId"
                    value={updateModalData.national_id || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, national_id: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="تلفن"
                    fullWidth
                    margin="normal"
                    name="companyTelephone"
                    value={updateModalData.telephone || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, telephone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="شماره ثبت"
                    fullWidth
                    margin="normal"
                    name="registrationNumber"
                    value={updateModalData.registration_number || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, registration_number: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="وبسایت"
                    fullWidth
                    margin="normal"
                    name="companyWebsite"
                    value={updateModalData.website || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, website: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="نماد"
                    fullWidth
                    margin="normal"
                    name="companySymbol"
                    value={updateModalData.symbol || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, symbol: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="ثبت سرمایه"
                    fullWidth
                    margin="normal"
                    name="registerCapital"
                    value={updateModalData.register_capital || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, register_capital: e.target.value })}
                  />
                </Grid>



                <Grid item xs={12} sm={12}>
                  <TextField
                    label="آدرس"
                    fullWidth
                    margin="normal"
                    name="companyAddress"
                    value={updateModalData.address || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, address: e.target.value })}
                  />
                </Grid>
               
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' ,marginRight:'20px' }}>
                <Button
                  onClick={() => setIsOpen(false)}
                  style={{ backgroundColor: '#bdbdbd', color: 'white'}}
                  variant="contained"
                >
                  لغو
                </Button>
                <Button
                  onClick={handleSave}
                  style={{ backgroundColor: '#29b6f6', color: 'white', marginLeft: '8px' }}
                  variant="contained"
                >
                  ذخیره
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};
UpdateCompany.propTypes = {
  updateModalData: PropTypes.object,
};

export default UpdateCompany;