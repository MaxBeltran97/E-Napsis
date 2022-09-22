import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material"
import { memo } from "react"
import { Controller } from 'react-hook-form'

export const InputRadio = memo(({ name, label, items = [], posDefault, control }) => {

    return (
        <Grid container
            direction={'row'}
            alignItems='center'
            sx={{ pt: 1 }}
        >
            <Grid item xs={5}>
                <Typography>{name}</Typography>
            </Grid>
            <Grid item xs={7}>
                <Controller 
                    control={control}
                    name={label}
                    defaultValue={items[posDefault].value}

                    render={({field}) => (
                        <RadioGroup {...field} row sx={{ ml: 1 }}>
                            {
                                items.map((item) => (
                                    <FormControlLabel
                                        key={item.name}
                                        value={item.value}
                                        control={<Radio size="small" sx={{ pt: '10px', pb: '10px' }}/>}
                                        label={item.name}
                                    />
                                ))
                            }
                        </RadioGroup>
                    )}
                />
            </Grid>
        </Grid>
    )
})