import { GridPaper } from '@components/grid'
import { SkeletonListItemV2 } from '@components/skeleton'
import { useSettingStore } from '@hooks/useSettingStore'
import { ADD_CHECKLIST, CHECKLIST, SETTINGS } from '@models/privateRoutes'
import { Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckListFilter, CheckListShowItem } from '../components'

export const ShowCheckListPage = () => {

  const navigate = useNavigate()
  const { isCheckListLoading, checkListSaves, startGetCheckListSaves } = useSettingStore()
  
  useEffect(() => {
    startGetCheckListSaves()
  }, [])

  const routeAddCheckList = () => {
    navigate(`${SETTINGS}${CHECKLIST}${ADD_CHECKLIST}`, {replace: true})
  } 

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Modulo Check-List</Typography>

      <Button onClick={routeAddCheckList}
        variant='outlined'
        sx={{ mt: 2, bgcolor: 'background.paper' }}
      >
        Generar Nuevo Checklist
      </Button>

      {/* Filtro */}
      <CheckListFilter title={'Buscar por:'} />

      {/* Mostrar */}
      <GridPaper rowSpacing={1}>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={6}>
              <Typography sx={{ userSelect: 'none', pt: 1, pb: 1, textAlign: 'center' }}>Curso</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ userSelect: 'none', pt: 1, pb: 1, textAlign: 'center' }}>Logo</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ userSelect: 'none', textAlign: 'center' }}>Acciones</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isCheckListLoading
           ? <SkeletonListItemV2 />
           : (
            checkListSaves.map((checkList) => (
              <CheckListShowItem key={checkList._id} checkList={checkList} />
            ))
           )
        }
      </GridPaper>
    </>
  )
}

