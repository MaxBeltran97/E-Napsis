import { Grid, IconButton, InputAdornment, styled, TextField, Toolbar } from "@mui/material"
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search';

import { useSidebarStore } from "../../hooks";

const sidebarWith = 240

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    // marginLeft: `calc(100% - 64px)`,
    width: `calc(100% - 64px)`,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: `${sidebarWith}px`,
        width: `calc(100% - ${sidebarWith}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}))

export const Navbar = () => {

    const { isSidebarOpen, toggleSidebar, toggleActiveItem, closeActiveItem } = useSidebarStore()

    const onClickMenu = () => {
        if(isSidebarOpen === true) {
            closeActiveItem()
            toggleSidebar()
        }else {
            toggleSidebar()
            toggleActiveItem()
        }
    }

    return (
        <AppBar
            position='fixed'
            open={isSidebarOpen}
            sx={{
                bgcolor: 'background.component'
            }}
        >
            <Toolbar>
                <IconButton
                    onClick={onClickMenu}
                    color='primary'
                    edge='start'
                    sx={{
                        mr: 2
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Grid container
                    direction='row'
                    justifyContent={'space-between'}
                    alignItems='center'
                >
                    <Grid item>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                            placeholder='Buscar...'
                            variant="standard"
                        />
                    </Grid>

                    <Grid item>
                        {/* <UserMenu /> */}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
