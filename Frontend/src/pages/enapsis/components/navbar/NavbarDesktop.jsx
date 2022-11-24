import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, styled, Toolbar, Tooltip, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar'

import { SIDEBAR_WIDTH } from '@models/sidebar'

import { useUiStore } from '@hooks/useUiStore';
import { useState } from 'react';

import { AccountBoxOutlined, Logout, PersonAdd, Settings } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  // marginLeft: `calc(100% - 64px)`,
  width: `calc(100% - 64px)`,
  transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
      marginLeft: `${SIDEBAR_WIDTH}px`,
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
      })
  })
}))

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.toUpperCase()[0]}`
    // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export const NavbarDesktop = () => {
  const { isSidebarOpen, closeSidebar, openSidebar, closeAllSidebarItems, openSidebarActiveItem } = useUiStore()

  const [anchorElUser, setAnchorElUser] = useState(null)

  const onClickMenu = () => {
    if(isSidebarOpen) {
      closeSidebar()
      closeAllSidebarItems()
    }else {
      openSidebar()
      openSidebarActiveItem()
    }
  }

  const onHandleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const onHandleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='fixed' open={isSidebarOpen} sx={{ bgcolor: 'background.main' }}>
      <Toolbar sx={{ justifyContent:'space-between' }}>
        <IconButton onClick={onClickMenu}>
          <MenuIcon />
        </IconButton>

        {/* usuario */}
        <Box sx={{ flexGrow: 0 }}>
          {/* <IconButton onClick={onHandleOpenUserMenu}>
            <Avatar sx={{ width: 32, height: 32 }} {...stringAvatar('maxBeltran')} />
          </IconButton> */}
          <Button onClick={onHandleOpenUserMenu}
            sx={{ textTransform: 'initial !important', color: 'text.main' }}
          >
            {/* Cambiar si es un icono */}
            <Avatar sx={{ width: 32, height: 32 }} {...stringAvatar('maxBeltran')} />
            <Typography sx={{ pl: 1 }}>maxBeltran</Typography>
          </Button>

          <Menu
            anchorEl={anchorElUser}
            id={'account-menu'}
            open={Boolean(anchorElUser)}
            onClose={onHandleCloseUserMenu}
            onClick={onHandleCloseUserMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* <MenuItem>
              <Avatar sx={{ width: 40, height: 40 }} {...stringAvatar('maxBeltran')} />
              Maximiliano Beltran
            </MenuItem> */}
            <MenuItem>
              <Avatar />
              Mi Cuenta
            </MenuItem>
            <Divider />
            {/* Admin Role */}
            <MenuItem>
              <ListItemIcon >
                <PersonAdd />
              </ListItemIcon>
              Añadir Usuario
            </MenuItem>
            <MenuItem>
              <ListItemIcon >
                <Settings />
              </ListItemIcon>
              Configuración
            </MenuItem>
            {/* End Admin Role */}
            <MenuItem>
              <ListItemIcon >
                <Logout />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}