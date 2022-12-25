import { radioBooleanActiveFilter } from "@assets/radio-data"
import { Filter } from "@components/accordion"
import { ButtonSave } from "@components/button"
import { InputRadio, InputText } from "@components/input/generic"
import { InputRut } from "@components/input/specific"
import { useTellerStore } from "@hooks/useTellerStore"
import { Button, Grid } from "@mui/material"
import { useForm } from "react-hook-form"

export const TellerFilter = ({ title }) => {

  const { filterTellers } = useTellerStore()
  const { handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    event.preventDefault()
    filterTellers(data)
  }

  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Filter title={title}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} md={8} lg={6} >
              <InputText control={control} name={'Nombre o Usuario'} label={'name_user'} />
              <InputRut control={control} label={'rut'} dni={true} filter={true} />
              <InputRadio control={control} name={'Estado'} label={'situation'} items={radioBooleanActiveFilter} defaultPos={2} />
            </Grid>
            <Grid container justifyContent={'center'} sx={{ mt: 3 }}>
              <Button type="submit"
                variant="outlined"
              >
                Aplicar Filtro
              </Button>
            </Grid>
          </Grid>
        </form>
      </Filter>
    </Grid>
  )
}