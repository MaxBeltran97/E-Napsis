import { AppBar, Grid, IconButton, InputAdornment, TextField, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search';

import { useSidebarStore } from "../../../hooks";
import { useEffect } from "react";

const sidebarWith = 240


export const NavbarMobile = () => {

    const { isSidebarOpen, toggleSidebar, toggleActiveItem, closeActiveItem, closeAllItems } = useSidebarStore()

    const onClickMenu = () => {
        if (isSidebarOpen === true) {
            closeAllItems()
            closeActiveItem()
            toggleSidebar()
        } else {
            toggleSidebar()
            toggleActiveItem()
        }
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${sidebarWith}px)` }, ml: { md: `${sidebarWith}px` },
                bgcolor: 'background.component'
            }}
        >
            <Toolbar>
                <IconButton
                    onClick={onClickMenu}
                    color='secondary'
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
