import { GridPaper } from '@components/grid'
import { SkeletonListItemV2 } from '@components/skeleton'
import { useSettingStore } from '@hooks/useSettingStore'
import { Divider, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { ContractItem } from '../components'

export const TemplateCotractsPage = () => {

  const { isContractsLoading, contracts, startGetContracts } = useSettingStore()

  useEffect(() => {
    startGetContracts()
  }, [])

  return (
    <>
      <Typography variant='h5' sx={{ mt: 1, ml: 2 }}>Gestión de Contratos</Typography>

      <GridPaper rowSpacing={1}>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={11}>
              <Typography sx={{ userSelect: 'none', pt: 1, pb: 1, pl: 1 }}>Título</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ userSelect: 'none', textAlign: 'center' }}>Ver</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isContractsLoading
            ? <SkeletonListItemV2 />
            : (
              contracts.map((contract) => (
                <ContractItem key={contract._id} contract={contract} />
              ))
            )
        }
      </GridPaper>
    </>
  )
}
