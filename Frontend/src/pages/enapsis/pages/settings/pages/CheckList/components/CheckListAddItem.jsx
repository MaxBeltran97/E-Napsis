import { Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import React from 'react'
import { Controller } from 'react-hook-form'
import { checkListRadio } from '../assets'

export const CheckListAddItem = ({ checkActivity, index, control, error, roleActive }) => {

  return (
    <>
      {
        (roleActive === checkActivity.roleActivity)
          ? (
            <Grid item xs={12}>
              <Grid container alignItems={'center'} columnSpacing={1}>
                <Grid item xs={1}>
                  <Typography sx={{ textAlign: 'center' }}>{checkActivity.order}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>{checkActivity.activity}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Controller
                    control={control}
                    name={`checkListActivities[${index}].status`}
                    defaultValue={''}

                    render={({ field }) => (
                      <RadioGroup {...field} row sx={{ justifyContent: 'space-around', flexWrap: 'nowrap' }}>
                        {
                          checkListRadio.map((item) => (
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

                    rules={{
                      required: {
                        value: true,
                        message: '*Este campo es obligatorio'
                      }
                    }}
                  />
                  
                </Grid>

                <Grid item xs={3} sx={{ pr: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocane={es}>
                    <Controller
                      control={control}
                      name={`checkListActivities[${index}].date`}
                      defaultValue=''

                      render={({ field }) => (
                        <DesktopDatePicker
                          {...field}
                          inputFormat={'dd/MM/yyyy'}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              size='small'
                              sx={{
                                bgcolor: 'background.main'
                              }}
                            />
                          )}
                        />
                      )}

                      rules={{
                        required: {
                          value: true,
                          message: '*Este campo es obligatorio'
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ mt: 0.5 }}>
                <Divider />
              </Grid>
            </Grid>
          )
          : null
      }
    </>
  )
}
