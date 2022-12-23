import { redirect, useNavigate } from "react-router-dom"

import { Collapse, List, ListItemButton, ListItemText } from "@mui/material"

import { useUiStore } from "@hooks/useUiStore"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { SidebarItemSubOption } from "."

export const SidebarItemOption = ({ item, option, active = false }) => {
  const navigate = useNavigate()
  const { sidebarActiveItem ,changeSidebarActiveItem, changeSidebarActiveOption, closeAllSidebarOptions, openSidebarActiveOption, openSidebarOption } = useUiStore()

  const { isOptionOpen, activeSubOption, subOptions } = option

  const onClickOption = () => {

    if (sidebarActiveItem.name === item.name) {
      if (active) {
        if (isOptionOpen) {
          closeAllSidebarOptions()
        } else {
          closeAllSidebarOptions()
          openSidebarActiveOption()
        }
      } else {
        if(!(!!subOptions)) {
          closeAllSidebarOptions()
          changeSidebarActiveItem(item)
          changeSidebarActiveOption(option)
          navigate(`../../${option.url}`, { replace: true })
        } else {
          if (isOptionOpen) {
            closeAllSidebarOptions()
          } else {
            closeAllSidebarOptions()
            openSidebarOption(option)
          }
        }
      }
    }else {
      if (active) {
        if (isOptionOpen) {
          closeAllSidebarOptions()
        } else {
          closeAllSidebarOptions()
          openSidebarActiveOption()
        }
      } else {
        if(!(!!subOptions)) {
          closeAllSidebarOptions()
          changeSidebarActiveItem(item)
          changeSidebarActiveOption(option)
          navigate(`../../${option.url}`, { replace: true })
        } else {
          if (isOptionOpen) {
            closeAllSidebarOptions()
          } else {
            closeAllSidebarOptions()
            openSidebarOption(option)
          }
        }
      }
    }

    // if (!active) {
    //   changeSidebarActiveItem(item)
    //   changeSidebarActiveOption(option)
    //   navigate(`../../${option.url}`, { replace: true })
    // } else {
    //   window.location.reload()
    // }
  }

  return (
    <>
      <ListItemButton onClick={onClickOption}
        sx={{
          pl: 6, pt: '3px', pb: '3px',
          borderRadius: 1,
          borderRight: 4,
          borderColor: (active) ? 'text.active' : 'background.main'
        }}
      >
        <ListItemText primary={option.name} sx={{ color: (active) ? 'text.active' : '' }} />
        {
          (!!subOptions)
            ? (isOptionOpen) ? <ExpandLess sx={{ color: (active) ? 'text.active' : '' }} /> : <ExpandMore sx={{ color: (active) ? 'text.active' : '' }} />
            : null
        }
      </ListItemButton>
      <Collapse
        in={isOptionOpen && !!subOptions}
        timeout='auto'
        unmountOnExit
      >
        <List component={'div'} disablePadding sx={{ pb: 1 }}>
          {
            subOptions?.map((subOption) => (
              (subOption.name === activeSubOption?.name)
                ? <SidebarItemSubOption key={subOption.name} item={item} option={option} subOption={activeSubOption} active={true} />
                : <SidebarItemSubOption key={subOption.name} item={item} option={option} subOption={subOption}/>
            ))
          }
        </List>
      </Collapse>
    </>
  )
}
