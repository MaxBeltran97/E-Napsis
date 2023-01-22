import enapsisApi from "@api/enapsisApi"
import { onHandleActiveContract, onHandleActiveEmail, onHandleActiveHoliday, onHandleCheckListLoading, onHandleChecklistSaves, onHandleCompanyData, onHandleContracts, onHandleContractsLoading, onHandleEmails, onHandleEmailsLoading, onHandleHolidayLoading, onHandleHolidays, onHandleNotices, onHandleNoticesLoading, onHandlePrivileges, onHandlePrivilegesRole, onHandleRole, onResetActiveContract, onResetActiveEmail, onResetActiveHoliday, onResetPrivilegesRole } from "@reduxSlices/settingSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useSettingStore = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    isHolidaysLoading, activeHoliday, holidays,
    isEmailsLoading, activeEmail, emails,
    isContractsLoading, activeContract, contracts,
    isNoticesLoading, notices,
    isCheckListLoading, checkListSaves,
    roles, privileges, privilegesRole,
    companyData
  } = useSelector(state => state.setting)

  /** Holiday */
  const startGetHolidays = async () => {
    dispatch(onHandleHolidayLoading(true))

    try {
      const { data } = await enapsisApi.get('/calendar/holiday')
      if (data.ok) {
        dispatch(onHandleHolidays(data.holidays))
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleHolidayLoading(false))
  }

  const startChangeHoliday = (holiday) => {
    holiday = {
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
        const { data } = await enapsisApi.put(`/calendar/holiday/${holiday._id}`, JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          const { data } = await enapsisApi.get('/calendar/holiday')
          if (data.ok) {
            dispatch(onHandleHolidays(data.holidays))
          }
        } else {
          //TODO Manejar errores del modificar
        }
      } catch (error) {
        console.log(error.response)
      }
    } else {
      try {
        const { data } = await enapsisApi.post('/calendar/holiday', JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          const { data } = await enapsisApi.get('/calendar/holiday')
          if (data.ok) {
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
      if (data.ok) {
        const { data } = await enapsisApi.get('/calendar/holiday')
        if (data.ok) {
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
      const { data } = await enapsisApi.put(`/calendar/holiday/${holiday._id}`, JSON.stringify(holiday), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        const { data } = await enapsisApi.get('/calendar/holiday')
        if (data.ok) {
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
      if (data.ok) {
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

    try {
      const { data } = await enapsisApi.put(`/templates/email/${email._id}`, JSON.stringify(email), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        dispatch(onHandleActiveEmail(data.templateEmail))
        return data.ok
      }
    } catch (error) {
      console.log(error.response)
    }

    return false
  }
  /** Fin Email */
  /** Contracts */
  const startGetContracts = async () => {
    dispatch(onHandleContractsLoading(true))

    try {
      const { data } = await enapsisApi.get('/templates/contract')
      if (data.ok) {
        dispatch(onHandleContracts(data.contracts))
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleContractsLoading(false))
  }

  const startGetContract = async (contract_id) => {

  }

  const startChangeContract = (contract) => {
    dispatch(onHandleActiveContract(contract))
  }

  const startResetContract = () => {
    dispatch(onResetActiveContract())
  }

  const startUpdateContract = async (contract) => {
    const signature = contract.representativeSignature
    
    delete contract.representativeSignature

    try {
      const { data } = await enapsisApi.put(`/templates/contract/${contract._id}`, JSON.stringify(contract), { headers: { 'Content-Type': 'application/json' } })
      if(data.ok) {
        if(typeof signature !== "string") {
          let formData = new FormData()
          formData.append('representativeSignature', signature)

          const {data} = await enapsisApi.put(`/templates/contract/upload_file/${contract._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          if(data.ok) {
            return data.ok
          }
        }
      }
    } catch (error) {
      console.log(error.response)
    }
    return false
  }
  /** Fin Contracts */
  /** Notices */
  const startGetNotices = async () => {
    dispatch(onHandleNoticesLoading(true))

    try {
      const { data } = await enapsisApi.get('/automatic_notices')

      if (data.ok) {
        data.notices.map((notice) => {
          let emailsArray = []

          notice.emails.map((email) => {
            emailsArray.push(email.email)
            return email
          })

          notice.emails = emailsArray.toString()
          return notice
        })

        dispatch(onHandleNotices(data.notices))
      }
    } catch (error) {
      console.log(error)
    }

    dispatch(onHandleNoticesLoading(false))
  }

  const startGetNotice = async (notice_id) => {

  }

  const startUpdateNotices = async (notices) => {
    let automatic_notices = []

    notices.noticesFields.map((notice) => {
      let emails_json = []
      const emails_split = notice.emails.split(',')

      emails_split.map((email) => {
        if (email != '') {
          emails_json.push({ email: email })
        }
        return email
      })

      notice.emails = emails_json

      automatic_notices.push(notice)

      return notice
    })

    try {
      const { data } = await enapsisApi.put('/automatic_notices', JSON.stringify({ automatic_notices }), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        const { data } = await enapsisApi.get('/automatic_notices')
        if (data.ok) {
          data.notices.map((notice) => {
            let emailsArray = []

            notice.emails.map((email) => {
              emailsArray.push(email.email)
              return email
            })

            notice.emails = emailsArray.toString()
            return notice
          })

          dispatch(onHandleNotices(data.notices))
        }
        
        return data.ok
      }
    } catch (error) {
      console.log(error.response)
    }

    return false
  }
  /** Fin Notices */
  /** CheckList */
  const startGetCheckListSaves = async () => {
    dispatch(onHandleCheckListLoading(true))

    try {
      const { data } = await enapsisApi.get('/check_list')
      if(data.ok) {
        dispatch(onHandleChecklistSaves(data.checkList))
      }
    } catch (error) {
      console.log(error)
    }

    dispatch(onHandleCheckListLoading(false))
  }

  const startSavingCheckList = async (checkList) => {
    dispatch(onHandleCheckListLoading(true))

    checkList.checkListActivities.map((activity) => {
      activity.date = new Date(activity.date).toISOString().slice(0, 19).replace('T', ' ')
      return activity
    })

    try {
      const { data } = await enapsisApi.post('/check_list', JSON.stringify(checkList), { headers: { 'Content-Type': 'application/json' } })
      if(data.ok) {
        navigate('../', { replace: true })
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleCheckListLoading(false))
  }
  /** Fin CheckList */
  /** Privileges  */
  const startGetRoles = async () => {
    try {
      const { data } = await enapsisApi.get('/privilege/role')
      if (data.ok) {
        dispatch(onHandleRole(data.roles))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const startGetPrivileges = async () => {
    try {
      const { data } = await enapsisApi.get('/privilege')
      if (data.ok) {
        dispatch(onHandlePrivileges(data.privileges))
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  const startGetPrivilegesRole = async (identifierRole) => {
    try {
      const { data } = await enapsisApi.get(`/privilege/role/${identifierRole}`)
      if (data.ok) {
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
      if (value === false) {
        delete newPrivileges[key]
      } else {
        privilege.push({ _id: privileges.filter((privilegeItem) => { return privilegeItem.name === key })[0]._id })
      }
    })

    try {
      const { data } = await enapsisApi.put(`/privilege/role/${identifierRole}`, JSON.stringify({ privilege }), { headers: { 'Content-Type': 'application/json' } })
      return data.ok
    } catch (error) {
      console.log(error.response)
    }
    return false
  }
  /** Fin Privileges */
  /** Company Data */
  const startGetCompanyData = async () => {
    try {
      const { data } = await enapsisApi.get('/company_data')
      if (data.ok) {
        dispatch(onHandleCompanyData(data.companyData[0]))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const startUpdateCompanyData = async (newCompanyData) => {
    try {
      const { data } = await enapsisApi.put(`/company_data/${newCompanyData._id}`, JSON.stringify(newCompanyData), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        dispatch(onHandleCompanyData(data.companyData))
        return data.ok
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }
  /** Fin Company Data */

  return {
    //* Propiedades Holiday
    isHolidaysLoading,
    activeHoliday,
    holidays,
    //* Propiedades Email
    isEmailsLoading,
    activeEmail,
    emails,
    //* Propiedades Contracts
    isContractsLoading,
    activeContract,
    contracts,
    //* Propiedades Notices
    isNoticesLoading,
    notices,
    //* Propiedades CheckList
    isCheckListLoading,
    checkListSaves,
    //* Propiedades Privileges
    roles,
    privileges,
    privilegesRole,
    //* Propiedades CompanyData
    companyData,

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
    //* Metodos Contracts
    startGetContracts,
    startGetContract,
    startChangeContract,
    startResetContract,
    startUpdateContract,
    //* Metodos Notices
    startGetNotices,
    startGetNotice,
    startUpdateNotices,
    //* Metodos CheckList
    startGetCheckListSaves,
    startSavingCheckList,
    //* Metodos Privileges
    startGetRoles,
    startGetPrivileges,
    startGetPrivilegesRole,
    startResetPrivilegesRole,
    startUpdatePrivilegesRole,
    //* Metodos CompanyData
    startGetCompanyData,
    startUpdateCompanyData
  }
}
