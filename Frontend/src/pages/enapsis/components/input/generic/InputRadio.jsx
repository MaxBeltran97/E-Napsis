import { memo } from "react"
import { Controller } from "react-hook-form"

import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { InputForm } from "../InputForm"

export const InputRadio = memo(({ control, name, label, items = [], defaultPos = 0}) => {
  return (
    <InputForm name={name} active={false} error={false}>
      <Controller 
        control={control}
        name={label}
        defaultValue={items[defaultPos]?.value}

        render={({field}) => (
          <RadioGroup {...field} row sx={{ ml: 1 }}>
            {
              items.map((item) => (
                <FormControlLabel 
                  key={item.name}
                  label={item.name}
                  value={item.value}
                  control={<Radio size='small' sx={{ pt: '10px', pb: '10px' }} />}
                />
              ))
            }
          </RadioGroup>
        )}
      />
    </InputForm>
  )
})
