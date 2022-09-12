import { Grid } from '@mui/material'

export const GridButtons = ({children, center = false}) => {
    return (
        <Grid item 
            sx={{ 
                pl: 6, pr: 4, pt: 4,
                display: 'flex',
                justifyContent: (center) ? 'center' : ''
            }}
        >
            {children}
        </Grid>
    )
}
