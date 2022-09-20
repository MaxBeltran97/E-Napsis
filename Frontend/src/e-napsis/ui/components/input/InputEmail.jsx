import { Grid, TextField, Typography } from "@mui/material"
import { memo, useState } from "react"
import { Controller } from 'react-hook-form'

export const InputEmail = memo(({ name , label, required = false, control, error }) => {

    const [active, setActive] = useState(false)

    const onFocus = () => {
        setActive(true)
    }

    const onBlur = () => {
        setActive(false)
    }

    const isValidEmail = (email) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
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
                    />)}

                    rules={{
                        required: {
                            value: required,
                            message: '*Este campo es obligatorio'
                        },
                        validate: {
                            checkEmail: email => isValidEmail(email) || '*Email invalido.'
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
})