import { Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

export const GradesItem = ({ gradeParticipant, index, control, error }) => {

  const isValidCalification = (value) => {
    if(value !== null) {
      if (value.length === 0) {
        return true
      }
      return /^((0|[1-7]{1})),(([0-9]{1}))$/.test(value)
    }
    return true
  }

  const isValidMinValue = (value) => {
    if(value !== null) {
      if (value.length === 0) {
        return true
      }
  
      const numberValue = parseFloat(value.replace(',','.'))
      if( numberValue < 1.0 ) {
        return false
      }
    }
    return true
  }

  const isValidMaxValue = (value) => {
    if(value !== null) {
      if (value.length === 0) {
        return true
      }
  
      const numberValue = parseFloat(value.replace(',','.'))
      if( numberValue > 7.0 ) {
        return false
      }
    }
    return true
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={8}>
          <Typography sx={{ pl: 1 }}>{gradeParticipant.participant.fullName} {gradeParticipant.participant.lastName} {gradeParticipant.participant.motherLastName}</Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Controller 
            control={control}
            name={`gradesFields[${index}].grade`}
            defaultValue={''}

            render={({ field }) => (
              <TextField 
                {...field}
                // fullWidth
                error={(!!error) ? !!(error[index]?.grade) : false}
                helperText={(!!error) ? !!(error[index]?.grade) ? error[index].grade.message : '' : ''}
                placeholder={'5,0'}
                autoComplete='off'
                size='small'
                sx={{
                  bgcolor: 'background.main',
                  '& .MuiFormHelperText-root': {
                    m: 0, pl: 0
                  }
                }}
              />
            )}

            rules={{
              validate: {
                checkCalification: value => isValidCalification(value) || '*Formato de nota inválida',
                checkMinValue: value => isValidMinValue(value) || `*Nota minima debe ser mayor o igual a 1,0`,
                checkMaxValue: value => isValidMaxValue(value) || `*Nota maxima debe ser menor o igual a 7,0`,
              }
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Divider />
      </Grid>
    </Grid>
  )
}
