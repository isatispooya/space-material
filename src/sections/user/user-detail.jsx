/* eslint-disable no-nested-ternary */
import { Avatar, Box, Button, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';

const UserDetail = ({ viewModalData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 900,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    maxHeight: '150vh',
    overflowY: 'auto',
  };

  useEffect(() => {
    if (viewModalData) {
      setIsOpen(true);
    }
  }, [viewModalData]);

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-view-title"
      aria-describedby="modal-view-description"
    >
      <Box sx={style}>
        <IconButton color="secondary">
          <CancelIcon sx={{ fontSize: 30, marginTop: '-25px', marginLeft: '-20px' }} onClick={() => setIsOpen(false)} />
        </IconButton>
        {viewModalData && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Avatar alt={viewModalData.username} src="/static/images/avatar/3.jpg" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                sx={{ marginLeft: '-380px' }}
                id="standard-disabled"
                label="نام کاربری"
                defaultValue={viewModalData.username}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="نام "
                defaultValue={viewModalData.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="نام خانوادگی "
                defaultValue={viewModalData.last_name ? viewModalData.last_name : '_'}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="کدملی"
                defaultValue={viewModalData.national_code}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="محل صدور"
                defaultValue={viewModalData.issue}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="تاریخ تولد"
                defaultValue={viewModalData.date_birth}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="شماره موبایل"
                defaultValue={viewModalData.mobile}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="تلفن"
                defaultValue={viewModalData.phone}
              />
            </Grid>

            {viewModalData.gender && (
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="جنسیت"
                  defaultValue={
                    viewModalData.gender === 'F'
                      ? 'زن'
                      : viewModalData.gender === 'M'
                      ? 'مرد'
                      : 'نامشخص'
                  }
                />
              </Grid>
            )}

            {viewModalData.marited !== undefined && (
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="وضعیت تاهل"
                  defaultValue={viewModalData.marited ? 'متاهل' : 'مجرد'}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="شماره کارت"
                defaultValue={viewModalData.card_number_bank}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                id="outlined-disabled"
                label="شماره شبا"
                defaultValue={viewModalData.shaba_bank}
              />
            </Grid>

            {viewModalData.status !== undefined && (
              <Grid item xs={12} sm={3}>
                <Button variant="contained" color="success">
                  {viewModalData.status ? 'فعال' : 'غیر فعال'}
                </Button>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="outlined-disabled"
                label="ایمیل"
                defaultValue={viewModalData.email}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                disabled
                id="outlined-disabled"
                label="آدرس"
                defaultValue={viewModalData.address}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

UserDetail.propTypes = {
  viewModalData: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    national_code: PropTypes.string,
    issue: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    phone: PropTypes.string,
    card_number_bank: PropTypes.string,
    shaba_bank: PropTypes.string,
    date_birth: PropTypes.string,
    gender: PropTypes.string,
    marited: PropTypes.bool,
    status: PropTypes.bool,
    address: PropTypes.string,
  }),
};

export default UserDetail;
