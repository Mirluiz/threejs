export const getLnFromFormatted = (l: string): number => {
  return +l.slice(0, -1)
}