import { ErrorOutline, SaveOutlined } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Button, Grid } from "@mui/material"

export const ButtonsChangeSave = ({ buttonTitle, errorTitle, isLoading, errorsForm, onResetForm }) => {
  return (
    <Grid container justifyContent={'center'} columnSpacing={1} sx={{ mt: 3 }}>
      <Grid item>
        <LoadingButton type="submit"
          variant='outlined'
          loading={isLoading}
          color={(errorsForm) ? 'error' : 'primary'}
        >
          {
            (errorsForm)
              ? (
                <>
                  <ErrorOutline sx={{ mr: 1 }} />
                  {errorTitle}
                </>
              )
              : (
                <>
                  <SaveOutlined sx={{ mr: 1 }} />
                  {buttonTitle}
                </>
              )
          }
        </LoadingButton>
      </Grid>
      <Grid item>
        <Button onClick={onResetForm}
          variant='outlined'
          color="buttonTernary"
        >
          Cancelar
        </Button>
      </Grid>
    </Grid>
  )
}
