import { LoadingButton } from "@mui/lab"

export const ButtonLogin = ({ loading }) => {
  return (
    <LoadingButton type="submit"
      variant="outlined"
      loading={loading}
      color={'primary'}
      fullWidth
      size="large"
      sx={{ pt: 1.5, pb: 1.5 }}
    >
      Acceder
    </LoadingButton>
  )
}
