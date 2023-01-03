import enapsisApi from "@api/enapsisApi"
import { onHandleActiveEmail, onHandleActiveHoliday, onHandleEmails, onHandleEmailsLoading, onHandleHolidayLoading, onHandleHolidays, onResetActiveEmail, onResetActiveHoliday } from "@reduxSlices/settingSlice"
import { useDispatch, useSelector } from "react-redux"

export const useSettingStore = () => {

  const dispatch = useDispatch()
  const { isHolidaysLoading, activeHoliday, holidays, isEmailsLoading, activeEmail, emails} = useSelector(state => state.setting)

  /** Holiday */
  const startGetHolidays = async () => {
    dispatch(onHandleHolidayLoading(true))

    try {
      const { data } = await enapsisApi.get('/calendar/holiday')
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
      date: new Date(holiday.date)
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
      date: new Date(holiday.date).toISOString().slice(0, 19).replace('T', ' ')
    }

    if (!!holiday._id) {
      try {
        const { data } = await enapsisApi.put(`/calendar/holiday/${holiday._id}`, JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' }})
        if (data.ok) {
          const { data } = await enapsisApi.get('/calendar/holiday')
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
        const { data } = await enapsisApi.post('/calendar/holiday', JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' }})
        if (data.ok) {
          const { data } = await enapsisApi.get('/calendar/holiday')
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
        const { data } = await enapsisApi.delete(`/calendar/holiday/${holiday_id}`)
        if(data.ok) {
          const { data } = await enapsisApi.get('/calendar/holiday')
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

    holiday = {
      ...holiday,
      date: new Date(holiday.date)
    }
    const day = holiday.date.getDate()
    const month = holiday.date.getMonth()
    const year = new Date().getFullYear()

    holiday = {
      ...holiday,
      date: new Date(year, month, day).toISOString().slice(0, 19).replace('T', ' ')
    }

    try {
      const { data } = await enapsisApi.put(`/calendar/holiday/${holiday._id}`, JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' }})
      if(data.ok) {
        const { data } = await enapsisApi.get('/calendar/holiday')
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
  /** Email */
  const startGetEmails = async () => {
    dispatch(onHandleEmailsLoading(true))

    try {
      const { data } = await enapsisApi.get('/templates/email')
      if(data.ok) {
        dispatch(onHandleEmails(data.templateEmails))
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleEmailsLoading(false))
  }

  const startGetEmail = async (email_id) => {
    try {
      const { data } = await enapsisApi.get(`/templates/email/${email_id}`)
      if (data.ok) {
        return data.templateEmail
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startChangeEmail = (email) => {
    dispatch(onHandleActiveEmail(email))
  }

  const startResetEmail = () => {
    dispatch(onResetActiveEmail())
  }

  const startUpdateEmail = async (email) => {
    dispatch(onHandleEmailsLoading(true))

    try {
      const { data } = await enapsisApi.put(`/templates/email/${email._id}`, JSON.stringify(email), { headers: { 'Content-Type': 'application/json' }})
      if(data.ok) {
        dispatch(onHandleActiveEmail(data.templateEmail))
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleEmailsLoading(false))
  }
  /** Fin Email */

  return {
    //* Propiedades Holiday
    isHolidaysLoading,
    activeHoliday,
    holidays,
    //* Propiedades Email
    isEmailsLoading,
    activeEmail,
    emails,

    //* Metodos Holidays
    startGetHolidays,
    startChangeHoliday,
    startSavingHoliday,
    startDeleteHoliday,
    startUpdateHoliday,
    //* Metodos Emails
    startGetEmails,
    startGetEmail,
    startChangeEmail,
    startResetEmail,
    startUpdateEmail
  }
}
