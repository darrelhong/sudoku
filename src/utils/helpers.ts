import { GRID_SIZE } from './constants'

export const getGridFromPuzzleString = (puzzleStr: string) => {
  return puzzleStr.split('').map((char, i) => {
    const value = char === '.' ? 0 : parseInt(char)
    return {
      value,
      isFixed: value !== 0,
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
  if (key === 'Backspace') return 0
  if (Array.from('123456789').includes(key)) return parseInt(key)
  return null
}
