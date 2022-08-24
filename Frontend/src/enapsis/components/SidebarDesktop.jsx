import { Divider, styled, Typography } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';

import { useSidebarStore } from "../../hooks"

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
    justifyContent: 'flex-end',
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
            variant='permanent' 
            open={isSidebarOpen}
        >
            <DrawerHeader>
                <Typography 
                    variant='h6' 
                    noWrap 
                    component='div' 
                    width={'100%'}
                    align='center'
                >
                    {
                        (isSidebarOpen) ? 'e-Napsis' : 'e-N'
                    }
                </Typography>
            </DrawerHeader>
            <Divider />
            
            
        </Drawer>
    )
}
