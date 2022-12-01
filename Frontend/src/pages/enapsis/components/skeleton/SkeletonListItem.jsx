import { Grid, Skeleton } from "@mui/material"

export const SkeletonListItem = () => {
  return (
    <>
      <Grid item xs={12}>
        <Skeleton variant="rounded" animation="wave" height={54} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rounded" animation="wave" height={54} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rounded" animation="wave" height={54} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rounded" animation="wave" height={54} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rounded" animation="wave" height={54} />
      </Grid>
    </>
  )
}
