import useSWR from 'swr';
import React ,{useState} from 'react';
import useSWRMutation from 'swr/mutation'

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
import { fetcher, otp } from 'src/api/fetchers';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [captcha, setCaptcha] = useState('');

  
  const { data:data_captcha, isLoading:isLoading_captcha , mutate:mutate_captcha} = useSWR(`${Onrun}/api/captcha/`, fetcher)
  // eslint-disable-next-line no-shadow
  const { trigger } = useSWRMutation({mobile: phoneNumber,captcha,encrypted_response: data_captcha?data_captcha.encrypted_response:''}, otp);


  const handleClick = async () => {
    if (!data_captcha) {
      console.error('Captcha data is not loaded');
      return;
    }
    try {
      const data = await trigger();
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  
  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="phoneNumber" label="شماره موبایل" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
        <TextField name="captcha" label="کپچا"  value={captcha} onChange={(e)=>setCaptcha(e.target.value)}/>
      </Stack>
      
{
  isLoading_captcha ? (
    <Skeleton variant="rounded" width={210} height={60} />
  ) : (
    <Stack spacing={3}  >
      <Button onClick={()=>mutate_captcha()} >      
       <img src={`data:image/png;base64,${data_captcha.image}`}  alt="captcha"/>
    </Button>

    </Stack>
    )
}
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
