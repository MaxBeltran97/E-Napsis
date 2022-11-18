import { LoadingButton } from "@mui/lab"

export const ButtonLogin = ({ isLoading }) => {
  return (
    <LoadingButton type="submit"
      variant="outlined"
      loading={isLoading}
      color={'primary'}
      fullWidth
      size="large"
      sx={{ pt: 2, pb: 2 }}
    >
      Acceder
    </LoadingButton>
  )
}
