import React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

import { fetcher } from 'src/api/fetchers'; 
import { Onrun } from 'src/api/OnRun';
import useSWR from 'swr';

const NavConfig = () => {
  const { data: navConfig_data, error:navConfig_error, isLoading: navConfig_isLoading } = useSWR(`${Onrun}/api/menus`, fetcher); 
  const location = useLocation();

  const [open, setOpen] = React.useState({});

  if (navConfig_error) return <div>Error</div>;
  if (navConfig_isLoading) return <div>Loading</div>;

  const handleClick = (item) => {
    if (item.children) {
      setOpen(prevOpen => ({
        ...prevOpen,
        [item.title]: !prevOpen[item.title]
      }));
    } else if (item.url && location.pathname !== item.url) {
      window.location.href = item.url;
    }
  };

  return (
    <List>
      {navConfig_data.map((item) => (
        <div key={item.title}>
          <ListItem onClick={() => handleClick(item)} button>
            <ListItemText primary={item.title} />
            {item.children && (
              <>
                {item.icon !== null && item.icon}
                {open[item.title] ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItem>
          {item.children && (
            <Collapse in={open[item.title]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child) => (
                  <ListItem key={child.title} button   sx={{ pl: 4 }}onClick={() => {window.location.href = child.url;}}>
                    <ListItemText primary={child.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
};

export default NavConfig;
