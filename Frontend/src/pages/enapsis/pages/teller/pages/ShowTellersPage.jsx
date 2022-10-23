import { useEffect } from "react"

import { Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { TellerItem } from "../components"

import { useTellerStore } from "@hooks/useTellerStore"

export const ShowTellersPage = () => {

  const { isLoading, tellers, startGetTellers } = useTellerStore()

  useEffect(() => {
    startGetTellers()
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Relatores</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center' }}>Estado</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center' }}>Nombre</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }}>Usuario</Typography>
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
          isLoading
            ? <Grid item xs={12}> <Typography sx={{ textAlign: 'center' }}>Cargando...</Typography> </Grid>
            : (
              tellers.map((teller) => (
                <TellerItem key={teller._id} teller={teller} />
              ))
            )
        }
      </GridPaper>
    </>
  )
}
