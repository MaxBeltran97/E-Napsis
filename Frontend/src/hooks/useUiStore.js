import { useDispatch, useSelector } from "react-redux"

import { onChangeSidebarActiveItem, onChangeSidebarActiveOption, onCloseAllSidebarItems, onCloseSidebar, onHandleActiveHoliday, onHandleHolidayLoading, onHandleHolidays, onOpenSidebar, onOpenSidebarActiveItem, onOpenSidebarItem, onResetActiveHoliday } from "@reduxSlices/uiSlice"
import enapsisApi from "@api/enapsisApi"

export const useUiStore = () => {

  const dispatch = useDispatch()
  const { isSidebarOpen, sidebarActiveItem, sidebarItems, isHolidaysLoading, activeHoliday, holidays } = useSelector(state => state.ui)

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
  /** Holiday */
  const startGetHolidays = async () => {
    dispatch(onHandleHolidayLoading(true))

    try {
      const { data } = await enapsisApi.get('')
      if(data.ok) {
        dispatch(onHandleHolidays(data.holidays))
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleHolidayLoading(false))
  }

  const startChangeHoliday = (holiday) => {
    holiday ={
      ...holiday,
      day: new Date(holiday.day)
    }
    dispatch(onHandleActiveHoliday(holiday))

    setTimeout(() => {
      dispatch(onResetActiveHoliday())
    }, 100)
  }

  const startSavingHoliday = async (holiday) => {
    dispatch(onHandleHolidayLoading(true))

    holiday = {
      ...holiday,
      day: new Date(holiday.day).toISOString().slice(0, 19).replace('T', ' ')
    }
    console.log(holiday)

    if (!!holiday._id) {
      try {
        const { data } = await enapsisApi.put('', JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' }})
        if (data.ok) {
          const { data } = await enapsisApi.get('')
          if(data.ok) {
            dispatch(onHandleHolidays(data.holidays))
          }
        } else {
          //TODO Manejar errores del modificar
        }
      } catch (error) {
        console.log(error.response)
      }
    }else {
      try {
        const { data } = await enapsisApi.post('', JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' }})
        if (data.ok) {
          const { data } = await enapsisApi.get('')
          if(data.ok) {
            dispatch(onHandleHolidays(data.holidays))
          }
        } else {
          //TODO Manejar errores del agregar
        }
      } catch (error) {
        console.log(error.response)
      }
    }

    dispatch(onHandleHolidayLoading(false))
  }

  const startDeleteHoliday = async (holiday_id) => {
    dispatch(onHandleHolidayLoading(true))

      try {
        const { data } = await enapsisApi.delete('')
        if(data.ok) {
          const { data } = await enapsisApi.get('')
          if(data.ok) {
            dispatch(onHandleHolidays(data.holidays))
          } 
        }
      } catch (error) {
        console.log(error.response)
      }
    dispatch(onHandleHolidayLoading(false))
  }

  const startUpdateHoliday = async (holiday) => {
    dispatch(onHandleHolidayLoading(true))

    const day = holiday.day.getDate()
    const month = holiday.day.getMonth()
    const year = new Date().getFullYear()

    holiday = {
      ...holiday,
      day: new Date(year, month, day).toISOString().slice(0, 19).replace('T', ' ')
    }

    try {
      const { data } = await enapsisApi.put('', JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' }})
      if(data.ok) {
        const { data } = await enapsisApi.get('')
        if(data.ok) {
          dispatch(onHandleHolidays(data.holidays))
        } 
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleHolidayLoading(false))
  }
  /** Fin Holiday */

  return {
    //* Propiedades Sidebar
    isSidebarOpen,
    sidebarActiveItem,
    sidebarItems,
    //* Propiedades Holiday
    isHolidaysLoading,
    activeHoliday,
    holidays,

    //* Metodos Sidebar
    openSidebar,
    closeSidebar,
    setByUrlSidebarActiveItem,
    changeSidebarActiveItem,
    openSidebarActiveItem,
    openSidebarItem,
    closeAllSidebarItems,
    changeSidebarActiveOption,
    //* Metodos Holidays
    startGetHolidays,
    startChangeHoliday,
    startSavingHoliday,
    startDeleteHoliday,
    startUpdateHoliday
  }
}