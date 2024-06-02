import useSWR from 'swr';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {Button,Skeleton}  from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'src/routes/hooks';
import Logo from 'src/components/logo';


// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const handelCaptcha=()=>{
  mutate()
}
  

  const handleClick = () => {
    router.push('/');
  };
  const { data, error, isLoading , mutate} = useSWR(`${onrun}/api/captcha/`, fetcher)
 
  
  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="شماره شناسه ملی" />
        <TextField name="captcha" label="کپچا" />
      </Stack>
      
{
  isLoading ? (
    <Skeleton variant="rounded" width={210} height={60} />
  ) : (
    <Stack spacing={3} >
      <Button onClick={handelCaptcha} >      
       <img src={`data:image/png;base64,${data.image}`}  alt="captcha" />
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
}
