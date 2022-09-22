import { Typography } from "@mui/material"
import { GridPaper } from "./GridPaper"

export const GridForm = ({ handleSubmit, formTitle, functionFromData, children }) => {

    const onSubmit = (data) => {
        event.preventDefault()
        functionFromData(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" sx={{ mt: 1, ml: 2 }} >{formTitle}</Typography>
            <GridPaper>
                {children}
            </GridPaper>
        </form>
    )
}
