import { SkeletonListItemV2 } from "@components/skeleton"
import { useSettingCompanyStore } from "@hooks/useSettingCompanyStore"
import { Box, Divider, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { AddLogo } from "./AddLogo"
import { LogoItem } from "./components"

export const LogosPage = () => {

  const { isLogosLoading, logos, startGetLogos } = useSettingCompanyStore()

  useEffect(() => {
    startGetLogos()
  }, [])

  return (
    <Box sx={{ pl: 1, pr: 1 }}>
      <AddLogo />
      <Divider sx={{ mt: 2 }} />

      <Typography sx={{ fontSize: '20px', mt: 2, mb: 1 }}>Lista de Logos</Typography>

      <Grid container 
        sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5 }}
      >
        <Grid item xs={12} sx={{ pt: 1 }}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none', pt: 1, pb: 1 }} >Título</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }} >Codigo</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }} >Acciones</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isLogosLoading
           ? <SkeletonListItemV2 />
           : (
            logos.map((logo) => (
              <LogoItem key={logo._id} logo={logo} />
            ))
           )
        }
      </Grid>
    </Box>
  )
}
