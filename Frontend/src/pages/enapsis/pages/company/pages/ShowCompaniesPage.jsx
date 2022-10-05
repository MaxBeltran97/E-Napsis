import { useCompanyStore } from "@hooks/useCompanyStore"
import { useEffect } from "react"

export const ShowCompaniesPage = () => {
  
  const { startGetCompanies } = useCompanyStore()

  useEffect(() => {
    startGetCompanies()
  }, [])
  
  return (
    <div>ShowCompaniesPage</div>
  )
}
