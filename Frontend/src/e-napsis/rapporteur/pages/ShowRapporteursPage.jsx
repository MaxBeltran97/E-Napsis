import { CloudUploadOutlined, ContactPageOutlined, DeleteOutlined, Groups2Outlined, ModeOutlined, RadioButtonChecked, RadioButtonUnchecked, Send } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useRapporteurStore } from "../../../hooks/useRapporteurStore"
import { GridPaper } from "../../ui/components/grid"
import { FilterRapporteurs } from "../components"

export const ShowRapporteursPage = () => {

    const navigate = useNavigate()
    const { rapporteurs, handleActiveRapporteur, startDeletingRapporteur } = useRapporteurStore()

    const editRapporteur = (e, rapporteur) => {
        handleActiveRapporteur(rapporteur)
        navigate('../agr-relatores', {replace: true})
    }

    const deleteRapporteur = (e, rapporteur) => {
        startDeletingRapporteur(rapporteur)
    }

    return (
        <>
            <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Relatores</Typography>
            {/* <FilterRapporteurs /> */}

            <GridPaper>
                <Grid container alignItems={'center'}>
                    <Grid item xs={1}>
                            <Typography sx={{ textAlign: 'center' }}>Estado</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{ textAlign: 'center' }}>Nombre</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{ textAlign: 'center' }}>Rut</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{ textAlign: 'center' }}>Usuario</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography sx={{ textAlign: 'center' }}>Documentos Pendientes</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{ textAlign: 'center' }}>Acciones</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography sx={{ textAlign: 'center' }}>Clave</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <Divider />
                    </Grid>
                {
                    rapporteurs.map((rapporteur) => (
                        <Grid container sx={{ mt: 2 }} key={rapporteur._id} alignItems={'center'}>
                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    (rapporteur.condition === true || rapporteur.condition === 'true')
                                    ? (
                                        <Tooltip title={'Estado Activo'}>
                                            <IconButton size="small">
                                                <RadioButtonChecked fontSize="small" color="success"/>
                                            </IconButton>
                                        </Tooltip>
                                    )
                                    : (
                                        <Tooltip title={'Estado No Activo'}>
                                            <IconButton size="small">
                                                <RadioButtonUnchecked fontSize="small" color="error"/>
                                            </IconButton>
                                        </Tooltip>
                                    )
                                }
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{rapporteur.firstName} {rapporteur.lastName}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{ textAlign: 'center' }}>{rapporteur.rut}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{ textAlign: 'center' }}>{rapporteur.user?.name}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography sx={{ textAlign: 'center' }}>NO</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', flexDirection: { md: 'column', lg: 'row' } }}>
                                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title={'Subir Documentos'}>
                                        <IconButton size="small">
                                            <CloudUploadOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title={'Evaluación de Desempeño'}>
                                        <IconButton size="small">
                                            <Groups2Outlined />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title={'Contrato'}>
                                        <IconButton size="small">
                                            <ContactPageOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title={'Modificar'}>
                                        <IconButton size="small" onClick={e => editRapporteur(e, rapporteur)}>
                                            <ModeOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title={'Eliminar'}>
                                        <IconButton size="small" onClick={e => deleteRapporteur(e, rapporteur)}>
                                            <DeleteOutlined color="error" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Tooltip title={'Enviar Clave'}>
                                    <IconButton size="small">
                                        <Send fontSize="small" sx={{ transform: 'rotate(-45deg)' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Divider />
                            </Grid>
                        </Grid>
                    ))
                }

            </GridPaper>

        </>
    )
}
