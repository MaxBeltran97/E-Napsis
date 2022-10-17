import { useEffect } from "react"

import { useCompanyStore } from "@hooks/useCompanyStore"
import { Divider, Grid, Typography } from "@mui/material"
import { GridPaper } from "@components/grid"
import { CompanyItem } from "../components"

export const ShowCompaniesPage = () => {

  const { companies, startGetCompanies } = useCompanyStore()

  useEffect(() => {
    startGetCompanies()
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Empresas</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center' }} >Id</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }} >Razón Social</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }} >Nombre de Fantasia</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }} >RUT Empresa</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>

        {
          companies.map((company) => (
            <CompanyItem key={company._id} company={company} />
          ))
        }
      </GridPaper>
    </>
  )
}
