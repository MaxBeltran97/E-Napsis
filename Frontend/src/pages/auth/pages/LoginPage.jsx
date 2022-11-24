import { Button, Grid, Icon, Paper, Typography } from "@mui/material"
import NapsisLogo from '@assets/napsis-logo.png'
import { InputUser } from "../components/InputUser"
import { useForm } from "react-hook-form"
import { InputPassword } from "../components/InputPassword"
import { ButtonLogin } from "../components/ButtonLogin"
import { useAuthStore } from "@hooks/useAuthStore"

export const LoginPage = () => {

  const { status, startLogin } = useAuthStore()
  const { handleSubmit, formState: { errors }, control } = useForm()

  const onSubmit = (data) => {
    event.preventDefault()
    startLogin(data)
  }

  return (
    <Grid container
      spacing={0}
      direction='column'
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ minHeight: '100vh', backgroundColor: 'background.default', padding: { xs: 1, sm: 4 } }}
    >
      <Grid item
        xs={3}
      >
        <Paper
          sx={{ width: { sm: 450 }, backgroundColor: 'background.main', p: 3, borderRadius: 2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              {/* <Grid item xs={12}>
                <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
                  <Grid item>
                    <Icon sx={{ display: 'flex', height: 45, width: 45 }}>
                      <img src={NapsisLogo} />
                    </Icon>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>e-Napsis</Typography>
                    <Typography sx={{ mb: 1, textAlign: 'center' }}>Capacitación</Typography>
                  </Grid>
                </Grid>
              </Grid> */}

              <Grid item xs={12} sx={{ mb: 1 }}>
                <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <Grid item>
                    <Icon sx={{ display: 'flex', height: 45, width: 45 }}>
                      <img src={NapsisLogo} />
                    </Icon>
                  </Grid>
                  <Grid item sx={{ pl: 1 }}>
                    <Typography variant="h5">e-Napsis</Typography>
                    <Typography>Capacitación</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Acceso Plataforma</Typography>
              </Grid>

              <Grid item xs={12} sx={{ mb: 3 }}>
                <InputUser control={control} label={'userName'} error={errors.userName} disabled={status === 'checking'} />
              </Grid>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <InputPassword control={control} label={'password'} error={errors.password} disabled={status === 'checking'} />
                <Button
                  sx={{ textTransform: 'initial !important' }}
                  disabled={status === 'checking'}
                >
                  ¿Has olvidado tu contraseña?
                </Button>
              </Grid>
              <Grid item xs={12}>
                <ButtonLogin loading={status === 'checking'} />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={3} sx={{ mt: 1 }}>
        <Typography sx={{ textAlign: 'center' }} >Todos los derechos reservados NAPSIS CAPACITACION Spa</Typography>
      </Grid>
    </Grid>
  )
}
