const capitalize = (text = '') => {
  if (text.length < 2) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const string = {
  capitalize
}
