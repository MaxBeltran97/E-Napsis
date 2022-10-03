import { useForm } from "react-hook-form"

import { Grid } from "@mui/material"
import { GridInput, GridPaper } from "@components/grid"
import { InputText } from "@components/input/generic"
import { InputEmail, InputPhoneNumber } from "@components/input/specific"
import { ButtonSave } from "@components/button"

export const FormCompanyContact = () => {
  const { handleSubmit, formState: { errors }, control } = useForm()
  
  const onSubmit = (data) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridPaper>
        <Grid item xs={12}>
          <GridInput title={'Datos de Contacto'}>
            <InputText control={control} name={'Nombre Contacto'} label={'contactName'} required={true} error={errors.contactName} />
            <InputPhoneNumber control={control} name={'Teléfono Celular'} label={'cellPhone'} required={true} error={errors.cellPhone} identifier={'+56 9'} length={8} />
            <InputText control={control} name={'Cargo'} label={'position'} error={errors.position} />
            <InputEmail control={control} name={'Email'} label={'email'} error={errors.email} />
          </GridInput>
        </Grid>

        <ButtonSave buttonTitle={'Guardar Contacto'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
      </GridPaper>
    </form>
  )
}
