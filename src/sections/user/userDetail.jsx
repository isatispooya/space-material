/* eslint-disable no-nested-ternary */
import { Box, Grid, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';

const UserDetail = ({ viewModalData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
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

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: 1,
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
        <Box sx={headerStyle}>
          <Typography id="modal-view-title" variant="h6" component="h2">
            جزئیات کاربر
          </Typography>
        </Box>

        {viewModalData && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>نام کاربری:</span> {viewModalData.username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>نام:</span> {viewModalData.first_name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>نام خانوادگی:</span> {viewModalData.last_name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>کد ملی:</span> {viewModalData.national_code}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>محل صدور:</span> {viewModalData.issue}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Divider variant="middle" />
              </Grid>
              <Divider variant="middle" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>ایمیل:</span> {viewModalData.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>شماره موبایل:</span> {viewModalData.mobile}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>تلفن:</span> {viewModalData.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>شماره کارت:</span> {viewModalData.card_number_bank}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>شماره شبا:</span> {viewModalData.shaba_bank}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <span style={labelStyle}>تاریخ تولد:</span> {viewModalData.date_birth}
              </Typography>
            </Grid>
            {viewModalData.gender && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <span style={labelStyle}>جنسیت:</span>{' '}
                  {viewModalData.gender === 'F'
                    ? 'زن'
                    : viewModalData.gender === 'M'
                    ? 'مرد'
                    : 'نامشخص'}
                </Typography>
              </Grid>
            )}
            {viewModalData.marited !== undefined && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <span style={labelStyle}>وضعیت تاهل:</span>{' '}
                  {viewModalData.marited ? 'متاهل' : 'مجرد'}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>

            {viewModalData.status !== undefined && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <span style={labelStyle}>وضعیت:</span>{' '}
                  {viewModalData.status ? 'فعال' : 'غیر فعال'}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <span style={labelStyle}>آدرس:</span> {viewModalData.address}
              </Typography>
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
