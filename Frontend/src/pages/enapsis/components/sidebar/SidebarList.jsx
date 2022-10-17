import { List } from "@mui/material"

import { useUiStore } from "@hooks/useUiStore"
import { SidebarItem } from "./SidebarItem"

export const SidebarList = () => {
  const { sidebarItems, sidebarActiveItem } = useUiStore()

  return (
    <List sx={{ pt: '20px', pl: '2px', pr: '2px', pb: 0 }}>
      {
        sidebarItems.map((item) => (
          (item.name === sidebarActiveItem.name)
            ? <SidebarItem key={item.name} item={sidebarActiveItem} active={true} />
            : <SidebarItem key={item.name} item={item} />
        ))
      }
    </List>
  )
}
