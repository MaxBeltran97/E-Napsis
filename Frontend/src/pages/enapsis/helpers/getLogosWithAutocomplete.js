
export const getLogosWithAutocomplete = (logos) => {
  const options = logos.map((logo) => {
    return { value: logo._id, label: `${logo.title}` }
  })

  return options
}
