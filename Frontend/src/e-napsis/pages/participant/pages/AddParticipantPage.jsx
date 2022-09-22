import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Grid } from "@mui/material"

import { GridForm, GridInput } from "../../../components/grid"
import { InputEmail, InputRadio, InputRut, InputText } from "../../../components/input"
import { ButtonSave } from "../../../components/button"

import { radioTipo } from "../../../data"

export const AddParticipantPage = () => {

    const { handleSubmit, formState: {errors}, control } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [errorsForm, setErrorsForm] = useState(false)

    useEffect(() => {
        if (Object.entries(errors).length === 0) {
            setErrorsForm(false)
        } else {
            setErrorsForm(true)
        }
    }, [Object.entries(errors).length])

    const onSubmit = (data) => {
        event.preventDefault()
        console.log(data)
        setIsLoading(true)
    } 

    return (
        <GridForm handleSubmit={handleSubmit} formTitle={'Registro de Participante'} functionFromData={onSubmit} >
            <Grid item xs={12}>
                <GridInput title={'Datos Personales'}>
                    <Grid container columnSpacing={4} rowSpacing={0}>
                        <Grid item xs={12} lg={6}>
                            {/* Calendario Cursos */}
                            {/* Tipo Participante */}
                            {/* Empresa */}
                            <InputRadio name={'Nacionalidad'} label={'nationality'} items={radioTipo} posDefault={0} control={control} />
                            <InputRut name={'Rut o Pasaporte'} label={'rut'} required={true} control={control} error={errors.rut} />
                            <InputText name={'Nombres'} label={'names'} required={true} control={control} error={errors.names} />
                            <InputText name={'Apellido Paterno'} label={'lastName'} required={true} control={control} error={errors.lastName} />
                            <InputText name={'Apellido Materno'} label={'motherLastName'} required={true} control={control} error={errors.motherLastName} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <InputText name={'Establecimiento'} label={'institution'} control={control} error={errors.institution} />
                            <InputEmail name={'Email'} label={'email'} required={true} control={control} error={errors.email} />
                            {/* Genero */}
                            <InputText name={'Cargo Desempeñado'} label={'position'} control={control} error={errors.position} />
                        </Grid>
                    </Grid>
                </GridInput>
            </Grid>

            <ButtonSave buttonTitle={'Guardar Participante'} errorTitle={'Error al guardar'} isLoading={isLoading} errorsForm={errorsForm} />
        </GridForm>
    )
}
