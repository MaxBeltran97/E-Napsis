import { Divider, Drawer, Icon, Toolbar, Typography } from "@mui/material"

import { useSidebarStore } from "../../../hooks"
import { SidebarList } from "./SidebarList"

const sidebarWith = 240

export const SidebarMobile = () => {

    const { isSidebarOpen, closeSidebar } = useSidebarStore()

    return (
        <Drawer
            variant="temporary"
            open={isSidebarOpen}
            onClose={closeSidebar}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWith }
            }}
        >
            <Toolbar>
                <Icon sx={{ display: 'flex' }}>
                    <img src="../src/e-napsis/ui/data/colocolo.svg" />
                </Icon>
                <Typography
                    variant='h6'
                    sx={{
                        ml: 1
                    }}
                >
                    e-Napsis
                </Typography>
            </Toolbar>
            <Divider />

            <SidebarList />
        </Drawer>
    )
}
