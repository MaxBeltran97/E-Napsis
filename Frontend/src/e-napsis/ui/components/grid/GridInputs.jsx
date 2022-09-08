import { Grid, Typography } from '@mui/material'

export const GridInputs = ({children, title}) => {
    return (
        <Grid item sx={{pl: 6, pr: 4, pt: 4}}>
            <Typography 
                sx={{ 
                    fontSize: '20px', 
                    fontWeight: 'regular', 
                    pb: 1 
                }}
            >
                {title}
            </Typography>

            {children}
        </Grid>
    )
}
