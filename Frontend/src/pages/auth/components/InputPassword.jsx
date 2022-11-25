import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material"
import { memo, useState } from "react"
import { Controller } from "react-hook-form"

export const InputPassword = memo(({ control, label, error, disabled = false }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Controller
      control={control}
      name={label}
      defaultValue=''

      render={({ field }) => (
        <TextField
          {...field}
          disabled={disabled}
          type={showPassword ? 'text' : 'password'}
          error={!!error}
          helperText={(!!error) ? error.message : ''}
          label={'Introduce tu contraseña'}
          fullWidth
          sx={{
            bgcolor: 'background.main',
            '& .MuiFormHelperText-root': {
              m: 0, pl: 1
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>)
          }}
        />
      )}

      rules={{
        required: {
          value: true,
          message: '*Introduce una contraseña'
        }
      }}
    />
  )
})
