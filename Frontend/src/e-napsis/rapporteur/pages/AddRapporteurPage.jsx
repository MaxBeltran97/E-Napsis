import { useForm } from "react-hook-form"

import { Grid, Input, Typography } from "@mui/material"
import { GridInputs } from "../../ui/components/grid/GridInputs"

import { InputEmail, InputPhoneNumber, InputRadio, InputSelect, InputText } from "../../ui/components/input"

export const AddRapporteurPage = () => {
    const { handleSubmit, formState: { errors }, control, getValues } = useForm()

    const onSubmit = (data) => {
        event.preventDefault()
        console.log(data)
        // console.log(control._formValues.firstName)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Registro de Relator</Typography>
            <Grid container>

                <Grid item xs={12} lg={6}>
                    <GridInputs title={'Datos Personales'}>
                        <InputText name={'Nombre'} label={'firstName'} required={true} control={control} error={errors.firstName} />
                        <InputText name={'Apellidos'} label={'lastName'} required={true} control={control} error={errors.lastName} />
                        <InputText name={'Nacionalidad'} label={'nationality'} control={control} />
                        {/* Rut o pasaporte */}
                        <InputEmail name={'Email'} label={'email'} required={true} control={control} error={errors.email} />
                        <InputPhoneNumber name={'Teléfono Celular'} label={'cellPhone'} identifier={'+56 9'} length={8} required={true} control={control} error={errors.cellPhone} />
                        <InputPhoneNumber name={'Teléfono Fijo'} label={'homePhone'} identifier={'+02'} length={8} control={control} error={errors.homePhone} />
                        <InputPhoneNumber name={'Teléfono Oficina'} label={'officePhone'} identifier={'+02'} length={8} control={control} error={errors.officePhone} />
                        {/* Fecha de nacimiento */}
                        <InputText name={'Profesión'} label={'profession'} required={true} control={control} error={errors.profession} />
                        <InputSelect name={'Especialidad'} label={'specialty'} items={[{}]} required={true} control={control} error={errors.specialty} />
                        <InputSelect name={'Estado Civil'} label={'maritalStatus'} items={[{}]} control={control} error={errors.maritalStatus} />
                        <InputText name={'Dirección'} label={'address'} control={control} error={errors.address} />
                        {/* Region */}
                        {/* Comuna */}
                        <InputRadio name={'Estado'} label={'condition'} items={['Activo', 'No Activo']} itemDefault={0} control={control} />
                        {/* Curriculum */}
                        {/* Firma */}
                    </GridInputs>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <GridInputs title={'Tipo de Contrato'}>
                        <InputSelect name={'Contrato'} label={'contract'} defaultText={'Seleccione tipo de contrato'} items={[{}]} required={true} control={control} error={errors.contract} />
                    </GridInputs>
                    <GridInputs title={'Datos de Depósito'}>
                        <InputSelect name={'Banco'} label={'bank'} items={[{}]} required={true} control={control} error={errors.bank} />
                        {/* N* de Cuenta */}
                        <InputSelect name={'Tipo de Cuenta'} label={'bankAccount'} defaultText={'Seleccione tipo de cuenta'} items={[{}]} required={true} control={control} error={errors.bankAccount} />
                    </GridInputs>
                    <GridInputs title={'Privilegios Adicionales'}>
                        <InputRadio name={'Subir Archivos por Curso'} label={'uploadFiles'} items={['Si', 'No']} itemDefault={1} control={control} />
                        <InputRadio name={'Agregar Participantes'} label={'addParticipants'} items={['Si', 'No']} itemDefault={1} control={control} />
                    </GridInputs>
                    <GridInputs title={'Información Adicional'}>
                        <InputRadio name={'REUF Actualizada'} label={'reuf'} items={['Si', 'No']} itemDefault={1} control={control} />
                        <InputRadio name={'Acreditado'} label={'acredited'} items={['Si', 'No']} itemDefault={1} control={control} />
                        <InputRadio name={'En proceso de Acreditación'} label={'acreditationProcess'} items={['Si', 'No']} itemDefault={1} control={control} />
                    </GridInputs>
                </Grid>
            </Grid>

            <Input type="submit" />
        </form>
    )
}