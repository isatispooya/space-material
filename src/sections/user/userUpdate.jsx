/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import axios from 'axios';
import { getCookieValue } from 'src/utils/cookie';
import { Onrun } from 'src/api/OnRun';

const UserUpdate = ({ updateModalData ,setUpdateModalData}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [checked, setChecked] = useState(false);

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


  useEffect(() => {
    if (updateModalData) {
      setIsOpen(true);
      }
    console.log(1);
  }, [updateModalData]);



  console.log(isOpen);

  const handleChange = (event) => {
    setUpdateModalData({ ...updateModalData, is_person: event.target.value === 'true' });
  };

  const handleGender = (event) => {
    setUpdateModalData({ ...updateModalData, gender: event.target.value });
  };

  const handleMarital = (event) => {
    setUpdateModalData({ ...updateModalData, marited: event.target.value === 'true' });
  };

  const handelswitch = (event) => {
    setChecked(event.target.checked);
  };

  const handelDate = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    setUpdateModalData({ ...updateModalData, date_birth: formattedDate });
  };

  const handleSave = async () => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.put(`${Onrun}/api/user/${updateModalData.id}/`, updateModalData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Edited:', response.data);

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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ویرایش کاربر
        </Typography>

        {updateModalData && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={updateModalData.is_person ? 'true' : 'false'}
                  onChange={handleChange}
                >
                  <FormControlLabel value="true" control={<Radio />} label="حقیقی" />
                  <FormControlLabel value="false" control={<Radio />} label="حقوقی" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {updateModalData.is_person ? (
              <>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="نام کاربری"
                    fullWidth
                    margin="normal"
                    name="userName"
                    value={updateModalData.username || ''}
                    onChange={(e) => setUpdateModalData({ ...updateModalData, username: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="نام کاربر"
                    fullWidth
                    margin="normal"
                    name="firstName"
                    value={updateModalData.first_name || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, first_name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="نام خانوادگی کاربر"
                    fullWidth
                    margin="normal"
                    name="lastName"
                    value={updateModalData.last_name || ''}
                    onChange={(e) => setUpdateModalData({ ...updateModalData, last_name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="کدملی"
                    fullWidth
                    margin="normal"
                    name="nationalCode"
                    value={updateModalData.national_code || ''}
                    required
                    onChange={(e) =>
                      setUpdateModalData({ ...updateModalData, national_code: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="محل صدور"
                    fullWidth
                    margin="normal"
                    name="issues"
                    value={updateModalData.issue || ''}
                    onChange={(e) => setUpdateModalData({ ...updateModalData, issue: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="ایمیل"
                    fullWidth
                    margin="normal"
                    name="emailAddres"
                    value={updateModalData.email || ''}
                    onChange={(e) => setUpdateModalData({ ...updateModalData, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره همراه"
                    fullWidth
                    margin="normal"
                    name="mobile1"
                    value={updateModalData.mobile || ''}
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, mobile: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="تلفن"
                    fullWidth
                    margin="normal"
                    name="phoneNumber"
                    value={updateModalData.phone || ''}
                    onChange={(e) => setUpdateModalData({ ...updateModalData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="رمزعبور"
                    fullWidth
                    margin="normal"
                    name="password1"
                    required
                    onChange={(e) => setUpdateModalData({ ...updateModalData, password: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره کارت"
                    fullWidth
                    margin="normal"
                    name="cardNumberBank"
                    value={updateModalData.cardNumberBank || ''}
                    onChange={(e) =>
                      setUpdateModalData({ ...updateModalData, cardNumberBank: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره شبا"
                    fullWidth
                    margin="normal"
                    name="shabaBank"
                    value={updateModalData.shabaBank || ''}
                    onChange={(e) => setUpdateModalData({ ...updateModalData, shabaBank: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div style={{ marginBottom: '16px' }}>
                    <DatePicker
                      name="dateBirth"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      placeholder="تاریخ تولد"
                      style={{ width: '100%' }}
                      onChange={handelDate}
                      value={updateModalData.date_birth || ''}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={updateModalData.gender || ''}
                      onChange={handleGender}
                    >
                      <FormControlLabel value="F" control={<Radio />} label="زن" />
                      <FormControlLabel value="M" control={<Radio />} label="مرد" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={updateModalData.gender}
                    onChange={handleGender}
                  >
                    <FormControlLabel value="F" control={<Radio />} label="زن" />
                    <FormControlLabel value="M" control={<Radio />} label="مرد" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={updateModalData.marited}
                    onChange={handleMarital}
                  >
                    <FormControlLabel value={false} control={<Radio />} label="مجرد" />
                    <FormControlLabel value control={<Radio />} label="متاهل" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    label="وضعیت"
                    control={
                      <Switch
                        name="status"
                        checked={checked}
                        onChange={handelswitch}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                  />
                </Grid>
              <Grid item xs={12} sm={12}>
                  <TextField
                    label="آدرس"
                    fullWidth
                    margin="normal"
                    name="address"
                    value={updateModalData.address || ''}
                    onChange={(e) => setUpdateModalData({ ...updateModalData, address: e.target.value })}
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="نام کاربری"
                      fullWidth
                      margin="normal"
                      name="userName"
                      value={updateModalData.username || ''}
                      onChange={(e) => setUpdateModalData({ ...updateModalData, username: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="نام شرکت"
                      fullWidth
                      margin="normal"
                      name="firstName"
                      value={updateModalData.first_name || ''}
                      onChange={(e) =>
                        setUpdateModalData({ ...updateModalData, first_name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="شناسه ملی"
                      fullWidth
                      margin="normal"
                      name="nationalCode"
                      value={updateModalData.national_code || ''}
                      required
                      onChange={(e) =>
                        setUpdateModalData({ ...updateModalData, national_code: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="محل ثبت"
                      fullWidth
                      margin="normal"
                      name="issues"
                      value={updateModalData.issue || ''}
                      onChange={(e) => setUpdateModalData({ ...updateModalData, issue: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="ایمیل"
                      fullWidth
                      margin="normal"
                      name="emailAddres"
                      value={updateModalData.email || ''}
                      onChange={(e) => setUpdateModalData({ ...updateModalData, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="شماره همراه"
                      fullWidth
                      margin="normal"
                      name="mobile1"
                      value={updateModalData.mobile || ''}
                      required
                      onChange={(e) => setUpdateModalData({ ...updateModalData, mobile: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="تلفن"
                      fullWidth
                      margin="normal"
                      name="phoneNumber"
                      value={updateModalData.phone || ''}
                      onChange={(e) => setUpdateModalData({ ...updateModalData, phone: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="رمزعبور"
                      fullWidth
                      margin="normal"
                      name="password1"
                      required
                      onChange={(e) =>
                        setUpdateModalData({ ...updateModalData, password: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="شماره کارت"
                      fullWidth
                      margin="normal"
                      name="cardNumberBank"
                      value={updateModalData.cardNumberBank || ''}
                      onChange={(e) =>
                        setUpdateModalData({ ...updateModalData, cardNumberBank: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="شماره شبا"
                      fullWidth
                      margin="normal"
                      name="shabaBank"
                      value={updateModalData.shabaBank || ''}
                      onChange={(e) =>
                        setUpdateModalData({ ...updateModalData, shabaBank: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ marginBottom: '16px' }}>
                      <DatePicker
                        name="dateBirth"
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        placeholder="تاریخ تولد"
                        style={{ width: '100%' }}
                        onChange={handelDate}
                        value={updateModalData.date_birth || ''}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={updateModalData.gender || ''}
                        onChange={handleGender}
                      >
                        <FormControlLabel value="F" control={<Radio />} label="زن" />
                        <FormControlLabel value="M" control={<Radio />} label="مرد" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={updateModalData.marited ? 'true' : 'false'}
                        onChange={handleMarital}
                      >
                        <FormControlLabel value="false" control={<Radio />} label="مجرد" />
                        <FormControlLabel value="true" control={<Radio />} label="متاهل" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      label="وضعیت"
                      control={
                        <Switch
                          name="status"
                          checked={checked}
                          onChange={handelswitch}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="آدرس"
                      fullWidth
                      margin="normal"
                      name="address"
                      value={updateModalData.address || ''}
                      onChange={(e) =>
                        setUpdateModalData({ ...updateModalData, address: e.target.value })
                      }
                    />
                  </Grid>
                </>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button
                  onClick={() => setIsOpen(false)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                  variant="contained"
                >
                  لغو
                </Button>
                <Button
                  onClick={handleSave}
                  style={{ backgroundColor: 'green', color: 'white', marginLeft: '8px' }}
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
UserUpdate.propTypes = {
  updateModalData: PropTypes.object,
};

export default UserUpdate;