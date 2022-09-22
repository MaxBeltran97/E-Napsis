import { useNavigate } from "react-router-dom"

import { CloudUploadOutlined, DeleteOutlined, ModeOutlined, RadioButtonChecked, RadioButtonUnchecked, Send } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"

import { useRapporteurStore } from "../../../../hooks"

export const RapporteurItem = ({ rapporteur }) => {

    const { condition, names, lastName, rut, user } = rapporteur

    const navigate = useNavigate()
    const { handleActiveRapporteur, startDeletingRapporteur } = useRapporteurStore()

    const editRapporteur = () => {
        handleActiveRapporteur(rapporteur)
        navigate('../agr-relatores', { replace: true })
    }

    const deleteRapporteur = () => {
        startDeletingRapporteur(rapporteur)
    }

    return (
        <Grid container
            alignItems={'center'}
            sx={{ mt: 2 }}
        >
            <Grid item xs={1}>
                <Grid container justifyContent={'center'}>
                    <Grid item>
                        {
                            (condition === true || condition === 'true')
                                ? (
                                    <Tooltip title={'Estado Activo'}>
                                        <IconButton size="small" >
                                            <RadioButtonChecked fontSize="small" color="success" />
                                        </IconButton>
                                    </Tooltip>
                                )
                                : (
                                    <Tooltip title={'Estado No Activo'}>
                                        <IconButton size="small" >
                                            <RadioButtonUnchecked fontSize="small" color="error" />
                                        </IconButton>
                                    </Tooltip>
                                )
                        }
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={3}>
                <Typography>{names} {lastName}</Typography>
            </Grid>

            <Grid item xs={2}>
                <Typography textAlign={'center'}>{rut}</Typography>
            </Grid>

            <Grid item xs={2}>
                <Typography textAlign={'center'}>{user?.name}</Typography>
            </Grid>

            <Grid item xs={3}>
                <Grid container justifyContent={'center'} wrap={'wrap'}>
                    <Grid item>
                        <Tooltip title={'Subir Documentos'}>
                            <IconButton size="small">
                                <CloudUploadOutlined />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title={'Modificar'}>
                            <IconButton size="small" onClick={editRapporteur}>
                                <ModeOutlined />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title={'Eliminar'}>
                            <IconButton size="small" onClick={deleteRapporteur}>
                                <DeleteOutlined color="error" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={1}>
                <Grid container justifyContent={'center'}>
                    <Grid item>
                        <Tooltip title={'Enviar Clave'}>
                            <IconButton size="small">
                                <Send fontSize="small" sx={{ transform: 'rotate(-45deg)' }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
                <Divider />
            </Grid>
        </Grid>
    )
}
