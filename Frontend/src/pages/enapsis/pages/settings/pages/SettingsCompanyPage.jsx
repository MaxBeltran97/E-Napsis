import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Paper, Tab, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { CompanyData } from "./settingsCompany"
import { LogosPage } from "./settingsCompany/Logos"

export const SettingsCompanyPage = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Configuraciones de la Empresa</Typography>

      <Paper elevation={2}
        sx={{ mt: 2, pl: 2, pr: 2, pb: 2, bgcolor: 'background.paper', borderRadius: 2 }}
      >
        <Box sx={{ width: '100%', typography: 'boby1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: '#e8e8e8' }}>
              <TabList onChange={handleChange} variant={'fullWidth'}>
                <Tab label={'Datos de Empresa'}       value={'1'} sx={{ textTransform: 'none', fontSize: 16 }} />
                <Tab label={'Atributos Participante'} value={'2'} sx={{ textTransform: 'none', fontSize: 16 }} />
                <Tab label={'Respaldo'}               value={'3'} sx={{ textTransform: 'none', fontSize: 16 }} />
                <Tab label={'Boletas Relator'}        value={'4'} sx={{ textTransform: 'none', fontSize: 16 }} />
                <Tab label={'Diplomas'}               value={'5'} sx={{ textTransform: 'none', fontSize: 16 }} />
                <Tab label={'E-learning'}             value={'6'} sx={{ textTransform: 'none', fontSize: 16 }} />
                <Tab label={'Mostrar Cursos'}         value={'7'} sx={{ textTransform: 'none', fontSize: 16 }} />
                <Tab label={'Logos'}                  value={'8'} sx={{ textTransform: 'none', fontSize: 16 }} />
              </TabList>
            </Box>

            <TabPanel value={'1'}
              sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}
            >
              <CompanyData />
            </TabPanel>

            <TabPanel value={'2'}
              sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}
            >
              <Typography>Atributos Participantes</Typography>
            </TabPanel>

            <TabPanel value={'3'}
              sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}
            >
              <Typography>Respaldo</Typography>
            </TabPanel>

            <TabPanel value={'4'}
              sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}
            >
              <Typography>Boletas Relator</Typography>
            </TabPanel>

            <TabPanel value={'5'}
              sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}
            >
              <Typography>Diplomas</Typography>
            </TabPanel>

            <TabPanel value={'6'}
              sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}
            >
              <Typography>E-learning</Typography>
            </TabPanel>

            <TabPanel value={'7'}
              sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}
            >
              <Typography>Mostrar Cursos</Typography>
            </TabPanel>

            <TabPanel value={'8'}
              sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}
            >
              <LogosPage />
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </>
  )
}
