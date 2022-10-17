import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleLoading, onHandleParticipants } from "@reduxSlices/participantSlice"

export const useParticipantStore = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeParticipant, participants } = useSelector(state => state.participant)
  
  const startGetParticipants = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/participant')
      dispatch(onHandleParticipants(data))
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  const startSavingParticipant = async (participant) => {
    dispatch(onHandleLoading(true))

    try {
      if(!(!!participant.company_id)) {
        participant = { ...participant, company_id: null }
      }
      const { data } = await enapsisApi.post('/participant', JSON.stringify(participant))
      console.log(data)
      navigate('../', {replace: true})
    } catch (error) {
      //TODO Manejar los errores que tira el backend
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
