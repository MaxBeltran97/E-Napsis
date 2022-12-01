import { Grid, Icon, Typography } from "@mui/material"
import NapsisLogo from '@assets/napsis-logo.png'

export const SkeletonListItemV2 = () => {
  return (
    <Grid item xs={12} sx={{ mt: 5, mb: 5 }}>
      <Grid container direction={'column'} alignItems={'center'}>
        <Grid item>
          <Icon
            sx={{
              display: 'flex', height: 45, width: 45,
              animation: "spin 2s ease-out infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(0deg)"
                },
                "100%": {
                  transform: "rotate(360deg)"
                },
              },
            }}
          >
            <img src={NapsisLogo} />
          </Icon>
        </Grid>
        <Grid item>
          <Typography>Cargando...</Typography>
        </Grid>
      </Grid>

    </Grid>
  )
}
