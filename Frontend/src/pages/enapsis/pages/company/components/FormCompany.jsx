import { useForm } from 'react-hook-form'

import { Grid } from '@mui/material'
import { GridInput, GridPaper } from '@components/grid'
import { InputText } from '@components/input/generic'
import { InputComuna, InputRegion, InputRut } from '@components/input/specific'
import { ButtonSave } from '@components/button'

import { selectRegiones } from '@assets/select-regiones'

export const FormCompany = () => {
  const { handleSubmit, getValues, setValue, formState: { errors }, control } = useForm()

  const onSubmit = (data) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridPaper>
        <Grid item xs={12}>
          <GridInput title={'Datos de la Empresa'}>
            <InputRut control={control} name={'RUT'} label={'rut'} error={errors.rut} />
            <InputText control={control} name={'Razón Social'} label={'rs'} required={true} error={errors.rs} />
            <InputText control={control} name={'Nombre de Fantasía'} label={'fantasyName'} required={true} error={errors.fantasyName} />
            <InputText control={control} name={'Giro'} label={'turn'} required={true} error={errors.turn} />
            <InputText control={control} name={'Dirección'} label={'address'} required={true} error={errors.address} />
            <InputRegion control={control} name={'Región'} label={'region'} required={true} error={errors.region} getValues={getValues} setValue={setValue} items={selectRegiones} labelComuna={'commune'} />
            <InputComuna control={control} name={'Comuna'} label={'commune'} required={true} error={errors.commune} getValues={getValues} labelRegion={'region'} />
            <InputText control={control} name={'Ciudad'} label={'city'} required={true} error={errors.city} />
          </GridInput>
        </Grid>

        <ButtonSave buttonTitle={'Guardar Empresa'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
      </GridPaper>
    </form>
  )
}
