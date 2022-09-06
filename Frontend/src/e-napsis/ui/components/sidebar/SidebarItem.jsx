import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { CalendarMonthOutlined, ContactPageOutlined, HomeOutlined, PeopleAltOutlined, StorageOutlined } from '@mui/icons-material'
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { useNavigate } from "react-router-dom";

import { useSidebarStore } from '../../../../hooks'

const ItemIcon = ({ idIcon, active }) => {
    switch (idIcon) {
        case 0:
            return <HomeOutlined sx={{ color: (active) ? 'text.active' : '' }} />
            break
        case 1:
            return <ContactPageOutlined sx={{ color: (active) ? 'text.active' : '' }} />
            break
        case 2:
            return <PeopleAltOutlined sx={{ color: (active) ? 'text.active' : '' }} />
            break
        case 3:
            return <StorageOutlined sx={{ color: (active) ? 'text.active' : '' }} />
            break
        case 4:
            return <CalendarMonthOutlined sx={{ color: (active) ? 'text.active' : '' }} />
            break
    }
}

const ItemOption = ({ item, option, active }) => {

    const navigate = useNavigate()

    const { handleActiveItem, handleActiveOption } = useSidebarStore()

    const onClickOption = () => {
        if (active === false) {
            handleActiveItem(item)
            handleActiveOption(option)
            navigate(`../../${option.url}`, {replace: true})
        }
    }

    return (
        <ListItemButton onClick={onClickOption}
            sx={{
                pl: 6, pt: '3px', pb: '3px',
                borderRadius: 1,
                borderRight: 4,
                borderColor: (active) ? 'text.active' : 'background.component'
            }}
        >
            <ListItemText
                primary={option.name}
                sx={{ color: (active) ? 'text.active' : '' }}
            />
        </ListItemButton>
    )
}

export const SidebarItem = ({ item, active }) => {

    const navigate = useNavigate()

    const { isSidebarOpen, openSidebar, handleActiveItem, toggleActiveItem, closeActiveItem, openItem, closeItem, closeAllItems } = useSidebarStore()
    const { idIcon, name, url, isItemOpen, activeOption, options } = item

    const onClickItem = () => {
        if (isSidebarOpen === false) {
            openSidebar()
        }

        if (active === false) {
            if (!(!!options)) {
                closeAllItems()
                handleActiveItem(item)
                navigate(`../${url}`, {replace: true})
            } else {
                if (isItemOpen) {
                    closeItem(item)
                } else {
                    closeActiveItem()
                    closeAllItems()
                    openItem(item)
                }
            }
        } else {
            closeAllItems()
            toggleActiveItem()
        }
    }

    return (
        <ListItem
            sx={{
                p: 0, mb: '2px',
                flexDirection: 'column', alignItems: 'stretch',
            }}
        >
            <ListItemButton onClick={onClickItem}
                sx={{
                    pl: (isSidebarOpen) ? 3 : 'auto', pt: '12px', pb: '12px',
                    borderRadius: 1,
                    borderRight: 4,
                    borderColor: (active && !(!!options && isSidebarOpen)) ? 'text.active' : 'background.component',
                }}
            >
                <ListItemIcon>
                    <ItemIcon idIcon={idIcon} active={active} />
                </ListItemIcon>
                <ListItemText
                    primary={name}
                    sx={{ color: (active) ? 'text.active' : '' }}
                />
                {
                    (!!options)
                        ? (isItemOpen) ? <ExpandLess sx={{ color: (active) ? 'text.active' : '' }} /> : <ExpandMore sx={{ color: (active) ? 'text.active' : '' }} />
                        : null
                }
            </ListItemButton>
            <Collapse
                in={isItemOpen && !!options}
                timeout='auto'
                unmountOnExit
            >
                <List component='div' disablePadding sx={{ pb: 1 }}>
                    {
                        options?.map((option) => (
                            (option.name === activeOption?.name)
                                ? <ItemOption key={option.name} item={item} option={activeOption} active={true} />
                                : <ItemOption key={option.name} item={item} option={option} active={false} />
                        ))
                    }
                </List>
            </Collapse>
        </ListItem>
    )
}
