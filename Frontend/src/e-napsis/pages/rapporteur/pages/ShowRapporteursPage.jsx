import { useEffect } from "react"

import { Divider, Grid, Typography } from "@mui/material"

import { useRapporteurStore } from "@hooks"

import { GridPaper } from "../../../components/grid"

import { RapporteurItem } from "../components"

export const ShowRapporteursPage = () => {

    const { rapporteurs, handleActiveRapporteur } = useRapporteurStore()

    useEffect(() => {
        handleActiveRapporteur({})
    }, [])

    return (
        <>
            <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Relatores</Typography>
            {/* <FilterRapporteurs /> */}

            <GridPaper>
                <Grid item xs={12}>
                    <Grid container alignItems={'center'}>
                        <Grid item xs={1}>
                            <Typography sx={{ textAlign: 'center' }}>Estado</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{ textAlign: 'center' }}>Nombre</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{ textAlign: 'center' }}>Rut</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{ textAlign: 'center' }}>Usuario</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{ textAlign: 'center' }}>Acciones</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography sx={{ textAlign: 'center' }}>Clave</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>
                {
                    rapporteurs.map((rapporteur) => (
                        <RapporteurItem key={rapporteur._id} rapporteur={rapporteur} />
                    ))
                }

            </GridPaper>

        </>
    )
}
