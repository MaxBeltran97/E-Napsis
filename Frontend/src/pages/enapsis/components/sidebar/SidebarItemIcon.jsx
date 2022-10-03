import { CalendarMonthOutlined, ContactPageOutlined, HomeOutlined, PeopleAltOutlined, StorageOutlined } from "@mui/icons-material"

export const SidebarItemIcon = ({idIcon, active}) => {
  switch (idIcon) {
    case 0:
      return <HomeOutlined sx={{ color: (active) ? 'text.active' : '' }} />
    case 1:
      return <ContactPageOutlined sx={{ color: (active) ? 'text.active' : '' }} />
    case 2:
      return <PeopleAltOutlined sx={{ color: (active) ? 'text.active' : '' }} />
    case 3:
      return <StorageOutlined sx={{ color: (active) ? 'text.active' : '' }} />
    case 4:
      return <CalendarMonthOutlined sx={{ color: (active) ? 'text.active' : '' }} />
  }
}
