import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleActiveParticipant, onHandleLoading, onHandleParticipants, onResetActiveParticipant } from "@reduxSlices/participantSlice"
import { parseNull } from "@helpers/parseNull"
import { ADD_PARTICIPANTS, PARTICIPANTS } from "@models/privateRoutes"

export const useParticipantStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeParticipant, participants } = useSelector(state => state.participant)

  const startGetParticipants = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/participant')
      if (data.ok) {
        dispatch(onHandleParticipants(data.participants))
      }
    } catch (error) {
      console.log(error.response)
    }
    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 500)
  }

  const startGetParticipant = async (participant_id) => {
    try {
      const { data } = await enapsisApi.get(`/participant/${participant_id}`)
      if (data.ok) {
        return data.participant
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startChangeParticipant = (participant) => {
    participant = {
      ...participant,
      company_id: !!(participant.company_id) ? participant.company_id : '',
    }
    dispatch(onHandleActiveParticipant(participant))
    navigate(`${PARTICIPANTS}${ADD_PARTICIPANTS}`, { replace: true })
  }

  const startResetActiveParticipant = () => {
    dispatch(onResetActiveParticipant())
  }

  const startSavingParticipant = async (participant) => {
    dispatch(onHandleLoading(true))

    participant = { ...participant, company_id: parseNull(participant.company_id) }

    if (!!participant._id) {
      try {
        const { data } = await enapsisApi.put(`/participant/${participant._id}`, JSON.stringify(participant), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          navigate('../', { replace: true })
        } else {
          //TODO Manejar errores del modificar
        }
      } catch (error) {
        console.log(error.message)
      }
    } else {
      const { data } = await enapsisApi.post('/participant', JSON.stringify(participant), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        navigate('../', { replace: true })
      } else {
        //TODO Manejar errores del formulario obtenidos del backend
      }
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
      if (data.ok) {
        console.log('wena wena')
        navigate('../', { replace: true })
      } else {
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
    startGetParticipant,
    startChangeParticipant,
    startResetActiveParticipant,
    startSavingParticipant,
    startSavingParticipantFile
  }
}
