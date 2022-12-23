import { useEffect, useState } from "react"

import { useCompanyStore } from "@hooks/useCompanyStore"
import { Button, Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { CompanyFilter, CompanyItem } from "../components"
import { SkeletonListItemV2 } from "@components/skeleton"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

export const ShowCompaniesPage = () => {

  const { isLoading, companies, startGetCompanies, sortedCompaniesByName, sortedCompaniesByRUT } = useCompanyStore()

  const [acending, setAcending] = useState(true)
  const [legendActive, setLegendActive] = useState('name') //name - rut

  useEffect(() => {
    startGetCompanies()
  }, [])

  useEffect(() => {
    if (legendActive === 'name') {
      sortedCompaniesByName(acending)
    } else if (legendActive === 'rut') {
      sortedCompaniesByRUT(acending)
    }
  }, [isLoading ,legendActive, acending])

  const onClickLegend = (e, legend) => {
    if(legend === legendActive) {
      setAcending(!acending)
    }else {
      setLegendActive(legend)
      setAcending(true)
    }
  }

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Empresas</Typography>
      {/* Filtro */}
      <CompanyFilter title={'Buscar por:'} />


      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={4}>
              {/* <Typography sx={{ textAlign: 'center' }} >Nombre</Typography> */}
              <Button onClick={e => onClickLegend(e, 'name')}
                fullWidth 
                endIcon={ (legendActive == 'name') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
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
              {/* <Typography sx={{ textAlign: 'center' }} >RUT</Typography> */}
              <Button onClick={e => onClickLegend(e, 'rut')}
                fullWidth 
                endIcon={ (legendActive == 'rut') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'rut') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                RUT
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }} >Ejecutivo</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Acciones</Typography>
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
              companies.map((company) => (
                <CompanyItem key={company._id} company={company} />
              ))
            )
        }
      </GridPaper>
    </>
  )
}
