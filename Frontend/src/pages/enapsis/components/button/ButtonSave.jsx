import { ErrorOutline, SaveOutlined } from "@mui/icons-material"
import { Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useEffect } from "react"

export const ButtonSave = ({ buttonTitle, errorTitle, isLoading, errorsForm }) => {

  useEffect(() => {
    if(errorsForm) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [errorsForm])
  

  return (
    <Grid container justifyContent={'center'} sx={{ mt: 3 }}>
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
  )
}
