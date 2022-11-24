import { useEffect } from "react"

import { useCompanyStore } from "@hooks/useCompanyStore"
import { Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { CompanyItem } from "../components"

export const ShowCompaniesPage = () => {

  const { isLoading, companies, startGetCompanies } = useCompanyStore()

  useEffect(() => {
    startGetCompanies()
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Empresas</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center' }} >Nombre</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }} >RUT</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }} >Ejecutivo</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }}>Acciones</Typography>
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
              companies.map((company) => (
                <CompanyItem key={company._id} company={company} />
              ))
            )
        }
      </GridPaper>
    </>
  )
}
