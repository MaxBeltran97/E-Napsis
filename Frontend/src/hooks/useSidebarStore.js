import { useDispatch, useSelector } from 'react-redux'
import { onCloseSidebar, onOpenSidebar, onToggleSidebar } from '../store/sidebar'

export const useSidebarStore = () => {
    
    const dispatch = useDispatch()
    const { isSidebarOpen } = useSelector(state => state.sidebar)
    
    const toggleSidebar = () => {
        dispatch(onToggleSidebar())
    }

    const openSidebar = () => {
        dispatch(onOpenSidebar())
    }

    const closeSidebar = () => {
        dispatch(onCloseSidebar())
    }

    return {
        //* Propiedades
        isSidebarOpen,

        //* Metodos
        toggleSidebar,
        openSidebar,
        closeSidebar
    }
}
