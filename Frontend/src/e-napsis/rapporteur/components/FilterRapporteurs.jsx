import { Search } from "@mui/icons-material"
import { Button, Divider, Grid, Paper, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { GridPaper } from "../../ui/components/grid"
import { InputRadio, InputSelect, InputText } from "../../ui/components/input"
import { radioBooleanFilter, tipoEspecialidad } from "../../ui/data"

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
                        <InputSelect name={'Especialidad'} label={'specialty'} items={tipoEspecialidad} control={control} />
                        <InputText name={'Nombre'} label={'name'} control={control} />
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ pl: 1, pr: { xs: 1, lg: 2 } }}>
                        <InputRadio name={'REUF Actualizada'} label={'reuf'} items={radioBooleanFilter} posDefault={2} control={control} />
                        <InputRadio name={'Acreditado'} label={'acredited'} items={radioBooleanFilter} posDefault={2} control={control} />
                        <InputRadio name={'En proceso de Acreditación'} label={'acreditationProcess'} items={radioBooleanFilter} posDefault={2} control={control} />
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
