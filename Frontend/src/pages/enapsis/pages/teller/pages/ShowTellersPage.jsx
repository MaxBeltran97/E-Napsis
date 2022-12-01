import { useEffect } from "react"

import { Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { TellerItem } from "../components"

import { useTellerStore } from "@hooks/useTellerStore"
import { SkeletonListItem } from "@components/skeleton"

export const ShowTellersPage = () => {

  const { isLoading, tellers, startGetTellers, sortedTellersByName } = useTellerStore()

  useEffect(() => {
    startGetTellers()
  }, [])

  useEffect(() => {
    sortedTellersByName()
  }, [isLoading])
  

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Relatores</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
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
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isLoading
            ? <SkeletonListItem />
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
