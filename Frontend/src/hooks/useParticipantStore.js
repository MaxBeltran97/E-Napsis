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

  return {
    //* Propiedades
    isLoading,
    activeParticipant,
    participants,

    //* Metodos
    startGetParticipants,
    startSavingParticipant
  }
}
