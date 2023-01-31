import { Checkbox, FormControlLabel, Grid } from "@mui/material"
import { memo } from "react"
import { Controller } from "react-hook-form"

export const InputCheckbox = memo(({ control, name, label, defaultValue = false, size = 12 }) => {
  return (
    <Grid item xs={ size }>
      <Controller 
        control={control}
        name={label}
        defaultValue={defaultValue}
        
        render={({field: { onChange, value, ...field}}) => (
          <FormControlLabel 
            label={name}
            control={
              <Checkbox onChange={onChange} checked={value} {...field} />
            }
            sx={{ userSelect: 'none' }}
          />
        )}
      />
    </Grid>
  )
})
