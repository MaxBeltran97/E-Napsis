import { useEffect } from "react"

import { Button, Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { TellerCard, TellerFilter, TellerItem } from "../components"

import { useTellerStore } from "@hooks/useTellerStore"
import { SkeletonListItemV2 } from "@components/skeleton"
import { useState } from "react"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Filter } from "@components/accordion"

export const ShowTellersPage = () => {

  const { isLoading, tellers, startGetTellers, sortedTellersByName, sortedTellersByStatus } = useTellerStore()

  const [acending, setAcending] = useState(true)
  const [legendActive, setLegendActive] = useState('name') //status - name - user?

  useEffect(() => {
    startGetTellers()
  }, [])

  useEffect(() => {
    if (legendActive === 'name') {
      sortedTellersByName(acending)
    } else if (legendActive === 'status') {
      sortedTellersByStatus(acending)
    }
  }, [isLoading, legendActive, acending])

  const onClickLegend = (e, legend) => {
    if (legend === legendActive) {
      setAcending(!acending)
    } else {
      setLegendActive(legend)
      setAcending(true)
    }
  }

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Relatores</Typography>
      {/* Filtro */}
      <TellerFilter title={'Buscar por:'} />

      {/* TellerList */}
      <GridPaper>
        <Grid item xs={12} >
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={1}>
              {/* <Typography sx={{ textAlign: 'center' }}>Estado</Typography> */}
              <Button onClick={e => onClickLegend(e, 'status')}
                fullWidth
                endIcon={(legendActive == 'status') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'status') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Estado
              </Button>
            </Grid>
            <Grid item xs={4}>
              {/* <Typography sx={{ textAlign: 'center' }}>Nombre</Typography> */}
              <Button onClick={e => onClickLegend(e, 'name')}
                fullWidth
                endIcon={(legendActive == 'name') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'name') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Nombre
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Usuario</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Acciones</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Clave</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isLoading
            ? <SkeletonListItemV2 />
            : (
              tellers.map((teller) => (
                <TellerItem key={teller._id} teller={teller} />
              ))
            )
        }
      </GridPaper>
      {/* <Grid container spacing={1} sx={{ mt: 1 }}>
        {
          isLoading
            ? <SkeletonListItemV2 />
            : (
              tellers.map((teller) => (
                <Grid item xs={12} md={6} lg={4} xl={3} key={teller._id}>
                  <TellerCard teller={teller} />
                </Grid>
              ))
            )
        }
      </Grid> */}
    </>
  )
}
