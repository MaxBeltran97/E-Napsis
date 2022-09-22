import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Grid } from "@mui/material"

import { GridInput, GridPaper } from "../../../components/grid"
import { InputEmail, InputPhoneNumber, InputText } from "../../../components/input"
import { ButtonSave } from "../../../components/button"

export const FormCompanyContact = () => {

    const { handleSubmit, formState: { errors }, control } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [errorsForm, setErrorsForm] = useState(false)

    const onSubmit = (data) => {
        event.preventDefault()
        console.log(data)
        setIsLoading(true)
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
                    <GridInput title={'Datos de Contacto'} >
                        <InputText name={'Nombre Contacto'} label={'contactName'} required={true} control={control} error={errors.contactName} />
                        <InputPhoneNumber name={'Teléfono Celular'} label={'cellPhone'} identifier={'+56 9'} length={8} required={true} control={control} error={errors.cellPhone} />
                        <InputText name={'Cargo'} label={'position'} control={control} error={errors.position} />
                        <InputEmail name={'Email'} label={'email'} control={control} error={errors.email} />
                    </GridInput>
                </Grid>

                <ButtonSave buttonTitle={'Guardar Contacto'} errorTitle={'Error al guardar'} isLoading={isLoading} errorsForm={errorsForm} />
            </GridPaper>
        </form>
    )
}