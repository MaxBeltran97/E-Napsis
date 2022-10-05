import { useTellerStore } from "@hooks/useTellerStore"
import { useEffect } from "react"

export const ShowTellersPage = () => {

  const { startGetTellers } = useTellerStore()

  useEffect(() => {
    startGetTellers()
  }, [])
  

  return (
    <div>ShowTellersPage</div>
  )
}
