/* eslint-disable eqeqeq */
import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Onrun } from 'src/api/OnRun';
import Iconify from 'src/components/iconify';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { getCookieValue } from '../../utils/cookie';
import TableComponent from './view/user-table';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [genderr, setGenderr] = useState('F');
  const [marited, setMarited] = useState(true);
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [issues, setIssues] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [password1, setPassword1] = useState();
  const [mobile1, setMobile1] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [Address, setAddress] = useState();
  const [dateBirth, setDatebirth] = useState();
  const [shabaBank, setShabaBank] = useState();
  const [cardNumberBank, setCardNumberBank] = useState();
  const [isPerson, setIsPerson] = useState(true);

  const handleOpen = () => setOpen(true);
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookieValue('UID');
      try {
        const response = await axios.get(`${Onrun}/api/customer/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleClose = async () => {
    try {
      const data = {
        username: userName,
        first_name: firstName,
        last_name: lastName,
        national_code: nationalCode,
        is_person: isPerson,
        issue: issues,
        status: checked,
        gender: genderr,
        marital: marited,
        email: emailAddress,
        password: password1,
        mobile: mobile1,
        phone: phoneNumber,
        address: Address,
        date_birth: dateBirth,
        card_number_bank: cardNumberBank,
        shaba_bank: shabaBank,
      };
      const api = `${Onrun}/api/user/`;
      const sendApiCode = await axios.post(api, data, {
        headers: {
          Authorization: `Bearer ${getCookieValue('UID')}`,
        },
      });
      console.log('DATA', api, sendApiCode, data);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
      } else {
        console.error('Error Message:', error.message);
      }
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setIsPerson(event.target.value === 'true');
  };
  const handleGender = (event) => {
    setGenderr(event.target.value);
  };
  const handelswitch = (event) => {
    setChecked(event.target.checked);
  };
  const handelDate = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    setDatebirth(formattedDate);
  };
  const handleMarital = (event) => {
    setMarited(event.target.value === 'true');
  };

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">کاربران</Typography>

        <Button
          onClick={handleOpen}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          کاربر جدید
        </Button>
      </Stack>

      <Card>
        <TableComponent />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography sx={headerStyle} id="modal-modal-title" variant="h6" component="h2">
            افزودن کاربر جدید
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="radio-buttons"
                   value={isPerson}                 
                  onChange={handleChange}
                >
                  <FormControlLabel  value control={<Radio />} label="حقیقی" />
                  <FormControlLabel  value={false} control={<Radio />} label="حقوقی" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {isPerson ? (
              <>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="نام کاربری"
                    fullWidth
                    margin="normal"
                    name="userName"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="نام کاربر"
                    fullWidth
                    margin="normal"
                    name="firstName"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="نام خانوادگی کاربر"
                    fullWidth
                    margin="normal"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="کدملی"
                    fullWidth
                    margin="normal"
                    name="nationalCode"
                    required
                    onChange={(e) => setNationalCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="محل صدور"
                    fullWidth
                    margin="normal"
                    name="issues"
                    onChange={(e) => setIssues(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="ایمیل"
                    fullWidth
                    margin="normal"
                    name="emailAddres"
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره همراه"
                    fullWidth
                    margin="normal"
                    name="mobile1"
                    required
                    onChange={(e) => setMobile1(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="تلفن"
                    fullWidth
                    margin="normal"
                    name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="رمزعبور"
                    fullWidth
                    margin="normal"
                    name="password1"
                    required
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره کارت بانکی"
                    fullWidth
                    margin="normal"
                    name="cardNumberBank"
                    onChange={(e) => setCardNumberBank(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره شبا"
                    fullWidth
                    margin="normal"
                    name="shabaBank"
                    onChange={(e) => setShabaBank(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div style={{ marginBottom: '16px' ,padding:"20px"}}>
                    <DatePicker
                      name="dateBirth"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      placeholder="تاریخ تولد"
                      style={{ width: '100%' }}
                      onChange={handelDate}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={genderr}
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
                      value={marited}
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
                <Grid item xs={12}>
                  <TextField
                    label="آدرس"
                    fullWidth
                    margin="normal"
                    name="Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="نام کاربری"
                    fullWidth
                    margin="normal"
                    name="userName"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="نام شرکت"
                    fullWidth
                    margin="normal"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شناسه ملی"
                    fullWidth
                    margin="normal"
                    name="nationalCode"
                    required
                    onChange={(e) => setNationalCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="محل ثبت"
                    fullWidth
                    margin="normal"
                    name="issues"
                    onChange={(e) => setIssues(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="ایمیل"
                    fullWidth
                    margin="normal"
                    name="emailAddres"
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره همراه"
                    fullWidth
                    margin="normal"
                    name="mobile1"
                    required
                    onChange={(e) => setMobile1(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="تلفن"
                    fullWidth
                    margin="normal"
                    name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="رمزعبور"
                    fullWidth
                    margin="normal"
                    name="password1"
                    required
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره کارت بانکی"
                    fullWidth
                    margin="normal"
                    name="cardNumberBank"
                    onChange={(e) => setCardNumberBank(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="شماره شبا"
                    fullWidth
                    margin="normal"
                    name="shabaBank"
                    onChange={(e) => setShabaBank(e.target.value)}
                  />
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
                <Grid item xs={12}>
                  <TextField
                    label="آدرس"
                    fullWidth
                    margin="normal"
                    name="Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={4} />
          </Grid>

          <Grid>
            <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
              افزودن
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
}
