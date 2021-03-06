export const trimString = string => {
  const maxLength = 200
  let trimmedString = string.substr(0, maxLength)
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  return `${trimmedString}...`
}