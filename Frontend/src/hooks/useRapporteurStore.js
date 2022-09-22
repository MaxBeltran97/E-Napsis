import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { onAddNewRapporteur, onDeleteRapporteur, onHandleActiveRapporteur, onHandleLoading, onUpdateRapporteur } from "../store/rapporteur/RapporteurSlice"

export const useRapporteurStore = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, activeRapporteur, rapporteurs } = useSelector(state => state.rapporteur)

    const handleActiveRapporteur = (rapporteur) => {
        dispatch(onHandleActiveRapporteur(rapporteur))
    }

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

        dispatch(onHandleActiveRapporteur({}))
        setTimeout(() => {
            dispatch(onHandleLoading(false))
            navigate('../mst-relatores', {replace: true})
        }, 1000)
    }

    const startDeletingRapporteur = async(rapporteur) => {
        //TODO: llegar al backend
        dispatch(onDeleteRapporteur(rapporteur))
    }

    return {
        //* Propiedades
        isLoading,
        activeRapporteur,
        rapporteurs,

        //* Metodos
        handleActiveRapporteur,
        startFilterRapporteur,
        startSavingRapporteur,
        startDeletingRapporteur
    }
}
