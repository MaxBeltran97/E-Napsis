import { Grid, TextField, Typography } from '@mui/material'
import { memo, useState } from 'react'
import { Controller } from 'react-hook-form'

export const InputTextArea = memo(({ control, name, label, required = false, error }) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }
  
  return (
    <Grid container sx={{ pt: 1 }}>
      <Grid item xs={12}>
        <Typography sx={{ color: (!!error) ? 'error.main' : (active) ? 'text.active' : '' }}>{name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Controller 
          control={control}
          name={label}
          defaultValue=''

          render={({field}) => (
            <TextField 
              {...field}
              onFocus={onFocus}
              onBlur={onBlur}
              error={!!error}
              helperText={(!!error) ? error.message : ''}
              label={(required) ? 'Obligatorio*' : ''}
              fullWidth
              multiline
              rows={4}
              autoComplete='off'
              size='small'
              sx={{
                bgcolor: 'background.main',
                '& .MuiFormHelperText-root': {
                  m: 0, pl: 1
                }
              }}
            />
          )}

          rules={{
            required: {
              value: required,
              message: '*Este campo es obligatorio'
            }
          }}
        />
      </Grid>
    </Grid>
  )
})
