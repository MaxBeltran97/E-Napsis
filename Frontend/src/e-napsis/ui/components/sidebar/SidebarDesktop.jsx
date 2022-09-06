import { Divider, Icon, styled, Typography } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';

import { useSidebarStore } from "../../../../hooks";

import { SidebarList } from "./SidebarList";

const sidebarWith = 240

const openedMixin = (theme) => ({
    width: sidebarWith,
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: sidebarWith,
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

    const { isSidebarOpen } = useSidebarStore()

    return (
        <Drawer
            variant= 'permanent'
            open={isSidebarOpen}
        >
            <DrawerHeader>
                <Icon sx={{display: 'flex'}}>
                    <img src="../src/e-napsis/ui/data/colocolo.svg" />
                </Icon>
                <Typography
                    variant='h6'
                    sx={{
                        ml: 1,
                        display: (isSidebarOpen) ? 'block' : 'none'
                    }}
                >
                    e-Napsis
                </Typography>
            </DrawerHeader>
            <Divider />

            <SidebarList />
        </Drawer>
    )
}
