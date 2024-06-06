

import useSWR from 'swr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React ,{useState ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {Button,Skeleton}  from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { Onrun } from 'src/api/OnRun';
import { bgGradient } from 'src/theme/css';
import { fetcher } from 'src/api/fetchers';

import Logo from 'src/components/logo';

import { setCookieValue, getCookieValue } from '../../utils/cookie';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const [mobileNumber, setMobileNumber] = useState('');
  const [captchaLogin, setCaptchaLogin] = useState('');
  const [codeNumber, setCodeNumber] = useState('');
  const navigate = useNavigate();

  const [SecondForm, setSecondForm] = useState(false);


  
  const { data:data_captcha, isLoading:isLoading_captcha , mutate:mutate_captcha} = useSWR(`${Onrun}/api/captcha/`, fetcher)


  const handleClick = async () => {
    try {
      const data = {
        mobile: mobileNumber,
        captcha: captchaLogin,
        encrypted_response: data_captcha.encrypted_response
      };
      const api = `${Onrun}/api/otp/`;
      const sendApi = await axios.post(api, data);
      console.log(sendApi);
      setSecondForm(true);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error('Error:', error.message);
        toast.error(error.message);
      }
    }
  };

  
  const loginClick = async () => {
    try {
      const data = {
        mobile: mobileNumber,
        code: codeNumber
      };
      const apiCode = `${Onrun}/api/login/`;
      const sendApiCode = await axios.post(apiCode, data);
      setCookieValue('UID', sendApiCode.data.access);
      console.log(sendApiCode.data.access);
      navigate('/')
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error('ErrorCode:', error.message);
        toast.error(error.message);
      }
    }
  };
  
  const checkUID = () => {
    const uid= getCookieValue('UID');
    console.log(uid);
  };

  useEffect(() => {
    checkUID();
  }, []);

  
  const renderForm = (
    <>
      {!SecondForm && (
        <>
          <Stack spacing={3}>
            <TextField
              name="mobileNumber"
              label="شماره موبایل"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <TextField
              name="captcha"
              label="کپچا"
              value={captchaLogin}
              onChange={(e) => setCaptchaLogin(e.target.value)}
            />
          </Stack>
  
          {isLoading_captcha ? (
            <Skeleton variant="rounded" width={210} height={60} />
          ) : (
            <Stack spacing={3}>
              <Button onClick={() => mutate_captcha()}>
                <img src={`data:image/png;base64,${data_captcha.image}`} alt="captcha" />
              </Button>
            </Stack>
          )}
  
          <div>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleClick}
            >
              تایید
            </LoadingButton>
            <ToastContainer
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </>
      )}
  
      {SecondForm && (
        <>
        <Stack spacing={3}>
         <TextField  value={mobileNumber} disabled name="mobileNumber"  />
         <TextField name="Code" label="کد تایید"   onChange={(e) => setCodeNumber(e.target.value)} />
        </Stack>

        <div style={{ marginTop: '20px' }}>
            <LoadingButton
             fullWidth
             size="large"
             type="submit"
             variant="contained"
             color="inherit"
              onClick={loginClick}
                >
                 ورود
              </LoadingButton>
                 </div>
        </>
      )}
    </>
  );
  

  

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">صفحه ورود</Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ورود
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
};
