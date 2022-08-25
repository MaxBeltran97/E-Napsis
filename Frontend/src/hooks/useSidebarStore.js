import { useDispatch, useSelector } from 'react-redux'

import { onCloseActiveItem, onCloseSidebar, onHandleActiveItem, onHandleActiveOption, onOpenSidebar, onToggleActiveItem, onToggleSidebar } from '../store/sidebar'

export const useSidebarStore = () => {

    const dispatch = useDispatch()
    const { isSidebarOpen, activeItem, items } = useSelector(state => state.sidebar)

    //* Sidebar
    const toggleSidebar = () => {
        dispatch(onToggleSidebar())
    }

    const openSidebar = () => {
        dispatch(onOpenSidebar())
    }

    const closeSidebar = () => {
        dispatch(onCloseSidebar())
    }

    //* Item Active
    const handleActiveItem = (item) => {
        dispatch(onHandleActiveItem(item))
    }

    const toggleActiveItem = () => {
        dispatch(onToggleActiveItem())
    }

    const closeActiveItem = () => {
        dispatch(onCloseActiveItem())
    }

    //* Option Active
    const handleActiveOption = (option) => {
        dispatch(onHandleActiveOption(option))
    }

    return {
        //* Propiedades
        isSidebarOpen,
        activeItem,
        items,

        //* Metodos
        toggleSidebar,
        openSidebar,
        closeSidebar,
        handleActiveItem,
        toggleActiveItem,
        closeActiveItem,
        handleActiveOption
    }
}
