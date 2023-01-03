import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material"
import { useState } from "react"

export const Filter = ({ title, children }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
