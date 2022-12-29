import { EmailOutlined } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"

export const EmailItem = ({ email }) => {
  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={11}>
          <Typography sx={{ pl: 1 }} >{email.title}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Ver Template'}>
                <IconButton>
                  <EmailOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 2 }}>
        <Divider />
      </Grid>
    </Grid>
  )
}
