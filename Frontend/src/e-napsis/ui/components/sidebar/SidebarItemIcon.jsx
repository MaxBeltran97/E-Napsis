import { CalendarMonthOutlined, ContactPageOutlined, HomeOutlined, PeopleAltOutlined, StorageOutlined } from "@mui/icons-material";

import { useSidebarStore } from "../../../../hooks"

export const SidebarItemIcon = ({textIcon}) => {
    
    const {selectedItem} = useSidebarStore()

    switch (textIcon) {
        case 'Home':
            return <HomeOutlined />
        break
        case 'Empresas':
            return <ContactPageOutlined />
        break
        case 'Relatores':
            return <PeopleAltOutlined />
        break
        case 'Participantes':
            return <PeopleAltOutlined />
        break
        case 'Cursos':
            return <StorageOutlined />
        break
        case 'Calendario':
            return <CalendarMonthOutlined />
        break
    }
}
