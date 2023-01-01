import { SETTINGS, TEMPLATE_EMAILS } from "@models/privateRoutes"
import { EmailOutlined } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const EmailItem = ({ email }) => {

  const navigate = useNavigate()

  const routeTemplate = () => {
    navigate(`${SETTINGS}${TEMPLATE_EMAILS}/${email._id}`, {replace: true})
  }

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
                <IconButton onClick={routeTemplate}>
                  <EmailOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Divider />
      </Grid>
    </Grid>
  )
}
