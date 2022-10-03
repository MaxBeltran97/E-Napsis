import { useNavigate } from "react-router-dom"

import { ListItemButton, ListItemText } from "@mui/material"

import { useUiStore } from "@hooks/useUiStore"

export const SidebarItemOption = ({item, option, active = false}) => {
  const navigate = useNavigate()
  const { changeSidebarActiveItem, changeSidebarActiveOption } = useUiStore()

  const onClickOption = () => {
    if (!active) {
      changeSidebarActiveItem(item)
      changeSidebarActiveOption(option)
      navigate(`../../${option.url}`, {replace: true})
    }
  }

  return (
    <ListItemButton onClick={onClickOption}
      sx={{
        pl: 6, pt: '3px', pb: '3px',
        borderRadius: 1,
        borderRight: 4,
        borderColor: (active) ? 'text.active' : 'background.main'
      }}
    >
      <ListItemText primary={option.name} sx={{ color: (active) ? 'text.active' : '' }}/>
    </ListItemButton>
  )
}
