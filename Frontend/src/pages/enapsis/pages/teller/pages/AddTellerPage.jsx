import { useForm } from "react-hook-form"

import { Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputDate, InputFile, InputRadio, InputSelect, InputText } from "@components/input/generic"
import { InputComuna, InputEmail, InputFilesView, InputPhoneNumber, InputRegion, InputRut } from "@components/input/specific"
import { ButtonSave } from "@components/button"

import { radioBoolean, radioBooleanActive, radioNationalityType } from "@assets/radio-data"
import { selectMaritalStatus } from "@assets/select-data"
import { selectRegiones } from "@assets/select-regiones"
import { useTellerStore } from "@hooks/useTellerStore"

export const AddTellerPage = () => {
  const { handleSubmit, getValues, setValue, formState: { errors }, control } = useForm()
  const { isLoading, startSavingTeller } = useTellerStore()

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={'Registro de Relator'} functionFromData={startSavingTeller}>
      <Grid item xs={12} lg={6}>
        <GridInput title={'Datos Personales'}>
          <InputRadio control={control} name={'Tipo'} label={'nationalityType'} items={radioNationalityType} />
          <InputRut control={control} name={'RUT o Pasaporte'} label={'rut'} required={true} error={errors.rut} />
          <InputText control={control} name={'Nombres'} label={'fullName'} required={true} error={errors.fullName} />
          <InputText control={control} name={'Apellido Paterno'} label={'lastName'} required={true} error={errors.lastName} />
          <InputText control={control} name={'Apellido Materno'} label={'motherLastName'} required={true} error={errors.motherLastName} />
          <InputText control={control} name={'Nacionalidad'} label={'nationality'} error={errors.nationality} />
          <InputDate control={control} name={'Fecha de Nacimiento'} label={'birthday'} error={errors.birthday} maxDate={new Date()} />
          <InputText control={control} name={'Profesión'} label={'profession'} required={true} error={errors.profession} />
          <InputEmail control={control} name={'Email'} label={'email'} required={true} error={errors.email} />
          <InputPhoneNumber control={control} name={'Teléfono Celular'} label={'cellPhone'} required={true} error={errors.cellPhone} identifier={'+56 9'} length={8} />
          <InputSelect control={control} name={'Estado Civil'} label={'maritalStatus'} error={errors.maritalStatus} items={selectMaritalStatus} />
          <InputText control={control} name={'Dirección'} label={'address'} error={errors.address} />
          <InputRegion control={control} name={'Región'} label={'region'} error={errors.region} getValues={getValues} setValue={setValue} items={selectRegiones} labelComuna={'commune'} />
          <InputComuna control={control} name={'Comuna'} label={'commune'} error={errors.commune} getValues={getValues} labelRegion={'region'} />
          <InputRadio control={control} name={'Estado'} label={'situation'} items={radioBooleanActive} />
        </GridInput>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Grid item>
          <GridInput title={'Privilegios Adicionales'}>
            <InputRadio control={control} name={'Subir Achivos por Curso'} label={'uploadFiles'} items={radioBoolean} defaultPos={1} />
          </GridInput>
        </Grid>
        <Grid item sx={{ mt: 2 }}>
          <GridInput title={'Información Adicional'}>
            <InputRadio control={control} name={'REUF Actualizada'} label={'reuf'} items={radioBoolean} defaultPos={1} />
          </GridInput>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ pt: 0 }}>
        <GridInput title={'Archivos Relevantes'}>
          <InputFilesView control={control} name={'Archivos del Relator'} label={'tellerFiles'} error={errors.tellerFiles} multiple={true} helperText={'.pdf .docx .png .jpg'} textButton={'Subir Archivos'} allowedExtensions={['pdf', 'docx', 'png', 'jpg']} withSize={9.6} />
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={'Guardar Relator'} errorTitle={'Error al Guardar'} isLoading={isLoading} errorsForm={false} />
    </GridForm>
  )
}
