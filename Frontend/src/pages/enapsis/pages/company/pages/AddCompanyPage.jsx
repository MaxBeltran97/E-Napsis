import { useForm } from 'react-hook-form'

import { Grid } from '@mui/material'
import { GridForm, GridInput } from '@components/grid'
import { InputText } from '@components/input/generic'
import { InputComuna, InputEmail, InputPhoneNumber, InputRegion, InputRut } from '@components/input/specific'
import { ButtonSave } from '@components/button'

import { selectRegiones } from '@assets/select-regiones'
import { useCompanyStore } from '@hooks/useCompanyStore'

export const AddCompanyPage = () => {
  const { handleSubmit, getValues, setValue, formState: { errors }, control } = useForm()
  const { isLoading, startSavingCompany} = useCompanyStore()

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={'Registro de Empresa'} functionFromData={startSavingCompany}>
      <Grid item xs={12} lg={6}>
        <GridInput title={'Datos de la Empresa'}>
          <InputRut control={control} name={'RUT'} label={'rut'} required={true} error={errors.rut} />
          <InputText control={control} name={'Razón Social'} label={'socialReason'} required={true} error={errors.socialReason} />
          <InputText control={control} name={'Nombre de Fantasía'} label={'fantasyName'} required={true} error={errors.fantasyName} />
          <InputText control={control} name={'Giro'} label={'turn'} required={true} error={errors.turn} />
          <InputText control={control} name={'Dirección'} label={'address'} required={true} error={errors.address} />
          <InputRegion control={control} name={'Región'} label={'region'} required={true} error={errors.region} getValues={getValues} setValue={setValue} items={selectRegiones} labelComuna={'commune'} />
          <InputComuna control={control} name={'Comuna'} label={'commune'} required={true} error={errors.commune} getValues={getValues} labelRegion={'region'} />
          <InputText control={control} name={'Ciudad'} label={'city'} required={true} error={errors.city} />
        </GridInput>
      </Grid>
      
      <Grid item xs={12} lg={6}>
        <GridInput title={'Datos de Contacto'}>
          <InputText control={control} name={'Nombre Contacto'} label={'contactName'} error={errors.contactName} />
          <InputPhoneNumber control={control} name={'Teléfono Celular'} label={'cellPhone'} error={errors.cellPhone} identifier={'+56 9'} length={8} />
          <InputText control={control} name={'Cargo'} label={'position'} error={errors.position} />
          <InputEmail control={control} name={'Email'} label={'email'} error={errors.email} />
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={'Guardar Empresa'} errorTitle={'Error al Guardar'} isLoading={isLoading} errorsForm={false} />
    </GridForm>
  )
}
