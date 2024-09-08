import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, AppBar, Toolbar, IconButton, Tooltip, Menu, MenuItem, Drawer, List, ListItem, useTheme, useMediaQuery } from '@mui/material';
import { Search, Language, Fullscreen, Notifications, ChatBubbleOutline, FormatListBulleted, Menu as MenuIcon } from '@mui/icons-material';
import Logo from '../assets/logo.jpg';
import { logoutAdmin } from '../../Store/authSlice';
import Login from '../../pages/Auth/Login/Login';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    handleMenuClose();
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = (
    <List>
      <ListItem button>
        <Tooltip title='Language'>
          <Language />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={handleFullScreen}>
        <Tooltip title='Enlarge'>
          <Fullscreen />
        </Tooltip>
      </ListItem>
      <ListItem button>
        <Tooltip title='Notification'>
          <Notifications />
        </Tooltip>
        <Box sx={{ ml: 1, background: '#f00', borderRadius: '50%', padding: '2px 6px', color: '#fff' }}>1</Box>
      </ListItem>
      <ListItem button>
        <Tooltip title='Chat'>
          <ChatBubbleOutline />
        </Tooltip>
        <Box sx={{ ml: 1, background: '#f00', borderRadius: '50%', padding: '2px 6px', color: '#fff' }}>1</Box>
      </ListItem>
      <ListItem button>
        <Tooltip title='List'>
          <FormatListBulleted />
        </Tooltip>
      </ListItem>
      <ListItem button onClick={handleMenuClick}>
        <Tooltip title='User'>
          <img src={Logo} alt="Logo" style={{ width: '20px', borderRadius: '50%' }} />
        </Tooltip>
      </ListItem>
    </List>
  );

  return (
    <Box>
      <AppBar position="relative" sx={{backgroundColor:'transparent',color:'black',boxShadow:'none'}}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              <Tooltip title='Search'>
                <IconButton color="inherit">
                  <Search />
                </IconButton>
              </Tooltip>
              <Tooltip title='Language'>
                <IconButton color="inherit">
                  <Language />
                </IconButton>
              </Tooltip>
              <Tooltip title='Enlarge'>
                <IconButton color="inherit" onClick={handleFullScreen}>
                  <Fullscreen />
                </IconButton>
              </Tooltip>
              <Tooltip title='Notification'>
                <IconButton color="inherit">
                  <Notifications />
                  <Box sx={{ ml: 1, background: '#f00', borderRadius: '50%', padding: '2px 6px', color: '#fff' }}>1</Box>
                </IconButton>
              </Tooltip>
              <Tooltip title='Chat'>
                <IconButton color="inherit">
                  <ChatBubbleOutline />
                  <Box sx={{ ml: 1, background: '#f00', borderRadius: '50%', padding: '2px 6px', color: '#fff' }}>1</Box>
                </IconButton>
              </Tooltip>
              <Tooltip title='List'>
                <IconButton color="inherit">
                  <FormatListBulleted />
                </IconButton>
              </Tooltip>
              <Tooltip title='User'>
                <IconButton color="inherit" onClick={handleMenuClick}>
                  <img src={Logo} alt="Logo" style={{ width: '20px', borderRadius: '50%' }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {isAuthenticated ? (
        <>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem>{admin?.username}</MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          <Drawer anchor='left' open={drawerOpen} onClose={handleDrawerToggle}>
            {drawerItems}
          </Drawer>
        </>
      ) : <Login />}
    </Box>
  );
};

export default Navbar;
