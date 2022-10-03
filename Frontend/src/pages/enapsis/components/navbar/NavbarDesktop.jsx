import { Menu } from '@mui/icons-material';
import { IconButton, styled, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar'

import { SIDEBAR_WIDTH } from '@models/sidebar'

import { useUiStore } from '@hooks/useUiStore';

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

export const NavbarDesktop = () => {
  const { isSidebarOpen, closeSidebar, openSidebar, closeAllSidebarItems, openSidebarActiveItem } = useUiStore()

  const onClickMenu = () => {
    if(isSidebarOpen) {
      closeSidebar()
      closeAllSidebarItems()
    }else {
      openSidebar()
      openSidebarActiveItem()
    }
  }

  return (
    <AppBar position='fixed' open={isSidebarOpen} sx={{ bgcolor: 'background.main' }}>
      <Toolbar>
        <IconButton onClick={onClickMenu}>
          <Menu />
        </IconButton>

        {/* usuario */}
      </Toolbar>
    </AppBar>
  )
}