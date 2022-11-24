import { useEffect } from "react"

import { Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { ParticipantItem } from "../components"

import { useParticipantStore } from "@hooks/useParticipantStore"
import { useCompanyStore } from "@hooks/useCompanyStore"

export const ShowParticipantsPage = () => {

  const { isLoading ,participants, startGetParticipants } = useParticipantStore()

  useEffect(() => {
    startGetParticipants()
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Participantes</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }}>Nombre</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>RUT/DNI</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }}>Empresa</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }}>Acciones</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center' }}>Clave</Typography>
            </Grid>
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>
      
        {
          isLoading
          ? <Grid item xs={12}> <Typography sx={{ textAlign: 'center' }}>Cargando...</Typography> </Grid>
          : (
            participants.map((participant) => (
              <ParticipantItem key={participant._id} participant={participant} />
            ))
          )
        }
      </GridPaper>

    </>
  )
}
