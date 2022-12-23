import { useDispatch, useSelector } from "react-redux"

import { onChangeSidebarActiveItem, onChangeSidebarActiveOption, onChangeSidebarActiveSubOption, onCloseAllSidebarItems, onCloseAllSidebarOptions, onCloseSidebar, onOpenSidebar, onOpenSidebarActiveItem, onOpenSidebarActiveOption, onOpenSidebarItem, onOpenSidebarOption } from "@reduxSlices/uiSlice"

export const useUiStore = () => {

  const dispatch = useDispatch()
  const { isSidebarOpen, sidebarActiveItem, sidebarItems } = useSelector(state => state.ui)

  const openSidebar = () => {
    dispatch(onOpenSidebar())
  }

  const closeSidebar = () => {
    dispatch(onCloseSidebar())
  }

  const setByUrlSidebarActiveItem = (urlPath) => {
    sidebarItems.forEach(item => {
      if(!!(item.options)) {
        item.options.forEach(option => {
          if(option.url === urlPath) {
            dispatch(onChangeSidebarActiveItem(item))
            dispatch(onChangeSidebarActiveOption(option))
            if(isSidebarOpen) {
              dispatch(onOpenSidebarActiveItem())
            }
          }
        })
      }else {
        if(item.url === urlPath) {
          dispatch(onChangeSidebarActiveItem(item))
        }
      }
    });
  }

  const changeSidebarActiveItem = (item) => {
    dispatch(onChangeSidebarActiveItem(item))
  }

  const openSidebarActiveItem = () => {
    dispatch(onOpenSidebarActiveItem())
  }

  const openSidebarItem = (item) => {
    dispatch(onOpenSidebarItem(item))
  }

  const closeAllSidebarItems = () => {
    dispatch(onCloseAllSidebarItems())
  }

  const changeSidebarActiveOption = (option) => {
    dispatch(onChangeSidebarActiveOption(option))
  }

  const openSidebarActiveOption = () => {
    dispatch(onOpenSidebarActiveOption())
  }

  const openSidebarOption = (option) => {
    console.log({option})
    dispatch(onOpenSidebarOption(option))
  }

  const closeAllSidebarOptions = () => {
    dispatch(onCloseAllSidebarOptions())
  }

  const changeSidebarActiveSubOption = (subOption) => {
    dispatch(onChangeSidebarActiveSubOption(subOption))
  }

  return {
    //* Propiedades
    isSidebarOpen,
    sidebarActiveItem,
    sidebarItems,

    //* Metodos
    openSidebar,
    closeSidebar,
    setByUrlSidebarActiveItem,
    changeSidebarActiveItem,
    openSidebarActiveItem,
    openSidebarItem,
    closeAllSidebarItems,
    changeSidebarActiveOption,
    openSidebarActiveOption,
    openSidebarOption,
    closeAllSidebarOptions,
    changeSidebarActiveSubOption
  }
}
