import { Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { memo, useState } from "react"
import { Controller } from 'react-hook-form'

export const InputPhoneNumber = memo(({ name , label, identifier, length, required = false, control, error }) => {

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
            sx={{ pt: 1 }}
        >
            <Grid item xs={5}>
                <Typography sx={{ color: (!!error) ? 'error.main' : (active) ? 'text.active' : '' }}>{name}</Typography>
            </Grid>
            <Grid item xs={7}>
                <Controller 
                    control={control}
                    name={label}
                    defaultValue=''

                    render={({field}) => (<TextField
                        {...field}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        error={!!error}
                        helperText={(!!error) ? error.message : ''}
                        label={(required) ? "Obligatorio*" : ''} 
                        fullWidth
                        autoComplete="off"
                        size="small"
                        sx={{ 
                            bgcolor: 'background.component',
                            "& .MuiFormHelperText-root": {
                                margin: 0,
                                pl: 1
                            }
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{identifier}</InputAdornment>
                        }}
                    />)}

                    rules={{
                        pattern: {
                            value: /^(0|[1-9]\d*)?$/,
                            message: '*Este campo debe ser un número.'
                        },
                        minLength: {
                            value: length,
                            message: `*Tamaño de ${length} números.`
                        },
                        maxLength: {
                            value: length,
                            message: `*Tamaño de ${length} números.`
                        },
                        required: {
                            value: required,
                            message: '*Este campo es obligatorio.'
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
})