import { attendanceRadio } from '@assets/attendanceRadio'
import { Divider, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

export const ParticipantAttendanceItem = ({ participantAttendance, index, control, error }) => {

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={9}>
          <Typography sx={{ pl: 1 }}>{participantAttendance.participant.fullName} {participantAttendance.participant.lastName} {participantAttendance.participant.motherLastName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={control}
            name={`participantsAttendanceFields[${index}].attendance`}
            defaultValue={''}

            render={({ field }) => (
              <RadioGroup {...field} row sx={{ justifyContent: 'space-around', flexWrap: 'nowrap' }}>
                {
                  attendanceRadio.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio size='small' />}
                      sx={{ m: 0 }}
                    />
                  ))
                }
              </RadioGroup>
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 0.5 }}>
        <Divider />
      </Grid>
    </Grid>
  )
}
