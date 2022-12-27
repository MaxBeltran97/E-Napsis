import { GridPaper } from "@components/grid"
import { SkeletonListItemV2 } from "@components/skeleton"
import { useUiStore } from "@hooks/useUiStore"
import { Divider, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { AddHoliday, HolidayItem } from "../components/holidaysComponents"

export const HolidaysPage = () => {

  const { isHolidaysLoading, holidays, startGetHolidays } = useUiStore()

  useEffect(() => {
    startGetHolidays()
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Gestión de Feriados</Typography>
      <AddHoliday />

      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none', pt: 1, pb: 1 }}>Fecha Feriado</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Nombre Feriado</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Acciones</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Actualizar</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isHolidaysLoading
           ? <SkeletonListItemV2 />
           : (
            holidays.map((holiday) => (
              <HolidayItem key={holiday._id} holiday={holiday} />
            ))
           )
        }
      </GridPaper>
    </>
  )
}
