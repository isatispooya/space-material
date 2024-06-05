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
    <div style={{ minHeight: '100vh' }}>
      {renderHeader}

      <Container>
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
            {/* Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling. */}
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
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '45px',
              height: '45px',
              zIndex: -1,
              backgroundImage: `url("/public/assets/illustrations/Group 356.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#e0e0e0',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </Box>
      </Container>
    </div>
  );
}
