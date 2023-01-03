import { GridPaper } from "@components/grid"
import { SkeletonListItemV2 } from "@components/skeleton"
import { useSettingStore } from "@hooks/useSettingStore"
import { Divider, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { EmailItem } from "../.."

export const TemplateEmailsPage = () => {

  const { isEmailsLoading, emails, startGetEmails } = useSettingStore()

  useEffect(() => {
    startGetEmails()
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Gestión de Correos</Typography>
    
      <GridPaper rowSpacing={1}>
        <Grid item xs={12} >
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
          isEmailsLoading
            ? <SkeletonListItemV2 />
            : (
              emails.map((email) => (
                <EmailItem key={email._id} email={email} />
              ))
            )
        }
      </GridPaper>
    </>
  )
}
