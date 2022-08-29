import { List } from '@mui/material'
import React from 'react'

import { useSidebarStore } from '../../../hooks'
import { SidebarItem } from './SidebarItem'

export const SidebarList = () => {

    const { items, activeItem } = useSidebarStore()

    return (
        <List
            sx={{pt: '20px', pl: '2px', pr: '2px', pb: 0}}
        >
            {
                items.map((item) => (
                    (item.name === activeItem.name)
                        ? <SidebarItem key={item.name} item={activeItem} active={true} />
                        : <SidebarItem key={item.name} item={item} active={false} />
                ))
            }
        </List>
    )
}
