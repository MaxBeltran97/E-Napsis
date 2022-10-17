import { Divider, Grid, Typography } from "@mui/material"

export const CourseItem = ({ course }) => {

  const { _id, activityName, sence, instruction, totalHours, participantValue } = course

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'}>
        <Grid item xs={1}>
          <Typography sx={{ textAlign: 'center' }}>{_id}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{activityName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>{sence}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>{instruction}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{ textAlign: 'center'}}>{totalHours}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>$ {participantValue}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  )
}
