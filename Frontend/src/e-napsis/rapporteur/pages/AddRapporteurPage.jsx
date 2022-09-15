import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { ErrorOutlineOutlined, SaveOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { LoadingButton } from '@mui/lab';

import { useRapporteurStore } from "../../../hooks/useRapporteurStore";

import { GridPaper } from "../../ui/components/grid"
import { InputDate, InputEmail, InputFile, InputNumber, InputPhoneNumber, InputRadio, InputRegionComuna, InputRut, InputSelect, InputText } from "../../ui/components/input"

import { radioBoolean, radioBooleanActive, tipoBanco, tipoContrato, tipoCuenta, tipoEspecialidad, tipoEstadoCivil } from '../../ui/data'

export const AddRapporteurPage = () => {

    const { isLoading, startSavingRapporteur } = useRapporteurStore()

    const { handleSubmit, setValue, formState: { errors }, control } = useForm()
    //TODO: pageLoading
    const [errorsForm, setErrorsForm] = useState(false)

    const onSubmit = (data) => {
        event.preventDefault()
        startSavingRapporteur(data)
    }

    useEffect(() => {
        if (Object.entries(errors).length === 0) {
            setErrorsForm(false)
        } else {
            setErrorsForm(true)
        }
    }, [Object.entries(errors).length])

    useEffect(() => {

    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Registro de Relator</Typography>
            <GridPaper>
                <Grid item xs={12} lg={6}>
                    <Typography sx={{ fontSize: '20px' }} >Datos Personales</Typography>

                    <Grid item sx={{ pl: 2, pr: 2 }}>
                        <InputText name={'Nombre'} label={'firstName'} required={true} control={control} error={errors.firstName} />
                        <InputText name={'Apellidos'} label={'lastName'} required={true} control={control} error={errors.lastName} />
                        <InputText name={'Nacionalidad'} label={'nationality'} control={control} />
                        {/* Rut o pasaporte */}
                        <InputRut name={'Rut o Pasaporte'} label={'rut'} required={true} control={control} error={errors.rut} />
                        {/*  */}
                        <InputEmail name={'Email'} label={'email'} required={true} control={control} error={errors.email} />
                        <InputPhoneNumber name={'Teléfono Celular'} label={'cellPhone'} identifier={'+56 9'} length={8} required={true} control={control} error={errors.cellPhone} />
                        <InputPhoneNumber name={'Teléfono Fijo'} label={'homePhone'} identifier={'+02'} length={8} control={control} error={errors.homePhone} />
                        <InputPhoneNumber name={'Teléfono Oficina'} label={'officePhone'} identifier={'+02'} length={8} control={control} error={errors.officePhone} />
                        <InputDate name={'Fecha de Nacimiento'} label={'birthday'} max={true} control={control} error={errors.birthday} />
                        <InputText name={'Profesión'} label={'profession'} required={true} control={control} error={errors.profession} />
                        <InputSelect name={'Especialidad'} label={'specialty'} items={tipoEspecialidad} required={true} control={control} error={errors.specialty} />
                        <InputSelect name={'Estado Civil'} label={'maritalStatus'} items={tipoEstadoCivil} control={control} error={errors.maritalStatus} />
                        <InputText name={'Dirección'} label={'address'} control={control} error={errors.address} />
                        <InputRegionComuna control={control} setValue={setValue} />
                        <InputRadio name={'Estado'} label={'condition'} items={radioBooleanActive} posDefault={0} control={control} />
                        <InputFile name={'Archivos Relevantes'} textButton={'Subir Archivos'} helperText={'CV, Títulos, Diplomas, etc.'} label={'rapporteurFiles'} allowedExtensions={['pdf', 'docx']} multiple={true} control={control} error={errors.rapporteurFiles} />
                        <InputFile name={'Firma'} textButton={'Subir Imagen'} helperText={'.jpeg, .jpg, .png'} label={'signature'} allowedExtensions={['jpeg', 'jpg', 'png']} control={control} error={errors.signature} />
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={6} sx={{ pl: { xs: 0, lg: 1 } }}>
                    <Grid item sx={{ mt: { xs: 2, lg: 0} }}>
                        <Typography sx={{ fontSize: '20px' }}>Tipo de Contrato</Typography>

                        <Grid item sx={{ pl: 2, pr: 2 }}>
                            <InputSelect name={'Contrato'} label={'contract'} defaultText={'Seleccione tipo de contrato'} items={tipoContrato} required={true} control={control} error={errors.contract} />
                        </Grid>
                    </Grid>

                    <Grid item sx={{ mt: 2 }}>
                        <Typography sx={{ fontSize: '20px' }}>Datos de Depósito</Typography>

                        <Grid item sx={{ pl: 2, pr: 2 }}>
                            <InputSelect name={'Banco'} label={'bank'} items={tipoBanco} required={true} control={control} error={errors.bank} />
                            {/* N* de Cuenta */}
                            <InputNumber name={'N° de Cuenta'} label={'bankAccountNumber'} minLength={9} maxLength={12} required={true} control={control} error={errors.bankAccountNumber} />
                            {/*  */}
                            <InputSelect name={'Tipo de Cuenta'} label={'bankAccount'} defaultText={'Seleccione tipo de cuenta'} items={tipoCuenta} required={true} control={control} error={errors.bankAccount} />
                        </Grid>
                    </Grid>

                    <Grid item sx={{ mt: 2 }}>
                        <Typography sx={{ fontSize: '20px' }}>Privilegios Adicionales</Typography>

                        <Grid item sx={{ pl: 2, pr: 2 }}>
                            <InputRadio name={'Subir Archivos por Curso'} label={'uploadFiles'} items={radioBoolean} posDefault={1} control={control} />
                            <InputRadio name={'Agregar Participantes'} label={'addParticipants'} items={radioBoolean} posDefault={1} control={control} />
                        </Grid>
                    </Grid>

                    <Grid item sx={{ mt: 2 }}>
                        <Typography sx={{ fontSize: '20px' }}>Información Adicional</Typography>

                        <Grid item sx={{ pl: 2, pr: 2 }}>
                            <InputRadio name={'REUF Actualizada'} label={'reuf'} items={radioBoolean} posDefault={1} control={control} />
                            <InputRadio name={'Acreditado'} label={'acredited'} items={radioBoolean} posDefault={1} control={control} />
                            <InputRadio name={'En proceso de Acreditación'} label={'acreditationProcess'} items={radioBoolean} posDefault={1} control={control} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <LoadingButton type="submit" variant="outlined" loading={isLoading} color={(errorsForm) ? 'error' : 'primary'}>
                        {
                            (errorsForm)
                                ? (
                                    <>
                                        <ErrorOutlineOutlined sx={{ mr: 1 }} />
                                        Error al guardar
                                    </>
                                )
                                : (
                                    <>
                                        <SaveOutlined sx={{ mr: 1 }} />
                                        Guardar Relator
                                    </>
                                )
                        }
                    </LoadingButton>
                </Grid>
            </GridPaper>
        </form>
    )
}