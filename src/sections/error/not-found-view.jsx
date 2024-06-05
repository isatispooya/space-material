import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

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
          backgroundImage: `url("public/assets/illustrations/background404.png")`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundColor: '#e0e0e0',
          backgroundRepeat: 'repeat',
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
          <Typography variant="h3" sx={{ mb: 3 }}>
            صفحه یافت نشد!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            با عرض پوزش صفحه مورد نظر یافت نشد .دکمه بازگشت را فشار دهید
          </Typography>

          <Button
            sx={{
              marginTop: 20,
            }}
            href="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            بازگشت
          </Button>
        </Box>
      </Container>
    </div>
  );

}
