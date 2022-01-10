import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../Login/context';
import  {useContext } from 'react';
import {useToken} from '../../hooks/useToken';
import { Roles, useRole } from '../../hooks/useRole';
import {  useHistory } from "react-router-dom";
import { Service } from '../Service/Service';


const ResponsiveAppBar = ({setAllCards}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { tokenContext, setTokenContext } = useContext(UserContext);
  const { removeToken } = useToken();
  const userRole = useRole();
  const isAdmin = userRole === Roles.ROLE_ADMIN;

  const history = useHistory();

  const handleSignout = () => {
    removeToken();
    setTokenContext(null);
}

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            color="common.black"
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            TimeZone Converter
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key="1" onClick={()=>{setAnchorElNav(null); history.push("/")}} >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              {isAdmin && 
              <MenuItem key="2" onClick={()=>{setAnchorElNav(null); history.push("/users")}}  >
                <Typography textAlign="center">Users</Typography>
              </MenuItem>
              }
              </Menu>

          </Box>
          <Typography
            color="common.white"
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            TimeZone Converter
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',
                ':hover': {
                  bgcolor: 'black', // theme.palette.primary.main
                  color: 'white',
                } }}
                href="/"
              >
                Home
            </Button>
            {isAdmin && 
            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',
                ':hover': {
                  bgcolor: 'black', // theme.palette.primary.main
                  color: 'white',
                } }}
                href="/users"
              >
                Users
            </Button>
            }
          
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleSignout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
