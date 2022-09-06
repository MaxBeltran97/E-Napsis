import { Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Controller } from 'react-hook-form'

export const InputText = ({ name , label, required = false, control, error }) => {

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
                                bgcolor: 'background.default',
                                margin: 0,
                                pl: 1
                            }
                        }}
                    />)}

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
}
