import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { onAddNewRapporteur, onDeleteRapporteur, onHandleLoading, onUpdateRapporteur } from "../store/rapporteur/RapporteurSlice"

export const useRapporteurStore = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, rapporteurs } = useSelector(state => state.rapporteur)

    const startFilterRapporteur = async(filters) => {
        dispatch(onHandleLoading(true))
        //TODO: obtener del backend
        console.log(filters)
        dispatch(onHandleLoading(false))
    }

    const startSavingRapporteur = async(rapporteur) => {
        dispatch(onHandleLoading(true))
        //TODO: llegar al backend

        if(rapporteur._id) {
            // Actualizando
            dispatch(onUpdateRapporteur(rapporteur))
        }else {
            // Creando
            dispatch(onAddNewRapporteur({...rapporteur, _id: new Date().getTime()}))
        }

        setTimeout(() => {
            dispatch(onHandleLoading(false))
            navigate('../mst-relatores', {replace: true})
        }, 2000)
    }

    const startDeletingRapporteur = async(rapporteur) => {
        //TODO: llegar al backend
        dispatch(onDeleteRapporteur(rapporteur))
    }

    return {
        //* Propiedades
        isLoading,
        rapporteurs,

        //* Metodos
        startFilterRapporteur,
        startSavingRapporteur,
        startDeletingRapporteur
    }
}
