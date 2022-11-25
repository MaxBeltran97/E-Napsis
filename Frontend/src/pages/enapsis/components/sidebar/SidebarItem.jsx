import { useNavigate } from "react-router-dom"

import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { SidebarItemIcon } from "./SidebarItemIcon"
import { SidebarItemOption } from "./SidebarItemOption"

import { useUiStore } from "@hooks/useUiStore"
import { useAuthStore } from "@hooks/useAuthStore"
import { useState } from "react"
import { useEffect } from "react"

export const SidebarItem = ({ item, active = false }) => {
  const navigate = useNavigate()
  const { startCheckRole } = useAuthStore()
  const { changeSidebarActiveItem, closeAllSidebarItems, isSidebarOpen, openSidebar, openSidebarActiveItem, openSidebarItem } = useUiStore()

  const [view, setView] = useState(false)

  const { isItemOpen, activeOption, options, rolesAllowed } = item

  const onClickItem = () => {
    if (!isSidebarOpen) {
      openSidebar()
    }

    if (active) {
      if (isItemOpen) {
        closeAllSidebarItems()
      } else {
        closeAllSidebarItems()
        openSidebarActiveItem()
      }
    } else {
      if (!(!!options)) {
        closeAllSidebarItems()
        changeSidebarActiveItem(item)
        navigate(`../${item.url}`, { replace: true })
      } else {
        if (isItemOpen) {
          closeAllSidebarItems()
        } else {
          closeAllSidebarItems()
          openSidebarItem(item)
        }
      }
    }
  }

  const checkRole = async() => {
    const roleView = await startCheckRole(rolesAllowed)
    setView(roleView)
  }

  useEffect(() => {
    checkRole()
  }, [])
  
  return (
    <>
      {
        (view)
          ? (
            <ListItem sx={{ p: 0, mb: '2px', flexDirection: 'column', alignItems: 'stretch' }}>
              <ListItemButton onClick={onClickItem}
                sx={{
                  pl: (isSidebarOpen) ? 3 : 'auto', pt: '12px', pb: '12px',
                  borderRadius: 1,
                  borderRight: 4,
                  borderColor: (active && !(!!options && isSidebarOpen)) ? 'text.active' : 'background.main'
                }}
              >
                <ListItemIcon>
                  <SidebarItemIcon idIcon={item.idIcon} active={active} />
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ color: (active) ? 'text.active' : '' }} />
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
                <List component={'div'} disablePadding sx={{ pb: 1 }}>
                  {
                    options?.map((option) => (
                      (option.name === activeOption?.name)
                        ? <SidebarItemOption key={option.name} item={item} option={activeOption} active={true} />
                        : <SidebarItemOption key={option.name} item={item} option={option} />
                    ))
                  }
                </List>
              </Collapse>
            </ListItem>
          )
          : (
            <></>
          )
      }
    </>
  )
}
