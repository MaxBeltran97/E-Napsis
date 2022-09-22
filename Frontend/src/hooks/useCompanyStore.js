import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { onAddNewCompany, onHandleActiveCompany, onHandleLoading } from "../store/company/CompanySlice"

export const useCompanyStore = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, activeCompany, companies } = useSelector(state => state.company)

    const handleActiveCompany = (company) => {
        dispatch(onHandleActiveCompany(company))
    }

    const startSavingCompany = async(company) => {
        dispatch(onHandleLoading(true))
        //TODO: llegar al backend

        if(company._id) {
            // Actualizar
        }else {
            // Crear
            dispatch(onAddNewCompany({...company, _id: new Date().getTime()}))
        }

        dispatch(onHandleActiveCompany({})) //limpiar la compañia activa
        setTimeout(() => {
            dispatch(onHandleLoading(false))
            navigate('../mst-empresas', {replace: true})
        }, 1000)
    }

    return {
        //* Propiedades
        isLoading,
        activeCompany,
        companies,

        //* Metodos
        handleActiveCompany,
        startSavingCompany
    }
}
