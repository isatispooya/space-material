import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo />
    </Box>
  );
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {renderHeader}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundImage: `url("/public/assets/illustrations/backgroundPng.png")`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundColor: '#e0e0e0',
          backgroundRepeat: 'repeat',
          margin: 0, 
          padding: 0,
          border: 'none',
        }}
      />

        
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <img src="/assets/illustrations/404.svg" alt="Your " style={{ width: '550px', height: '200px', margin: '10px auto' }} />
          <img src="/assets/illustrations/404Title.svg" alt="Your " style={{ width: '400px', height: '400px', margin: '-100px auto' }} />

          <a href="/"  style={{ display: 'inline-block', textDecoration: 'none' }}>
          <img src="/assets/illustrations/404Button.svg" alt="بازگشت" style={{ width: '200px', height: '50px' }} />
          </a>
          
        </Box>
      </Container>
    </div>
  );

}
