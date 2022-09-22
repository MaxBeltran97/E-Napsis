import { Grid, Typography } from "@mui/material"

export const GridInput = ({ title, children }) => {
    return (
        <>
            <Typography sx={{ fontSize: '20px' }}>{title}</Typography>

            <Grid item
                sx={{ pl: 2, pr: 2 }}
            >
                {children}
            </Grid>
        </>
    )
}
