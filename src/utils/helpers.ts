import { GRID_SIZE, ZERO_VALUE } from './constants'

export const getGridFromPuzzleString = (puzzleStr: string) => {
  return puzzleStr.split('').map((char, i) => {
    const value = char === '.' ? ZERO_VALUE : parseInt(char)
    return {
      value,
      isFixed: value !== ZERO_VALUE,
      index: i,
    }
  })
}

export const getXYFromIndex = (index: number) => {
  return {
    x: index % GRID_SIZE,
    y: Math.floor(index / GRID_SIZE),
  }
}

export const getValueFromKey = (key: string) => {
  if (key === 'Backspace') return ZERO_VALUE
  if (Array.from('123456789').includes(key)) return parseInt(key)
  return null
}
