import { useEffect, useState } from "react"

import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { ParticipantItem } from "../components"

import { useParticipantStore } from "@hooks/useParticipantStore"
import { useCompanyStore } from "@hooks/useCompanyStore"
import { SkeletonListItemV2 } from "@components/skeleton"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

export const ShowParticipantsPage = () => {

  const { isLoading, participants, startGetParticipants, sortedParticipantsByName, sortedParticipantsByRUT, sortedParticipantsByCompany } = useParticipantStore()

  const [acending, setAcending] = useState(true)
  const [legendActive, setLegendActive] = useState('name') // name - rut - company

  useEffect(() => {
    startGetParticipants()
  }, [])

  useEffect(() => {
    if (legendActive === 'name') {
      sortedParticipantsByName(acending)
    } else if (legendActive === 'rut') {
      sortedParticipantsByRUT(acending)
    } else if (legendActive === 'company') {
      sortedParticipantsByCompany(acending)
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
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Participantes</Typography>
      {/* Filtro */}

      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={3}>
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
            <Grid item xs={2}>
              {/* <Typography sx={{ textAlign: 'center' }}>RUT/DNI</Typography> */}
              <Button onClick={e => onClickLegend(e, 'rut')}
                fullWidth
                endIcon={(legendActive == 'rut') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'rut') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                RUT/DNI
              </Button>
            </Grid>
            <Grid item xs={3}>
              {/* <Typography sx={{ textAlign: 'center' }}>Empresa</Typography> */}
              <Button onClick={e => onClickLegend(e, 'company')}
                fullWidth
                endIcon={(legendActive == 'company') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'company') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Empresa
              </Button>
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
              participants.map((participant) => (
                <ParticipantItem key={participant._id} participant={participant} />
              ))
            )
        }
      </GridPaper>
    </>
  )
}
