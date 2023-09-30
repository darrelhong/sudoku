import { atom } from 'jotai'
import { splitAtom } from 'jotai/utils'

import { GRID_SIZE } from './constants'

export interface ICell {
  value: number
  isFixed: boolean
}

export const gridAtom = atom<ICell[]>(
  new Array(GRID_SIZE ** 2).fill({ value: 0, isFixed: false }),
)

export const updateGridAtom = atom(
  null,
  (get, set, { index, value }: { index: number; value: number }) => {
    const grid = get(gridAtom)
    const cell = grid[index]
    if (cell.isFixed) return
    set(gridAtom, [
      ...grid.slice(0, index),
      { ...cell, value },
      ...grid.slice(index + 1),
    ])
    set(gameDirtyAtom, true)
  },
)

export const gameDirtyAtom = atom(false)

export const newGameAtom = atom(null, async (get, set, puzzleStr: string) => {
  if (get(gameDirtyAtom)) {
    const shouldReset = await confirm(
      'Are you sure you want to start a new game? Current progress will be lost.',
    )
    if (!shouldReset) return
  }
  set(gridAtom, getGridFromPuzzleString(puzzleStr))
  set(gameDirtyAtom, false)
})

export const getGridFromPuzzleString = (puzzleStr: string) => {
  return puzzleStr.split('').map((char) => {
    const value = char === '.' ? 0 : parseInt(char)
    return {
      value,
      isFixed: value !== 0,
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
