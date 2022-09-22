import { ErrorOutlineOutlined, SaveOutlined } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Grid } from "@mui/material"

export const ButtonSave = ({ buttonTitle, errorTitle, isLoading, errorsForm }) => {
    return (
        <Grid container justifyContent={'center'} sx={{ mt: 3 }}>
            <LoadingButton type="submit"
                variant="outlined"
                loading={isLoading}
                color={(errorsForm) ? 'error' : 'primary'}
            >
                {
                    (errorsForm)
                    ? (
                        <>
                            <ErrorOutlineOutlined sx={{ mr: 1 }} />
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
