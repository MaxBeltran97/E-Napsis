import { useUiStore } from '@hooks/useUiStore'
import { ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

export const SidebarItemSubOption = ({ item, option, subOption, active = false }) => {
  
  const { changeSidebarActiveItem, changeSidebarActiveOption, changeSidebarActiveSubOption } = useUiStore()

  const onClickOption = () => {
    if(!active) {
      changeSidebarActiveItem(item)
      changeSidebarActiveOption(option)
      changeSidebarActiveSubOption(subOption)
    }
  }
  
  return (
    <ListItemButton onClick={onClickOption}
      sx={{
        pl: 8, pt: '3px', pb: '3px',
        borderRadius: 1,
        borderRight: 4,
        borderColor: (active) ? 'text.active' : 'background.main'
      }}
    >
      <ListItemText primary={subOption.name} sx={{ color: (active) ? 'text.active' : ''}} />
    </ListItemButton>
  )
}
