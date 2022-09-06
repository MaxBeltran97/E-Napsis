import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useState } from "react"
import { Controller } from 'react-hook-form'

export const InputSelect = ({ name, label, defaultText = 'Seleccione...', items = [], required = false, control, error }) => {

    const [active, setActive] = useState(false)

    const onFocus = () => {
        setActive(true)
    }

    const onBlur = () => {
        setActive(false)
    }

    return (

        <Grid container
            direction={'row'}
            alignItems='center'
            sx={{ pl: 2, pt: 1 }}
        >
            <Grid item xs={5}>
                <Typography sx={{ color: (!!error) ? 'error.main' : (active) ? 'text.active' : '' }}>{name}</Typography>
            </Grid>
            <Grid item xs={7}>
                <Controller
                    control={control}
                    name={label}
                    defaultValue=""

                    render={({ field }) => ((
                        <FormControl fullWidth>
                            <InputLabel shrink size="small" id="select-label" error={!!error}>
                                {
                                    (required) ? 'Obligatorio*' : ''
                                }
                            </InputLabel>

                            <Select
                                {...field}
                                labelId="select-label"
                                onFocus={onFocus}
                                onBlur={onBlur}
                                error={!!error}
                                label={(required) ? "Obligatorio*" : ''}
                                notched
                                fullWidth
                                displayEmpty
                                size='small'
                                sx={{
                                    bgcolor: 'background.component'
                                }}
                            >
                                <MenuItem value=""><em>{defaultText}</em></MenuItem>
                                {
                                    items.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText error={!!error} sx={{ margin: 0, pl: 1 }}>
                                {error?.message}
                            </FormHelperText>

                        </FormControl>
                    ))}

                    rules={{
                        required: {
                            value: required,
                            message: '*Este campo es obligatorio'
                        }
                    }}

                    onBlur={onBlur}
                />
            </Grid>
        </Grid>
    )
}
