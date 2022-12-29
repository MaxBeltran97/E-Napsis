import { useDispatch, useSelector } from "react-redux"

import { onChangeSidebarActiveItem, onChangeSidebarActiveOption, onCloseAllSidebarItems, onCloseSidebar, onOpenSidebar, onOpenSidebarActiveItem, onOpenSidebarItem } from "@reduxSlices/uiSlice"
import enapsisApi from "@api/enapsisApi"

export const useUiStore = () => {

  const dispatch = useDispatch()
  const { isSidebarOpen, sidebarActiveItem, sidebarItems } = useSelector(state => state.ui)

  /** Sidebar */
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
  /** Fin Sidebar */

  return {
    //* Propiedades Sidebar
    isSidebarOpen,
    sidebarActiveItem,
    sidebarItems,

    //* Metodos Sidebar
    openSidebar,
    closeSidebar,
    setByUrlSidebarActiveItem,
    changeSidebarActiveItem,
    openSidebarActiveItem,
    openSidebarItem,
    closeAllSidebarItems,
    changeSidebarActiveOption,
  }
}