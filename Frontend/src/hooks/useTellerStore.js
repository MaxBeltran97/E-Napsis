import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleLoading, onHandleTellers } from "@reduxSlices/tellerSlice"
import { parseBool } from "@helpers"

export const useTellerStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeTeller, tellers } = useSelector(state => state.teller)

  const startGetTellers = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/teller')
      dispatch(onHandleTellers(data))
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  const startSavingTeller = async (teller) => {
    dispatch(onHandleLoading(true))

    try {
      const tellerFiles = teller.tellerFiles
      teller = { ...teller, 
        birthday: new Date(teller.birthday), 
        cellPhone: parseInt(teller.cellPhone),
        situation: parseBool(teller.situation),
        uploadFiles: parseBool(teller.uploadFiles),
        reuf: parseBool(teller.reuf)
      }
      delete teller.tellerFiles
      const { data } = await enapsisApi.post('/teller', JSON.stringify(teller))
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
    activeTeller,
    tellers,

    //* Metodos
    startGetTellers,
    startSavingTeller
  }
}
