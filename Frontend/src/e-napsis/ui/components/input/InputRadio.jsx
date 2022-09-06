import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material"
import { Controller } from 'react-hook-form'

export const InputRadio = ({ name, label, items = [], itemDefault, control }) => {
    return (
        <Grid container
            direction={'row'}
            alignItems='center'
            sx={{ pl: 2, pt: 1 }}
        >
            <Grid item xs={5}>
                <Typography>{name}</Typography>
            </Grid>
            <Grid item xs={7}>
                <Controller 
                    control={control}
                    name={label}
                    defaultValue={label + '-' + items[itemDefault]}

                    render={({field}) => (
                        <RadioGroup {...field} row>
                            {
                                items.map((item) => (
                                    <FormControlLabel
                                        key={item}
                                        value={(label + '-' + item)}
                                        control={<Radio size="small" />}
                                        label={item}
                                    />
                                ))
                            }
                        </RadioGroup>
                    )}
                />
            </Grid>
        </Grid>
    )
}
