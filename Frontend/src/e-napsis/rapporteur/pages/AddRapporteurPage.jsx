import { useForm } from "react-hook-form"

import { Grid, Input, Typography } from "@mui/material"
import { GridInputs } from "../../ui/components/grid/GridInputs"

import { InputDate, InputEmail, InputFile, InputPhoneNumber, InputRadio, InputRegionComuna, InputSelect, InputText } from "../../ui/components/input"

import { radioBoolean, radioBooleanActive, tipoBanco, tipoContrato, tipoCuenta, tipoEspecialidad } from '../../ui/data'

export const AddRapporteurPage = () => {
    const { handleSubmit, setValue, formState: { errors }, control } = useForm()

    const onSubmit = (data) => {
        event.preventDefault()
        console.log(data)
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
                        <InputDate name={'Fecha de Nacimiento'} label={'birthday'} max={true} control={control} error={errors.birthday} />
                        <InputText name={'Profesión'} label={'profession'} required={true} control={control} error={errors.profession} />
                        <InputSelect name={'Especialidad'} label={'specialty'} items={tipoEspecialidad} required={true} control={control} error={errors.specialty} />
                        <InputSelect name={'Estado Civil'} label={'maritalStatus'} items={[]} control={control} error={errors.maritalStatus} />
                        <InputText name={'Dirección'} label={'address'} control={control} error={errors.address} />
                        <InputRegionComuna control={control} setValue={setValue} />
                        <InputRadio name={'Estado'} label={'condition'} items={radioBooleanActive} posDefault={0} control={control} />
                        <InputFile name={'Archivos Relevantes'} textButton={'Subir Archivos'} helperText={'CV, Títulos, Diplomas, etc.'} label={'rapporteurFiles'} allowedExtensions={['pdf' ,'docx']} multiple={true} control={control} error={errors.rapporteurFiles} />
                        <InputFile name={'Firma'} textButton={'Subir Imagen'} helperText={'.jpeg, .jpg, .png'} label={'signature'} allowedExtensions={['jpeg' ,'jpg', 'png']} control={control} error={errors.signature} />
                    </GridInputs>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <GridInputs title={'Tipo de Contrato'}>
                        <InputSelect name={'Contrato'} label={'contract'} defaultText={'Seleccione tipo de contrato'} items={tipoContrato} required={true} control={control} error={errors.contract} />
                    </GridInputs>
                    <GridInputs title={'Datos de Depósito'}>
                        <InputSelect name={'Banco'} label={'bank'} items={tipoBanco} required={true} control={control} error={errors.bank} />
                        {/* N* de Cuenta */}
                        <InputSelect name={'Tipo de Cuenta'} label={'bankAccount'} defaultText={'Seleccione tipo de cuenta'} items={tipoCuenta} required={true} control={control} error={errors.bankAccount} />
                    </GridInputs>
                    <GridInputs title={'Privilegios Adicionales'}>
                        <InputRadio name={'Subir Archivos por Curso'} label={'uploadFiles'} items={radioBoolean} posDefault={1} control={control} />
                        <InputRadio name={'Agregar Participantes'} label={'addParticipants'} items={radioBoolean} posDefault={1} control={control} />
                    </GridInputs>
                    <GridInputs title={'Información Adicional'}>
                        <InputRadio name={'REUF Actualizada'} label={'reuf'} items={radioBoolean} posDefault={1} control={control} />
                        <InputRadio name={'Acreditado'} label={'acredited'} items={radioBoolean} posDefault={1} control={control} />
                        <InputRadio name={'En proceso de Acreditación'} label={'acreditationProcess'} items={radioBoolean} posDefault={1} control={control} />
                    </GridInputs>
                </Grid>
            </Grid>

            <Input type="submit" />
        </form>
    )
}