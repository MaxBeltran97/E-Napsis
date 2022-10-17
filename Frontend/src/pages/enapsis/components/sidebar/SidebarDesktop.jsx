import { Divider, Icon, styled, Typography } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'

import { SIDEBAR_WIDTH } from '@models/sidebar'
import NapsisLogo from '@assets/napsis-logo.png'

import { useUiStore } from '@hooks/useUiStore'
import { SidebarList } from './SidebarList'

const openedMixin = (theme) => ({
  width: SIDEBAR_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

export const SidebarDesktop = () => {
  const { isSidebarOpen } = useUiStore()

  return (
    <Drawer variant='permanent' open={isSidebarOpen} sx={{ bgcolor: 'background.main' }}>
      <DrawerHeader>
        <Icon sx={{ display: 'flex' }}>
          <img src={NapsisLogo} />
        </Icon>
        <Typography variant='h6' sx={{ ml: 1, display: (isSidebarOpen) ? 'block' : 'none' }}>
          e-Napsis
        </Typography>
      </DrawerHeader>
      <Divider />

      <SidebarList />
    </Drawer>
  )
}