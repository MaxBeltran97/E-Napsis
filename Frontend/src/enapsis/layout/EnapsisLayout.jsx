import { Box, Toolbar } from "@mui/material"
import { Navbar, SidebarDesktop } from "../components"

export const EnapsisLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <SidebarDesktop />

            <Box component={'main'} sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}
