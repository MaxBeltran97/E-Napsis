import { useForm } from "react-hook-form"

import { Search } from "@mui/icons-material"
import { Button, Divider, Grid, Typography } from "@mui/material"

import { GridPaper } from "../../../components/grid"
import { InputText } from "../../../components/input"

export const FilterRapporteurs = () => {

    const { handleSubmit, control } = useForm()

    const onSubmit = (data) => {
        event.preventDefault()
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <GridPaper>
                <Grid item xs={12}>
                    <Typography sx={{ }}>Buscar por:</Typography>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                </Grid>

                <Grid container>
                    <Grid item xs={12} lg={6} sx={{ pl: 1, pr: { xs: 1, lg: 2 } }}>
                        <InputText name={'Nombre'} label={'name'} control={control} />
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2, display: 'flex' }}>
                    <Button type="submit" variant="outlined">
                        <Search sx={{ mr: 1 }} />
                        Buscar
                    </Button>
                </Grid>
            </GridPaper>
        </form>
    )
}
