import { Grid, Typography } from "@mui/material"

import { FormCompany } from "../components/FormCompany"
import { FormCompanyContact } from "../components/FormCompanyContact"

export const AddCompanyPage = () => {

    return (
        <>
            <Typography variant="h5" sx={{ mt: 1, ml: 2 }} >{'Registro de Empresa'}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <FormCompany />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <FormCompanyContact />
                </Grid>
            </Grid>
        </>
    )
}
