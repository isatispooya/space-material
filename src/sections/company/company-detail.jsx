/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import { Box, Grid, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DetailCompany = ({ viewModalData }) => {
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
    color: 'secondary.main',
  };

  const valueStyle = {
    color: 'text.primary',
    fontWeight: 'bold',
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
            جزئیات شرکت
          </Typography>
        </Box>

        {viewModalData && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={valueStyle}>
                <span style={labelStyle}>نام شرکت:</span> {viewModalData.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={valueStyle}>
                <span style={labelStyle}>شناسه ملی:</span> {viewModalData.national_id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={valueStyle}>
                <span style={labelStyle}>تلفن:</span> {viewModalData.telephone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={valueStyle}>
                <span style={labelStyle}>شماره ثبت:</span> {viewModalData.registration_number}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={valueStyle}>
                <span style={labelStyle}>وبسایت:</span> {viewModalData.website}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={valueStyle}>
                <span style={labelStyle}>نماد:</span> {viewModalData.symbol}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={valueStyle}>
                <span style={labelStyle}>ثبت سرمایه:</span> {viewModalData.register_capital}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="body1" sx={valueStyle}>
                <span style={labelStyle}>آدرس:</span> {viewModalData.address}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

DetailCompany.propTypes = {
  viewModalData: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
  }),
};

export default DetailCompany;
