import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Typography,
  Modal,
  Box,
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { Onrun } from 'src/api/OnRun';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';

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

export default function CustomerUpdate({
  updateModalData,
  setUpdateModalData,
  open,
  setOpen,
  GetTableData,
}) {
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (updateModalData) {
      setIsOpen(true);
      fetchData();
    }
  }, [updateModalData]);

  const fetchData = async () => {
    try {
      const token = getCookieValue('UID');

      const usersResponse = await axios.get(`${Onrun}/api/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(usersResponse.data);

      const companiesResponse = await axios.get(`${Onrun}/api/company/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies(companiesResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.put(
        `${Onrun}/api/customer/${updateModalData.id}/`,
        updateModalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      GetTableData();
      setIsOpen(false);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error details:', error.response);
      }
    }
  };
  return (
    <Container>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            ویرایش مشتری
          </Typography>
          {updateModalData && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    options={users}
                    getOptionLabel={(user) => user.username || ''}
                    value={users.find((user) => user.id === updateModalData.user) || null}
                    onChange={(e, newValue) => {
                      setUpdateModalData({
                        ...updateModalData,
                        user: newValue ? newValue.id : null,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} label="نام کاربر" />}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    options={companies}
                    getOptionLabel={(company) => company.name || ''}
                    value={
                      companies.find((company) => company.id === updateModalData.company) || null
                    }
                    onChange={(e, newValue) => {
                      setUpdateModalData({
                        ...updateModalData,
                        company: newValue ? newValue.id : null,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} label="نام شرکت" />}
                  />
                </Grid>
              </Grid>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => setIsOpen(false)}
                  style={{ backgroundColor: '#bdbdbd', color: 'white' }}
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
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

CustomerUpdate.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  updateModalData: PropTypes.object,
  GetTableData: PropTypes.func,
  setUpdateModalData: PropTypes.func,
};
