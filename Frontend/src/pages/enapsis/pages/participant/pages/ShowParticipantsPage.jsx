import { useEffect } from "react"

import { Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { ParticipantItem } from "../components"

import { useParticipantStore } from "@hooks/useParticipantStore"
import { useCompanyStore } from "@hooks/useCompanyStore"

export const ShowParticipantsPage = () => {

  const { participants, startGetParticipants } = useParticipantStore()
  const { isLoading ,startGetCompanies } = useCompanyStore()

  useEffect(() => {
    startGetCompanies()
  }, [])
  
  useEffect(() => {
    if(isLoading === false) {
      startGetParticipants()
    } 
  }, [isLoading])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Participantes</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }}>Nombre</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>RUT</Typography>
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
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      
        {
          participants.map((participant) => (
            <ParticipantItem key={participant._id} participant={participant} />
          ))
        }
      </GridPaper>

    </>
  )
}
