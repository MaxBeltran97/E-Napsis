import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleLoading, onHandleParticipants } from "@reduxSlices/participantSlice"
import { parseNull } from "@helpers/parseNull"

export const useParticipantStore = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeParticipant, participants } = useSelector(state => state.participant)
  
  const startGetParticipants = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/participant')
      if(data.ok) {
        dispatch(onHandleParticipants(data.participants))
      }
    } catch (error) {
      console.log(error.response)
    }
    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 500)
  }

  const startSavingParticipant = async (participant) => {
    dispatch(onHandleLoading(true))

    try {
      participant = { ...participant, company_id: parseNull(participant.company_id) }
      const { data } = await enapsisApi.post('/participant', JSON.stringify(participant), { headers: { 'Content-Type': 'application/json' } })
      if(data.ok) {
        navigate('../', {replace: true})
      }else {
        //TODO Manejar errores del formulario obtenidos del backend
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  const startSavingParticipantFile = async (form) => {
    dispatch(onHandleLoading(true))

    try {
      let formData = new FormData()
      formData.append('calendarCourse_id', form.calendarCourse_id)
      formData.append('company_id', form.company_id)
      formData.append('excel', form.excelParticipants[0].file)
      
      const { data } = await enapsisApi.post('/participant/uploadfile', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      if(data.ok) {
        console.log('wena wena')
        navigate('../', {replace: true})
      }else {
        //TODO Manejar errores del formulario obteniods del backend
      }
    } catch (error) {
      console.log(error.response)
    }

  }

  return {
    //* Propiedades
    isLoading,
    activeParticipant,
    participants,

    //* Metodos
    startGetParticipants,
    startSavingParticipant,
    startSavingParticipantFile
  }
}
