import { GridPaper } from "@components/grid"
import { SETTINGS, TEMPLATE_EMAILS } from "@models/privateRoutes"
import { NavigateNext } from "@mui/icons-material"
import { Breadcrumbs, Link, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const TemplateEmailPage = () => {

  const navigate = useNavigate()

  const routeEmails = () => {
    navigate(`${SETTINGS}${TEMPLATE_EMAILS}`, {replace: true})
  }

  return (
    <>
      <Breadcrumbs 
        separator={<NavigateNext />}
        sx={{ mt: 1, ml: 2 }}
      >
        <Link underline="hover" color="inherit" onClick={routeEmails}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant="h5">Gestión de Correos</Typography>
        </Link>
        <Typography variant="h5" color={'text.primary'} sx={{ userSelect: 'none' }}>xd</Typography>
      </Breadcrumbs>

      
    </>
  )
}
