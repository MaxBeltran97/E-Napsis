import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Grid } from "@mui/material"

import { GridInput, GridPaper } from "../../../components/grid"
import { InputRegionComuna, InputRut, InputText } from "../../../components/input"
import { ButtonSave } from "../../../components/button"

import { useCompanyStore } from "../../../../hooks"

export const FormCompany = () => {

    const { isLoading, activeCompany, startSavingCompany } = useCompanyStore()

    const { handleSubmit, setValue, formState: { errors }, control } = useForm({ defaultValues: activeCompany })
    const [errorsForm, setErrorsForm] = useState(false)

    const onSubmit = (data) => {
        event.preventDefault()
        startSavingCompany(data)
    }

    useEffect(() => {
        if (Object.entries(errors).length === 0) {
            setErrorsForm(false)
        } else {
            setErrorsForm(true)
        }
    }, [Object.entries(errors).length])


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <GridPaper>
                <Grid item xs={12}>
                    <GridInput title={'Datos de la Empresa'} >
                        <InputRut name={'Rut'} label={'rut'} control={control} error={errors.rut} />
                        <InputText name={'Razón Social'} label={'rs'} required={true} control={control} error={errors.rs} />
                        <InputText name={'Nombre de Fantasía'} label={'fantasyName'} required={true} control={control} error={errors.fantasyName} />
                        <InputText name={'Giro'} label={'turn'} required={true} control={control} error={errors.turn} />
                        <InputText name={'Dirección'} label={'address'} required={true} control={control} error={errors.address} />
                        <InputRegionComuna required={true} control={control} setValue={setValue} errors={errors} />
                        <InputText name={'Ciudad'} label={'city'} required={true} control={control} error={errors.city} />
                    </GridInput>
                </Grid>

                <ButtonSave buttonTitle={'Guardar Empresa'} errorTitle={'Error al guardar'} isLoading={isLoading} errorsForm={errorsForm} />
            </GridPaper>
        </form>
    )
}
