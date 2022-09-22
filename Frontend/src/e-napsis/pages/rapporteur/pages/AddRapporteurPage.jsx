import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Grid } from "@mui/material"

import { useRapporteurStore } from "../../../../hooks";

import { GridForm, GridInput } from "../../../components/grid"
import { InputDate, InputEmail, InputFile, InputPhoneNumber, InputRadio, InputRegionComuna, InputRut, InputSelect, InputText } from "../../../components/input"
import { ButtonSave } from "../../../components/button";

import { radioBoolean, radioBooleanActive, radioTipo, tipoEstadoCivil } from '../../../data'

export const AddRapporteurPage = () => {

    const { isLoading, activeRapporteur, startSavingRapporteur } = useRapporteurStore()

    const { handleSubmit, setValue, formState: { errors }, control } = useForm({ defaultValues: activeRapporteur })
    //TODO: pageLoading
    const [errorsForm, setErrorsForm] = useState(false)

    useEffect(() => {
        if (Object.entries(errors).length === 0) {
            setErrorsForm(false)
        } else {
            setErrorsForm(true)
        }
    }, [Object.entries(errors).length])

    useEffect(() => {
        // pageLoading
    }, [])

    return (
        <GridForm handleSubmit={handleSubmit} formTitle={'Registro de Relator'} functionFromData={startSavingRapporteur}>
            <Grid item xs={12} lg={6}>
                <GridInput title={'Datos Personales'}>
                    <InputRadio name={'Tipo'} label={'type'} items={radioTipo} posDefault={0} control={control} />
                    <InputRut name={'Rut o Pasaporte'} label={'rut'} required={true} control={control} error={errors.rut} />
                    <InputText name={'Nombres'} label={'names'} required={true} control={control} error={errors.names} />
                    <InputText name={'Apellido Paterno'} label={'lastName'} required={true} control={control} error={errors.lastName} />
                    <InputText name={'Apellido Materno'} label={'motherLastName'} required={true} control={control} error={errors.motherLastName} />
                    <InputText name={'Nacionalidad'} label={'nationality'} control={control} />
                    <InputDate name={'Fecha de Nacimiento'} label={'birthday'} max={true} control={control} error={errors.birthday} />
                    <InputText name={'Profesión'} label={'profession'} required={true} control={control} error={errors.profession} />
                    <InputEmail name={'Email'} label={'email'} required={true} control={control} error={errors.email} />
                    <InputPhoneNumber name={'Teléfono Celular'} label={'cellPhone'} identifier={'+56 9'} length={8} required={true} control={control} error={errors.cellPhone} />
                    <InputSelect name={'Estado Civil'} label={'maritalStatus'} items={tipoEstadoCivil} control={control} error={errors.maritalStatus} />
                    <InputText name={'Dirección'} label={'address'} control={control} error={errors.address} />
                    <InputRegionComuna control={control} setValue={setValue} errors={errors} />
                    <InputRadio name={'Estado'} label={'condition'} items={radioBooleanActive} posDefault={0} control={control} />
                    <InputFile name={'Archivos Relevantes'} textButton={'Subir Archivos'} helperText={'CV, Títulos, Diplomas, etc.'} label={'rapporteurFiles'} allowedExtensions={['pdf', 'docx']} multiple={true} control={control} error={errors.rapporteurFiles} />
                </GridInput>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Grid item>
                    <GridInput title={'Privilegios Adicionales'}>
                        <InputRadio name={'Subir Archivos por Curso'} label={'uploadFiles'} items={radioBoolean} posDefault={1} control={control} />
                    </GridInput>
                </Grid>

                <Grid item sx={{ mt: 2 }}>
                    <GridInput title={'Información Adicional'}>
                        <InputRadio name={'REUF Actualizada'} label={'reuf'} items={radioBoolean} posDefault={1} control={control} />
                    </GridInput>
                </Grid>
            </Grid>

            <ButtonSave buttonTitle={'Guardar Relator'} errorTitle={'Error al guardar'} isLoading={isLoading} errorsForm={errorsForm} />
        </GridForm>
    )
}