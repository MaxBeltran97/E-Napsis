import { radioActivityTypeFilter, radioInstructionModality } from "@assets/radio-data"
import { Filter } from "@components/accordion"
import { InputRadio, InputSelect, InputText } from "@components/input/generic"
import { useCourseStore } from "@hooks/useCourseStore"
import { Button, Grid } from "@mui/material"
import { useForm } from "react-hook-form"

export const CourseFilter = ({ title }) => {

  const { filterCourses } = useCourseStore()
  const { handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    event.preventDefault()
    filterCourses(data)
  }

  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Filter title={title}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} lg={6}>
              <InputText control={control} name={'Nombre Curso'} label={'name'} />
              <InputText control={control} name={'Código Sence/Interno'} label={'sence'} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <InputRadio control={control} name={'Tipo de Actividad'} label={'activityType'} items={radioActivityTypeFilter} defaultPos={2} />
              <InputSelect control={control} name={'Modalidad de Instrucción'} label={'instruction'} items={radioInstructionModality} />
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