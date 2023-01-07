import enapsisApi from "@api/enapsisApi"
import { onHandleActiveEmail, onHandleActiveHoliday, onHandleEmails, onHandleEmailsLoading, onHandleHolidayLoading, onHandleHolidays, onHandlePrivileges, onHandlePrivilegesRole, onHandleRole, onResetActiveEmail, onResetActiveHoliday, onResetPrivilegesRole } from "@reduxSlices/settingSlice"
import { useDispatch, useSelector } from "react-redux"

export const useSettingStore = () => {

  const dispatch = useDispatch()
  const { isHolidaysLoading, activeHoliday, holidays, isEmailsLoading, activeEmail, emails, roles, privileges, privilegesRole} = useSelector(state => state.setting)

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
  /** Privileges  */
  const startGetRoles = async () => {
    try {
      const { data } = await enapsisApi.get('/privilege/role')
      if(data.ok) {
        dispatch(onHandleRole(data.roles))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const startGetPrivileges = async () => {
    try {
      const { data } = await enapsisApi.get('/privilege')
      if(data.ok) {
        dispatch(onHandlePrivileges(data.privileges))
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  const startGetPrivilegesRole = async (identifierRole) => {
    try {
      const { data } = await enapsisApi.get(`/privilege/role/${identifierRole}`)
      if(data.ok) {
        dispatch(onHandlePrivilegesRole(data.privileges))
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  const startResetPrivilegesRole = () => {
    dispatch(onResetPrivilegesRole())
  }

  const startUpdatePrivilegesRole = async (identifierRole, newPrivileges) => {
    const privilege = []

    delete newPrivileges.role
    Object.entries(newPrivileges).forEach(([key, value]) => {
      if(value === false){
        delete newPrivileges[key]
      }else {
        privilege.push({_id: privileges.filter((privilegeItem) => {return privilegeItem.name === key })[0]._id})
      }
    })

    try {
      const { data } = await enapsisApi.put(`/privilege/role/${identifierRole}`, JSON.stringify({privilege}), { headers: { 'Content-Type': 'application/json' }})
      if(data.ok) {
        //hacer algo
        console.log('quedo de pana')
      }
    } catch (error) {
      console.log(error.response)
    }

    // console.log(privilege)
    // console.log(identifierRole)
  }
  /** Fin Privileges */

  return {
    //* Propiedades Holiday
    isHolidaysLoading,
    activeHoliday,
    holidays,
    //* Propiedades Email
    isEmailsLoading,
    activeEmail,
    emails,
    //* Propiedades Privileges
    roles,
    privileges,
    privilegesRole,

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
    startUpdateEmail,
    //* Metodos Privileges
    startGetRoles,
    startGetPrivileges,
    startGetPrivilegesRole,
    startResetPrivilegesRole,
    startUpdatePrivilegesRole,
  }
}
