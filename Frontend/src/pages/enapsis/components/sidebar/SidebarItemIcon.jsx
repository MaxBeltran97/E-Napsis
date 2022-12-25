import { AutoStoriesOutlined, CalendarMonthOutlined, ContactPageOutlined, HomeOutlined, PeopleAltOutlined, Settings, StorageOutlined } from "@mui/icons-material"

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
    case 5:
      return <AutoStoriesOutlined sx={{ color: (active) ? 'text.active' : '' }} />
    case 6:
      return <Settings sx={{ color: (active) ? 'text.active' : '' }} />
  }
}
