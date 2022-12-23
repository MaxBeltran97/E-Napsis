import { Filter } from "@components/accordion"
import { InputAutocomplete, InputText } from "@components/input/generic"
import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { useTellerStore } from "@hooks/useTellerStore"
import { Button, Grid } from "@mui/material"
import { getTellersWithAutocomplete } from "@pages/enapsis/helpers"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const CalendarCourseFilter = ({ title }) => {

  const { tellers, startGetTellers } = useTellerStore()
  const { filterCalendarCourses } = useCalendarCourseStore()
  const { handleSubmit, control } = useForm()

  useEffect(() => {
    startGetTellers()
  }, [])

  const onSubmit = (data) => {
    event.preventDefault()
    filterCalendarCourses(data)
  }

  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Filter title={title}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} lg={6}>
              <InputText control={control} name={'Nombre Curso'} label={'name'} />
              <InputText control={control} name={'Código Interno'} label={'internalCode'} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <InputAutocomplete control={control} name={'Relator'} label={'teller_id'} items={getTellersWithAutocomplete(tellers)} />
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
