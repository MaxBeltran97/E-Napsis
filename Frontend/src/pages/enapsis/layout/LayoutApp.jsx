import React from 'react'
import { Box, Toolbar } from '@mui/material'

import { SidebarDesktop } from '../components/sidebar'
import { NavbarDesktop } from '../components/navbar'

export const LayoutApp = ({children}) => {
  return (
    <Box display={'flex'}>
      <NavbarDesktop />
      <SidebarDesktop />

      <Box component={'main'} sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
