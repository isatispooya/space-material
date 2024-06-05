import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { alpha } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';


function NavItem({ item }) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const active = item.path === pathname;

  const handleClick = () => {
    if (item.children || item.sub) {
      setOpen(!open);
    }
  };

  return (
    <>
      <ListItemButton
        component={RouterLink}
        href={item.path}
        onClick={handleClick}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(active && {
            color: 'primary.main',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon}
        </Box>
        <Box component="span">{item.title}</Box>
      </ListItemButton>

      {(item.children) && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {(item.children).map((child) => (
              <NavItem key={child.title} item={child} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default NavItem;
