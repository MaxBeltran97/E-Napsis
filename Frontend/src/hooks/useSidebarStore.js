import { useDispatch, useSelector } from 'react-redux'

import { onCloseActiveItem, onCloseAllItems, onCloseItem, onCloseSidebar, onHandleActiveItem, onHandleActiveOption, onOpenItem, onOpenSidebar, onToggleActiveItem, onToggleSidebar } from '../store/sidebar'

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
    const setByUrlActiveItem = (urlPath) => {
        items.forEach(item => {
            if(!!(item.options)) {
                item.options.forEach(option => {
                    if(option.url === urlPath) {
                        dispatch(onHandleActiveItem(item))
                        dispatch(onHandleActiveOption(option))
                        dispatch(onToggleActiveItem())
                    }
                });
            }else {
                if(item.url === urlPath) {
                    dispatch(onHandleActiveItem(item))
                }
            }
        });
    }

    const handleActiveItem = (item) => {
        dispatch(onHandleActiveItem(item))
    }

    const toggleActiveItem = () => {
        dispatch(onToggleActiveItem())
    }

    const closeActiveItem = () => {
        dispatch(onCloseActiveItem())
    }

    //* Option Item
    const openItem = (item) => {
        dispatch(onOpenItem(item))
    }

    const closeItem = (item) => {
        dispatch(onCloseItem(item))
    }

    const closeAllItems = () => {
        dispatch(onCloseAllItems())
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
        setByUrlActiveItem,
        handleActiveItem,
        toggleActiveItem,
        closeActiveItem,
        openItem,
        closeItem,
        closeAllItems,
        handleActiveOption
    }
}