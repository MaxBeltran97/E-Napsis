import { GridPaper } from '@components/grid'
import { Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'

export const AutomaticNoticeItem = ({ notice, index, control, error }) => {
  
  const isValidEmails = (emails) => {
    if(emails.length === 0) {
      return true
    }

    const emailsSplit = emails.split(',')

    let valid = true
    emailsSplit.map((email) => {
      if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === false) {
        valid = false
      }
    })
    return valid
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={3}>
          <Typography sx={{ userSelect: 'none', pl: 1 }}>{notice.item}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Controller
            control={control}
            name={`noticesFields[${index}].days`}
            defaultValue={''}

            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={(!!error) ? !!(error[index]?.days) : false}
                helperText={(!!error) ? !!(error[index]?.days) ? error[index].days.message : '' : ''}
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
              pattern: {
                value: /^(0|[1-9]\d*)?$/,
                message: '*Debe ser número'
              }
            }}
          />
        </Grid>
        <Grid item xs={3.5}>
          <Controller
            control={control}
            name={`noticesFields[${index}].emails`}
            defaultValue={''}

            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={(!!error) ? !!(error[index]?.emails) : false}
                helperText={(!!error) ? !!(error[index]?.emails) ? error[index].emails.message : '' : ''}
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
                checkEmails: emails => isValidEmails(emails) || '*Emails inválidos'
              }
            }}
          />
        </Grid>
        <Grid item xs={4.5}>
          <Typography sx={{ userSelect: 'none', fontSize: 14, pr: 1 }}>{notice.detail}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Divider />
      </Grid>
    </Grid>
  )
}
