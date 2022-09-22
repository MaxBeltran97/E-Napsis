import { Box, Toolbar } from "@mui/material"

import { NavbarDesktop, NavbarMobile, SidebarDesktop, SidebarMobile } from "../components"

export const LayoutApp = ({children}) => { 

    return (
        <>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <NavbarDesktop />
                <SidebarDesktop />

                <Box component={'main'}
                    sx={{flexGrow: 1, p: 2}}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
            {/* <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                <NavbarMobile />
                <SidebarMobile />

                <Box component={'main'}
                    sx={{flexGrow: 1, p: 2}}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box> */}
        </>
    )
}
