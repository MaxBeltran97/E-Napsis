import { selectRegiones } from "@assets/select-regiones"
import { Filter } from "@components/accordion"
import { InputSelect, InputText } from "@components/input/generic"
import { InputRegion, InputRut } from "@components/input/specific"
import { useCompanyStore } from "@hooks/useCompanyStore"
import { Button, Grid } from "@mui/material"
import { useForm } from "react-hook-form"


export const CompanyFilter = ({ title }) => {

  const { filterCompanies } = useCompanyStore()
  const { handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    event.preventDefault()
    filterCompanies(data)
  }

  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Filter title={title}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} lg={6}>
              <InputText control={control} name={'Nombre Empresa'} label={'name'} />
              <InputRut control={control} label={'rut'} dni={true} filter={true} filterName={'RUT'} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <InputRegion control={control} name={'Región'} label={'region'} items={selectRegiones}/>
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
