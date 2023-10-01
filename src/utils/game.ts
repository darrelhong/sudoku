import { atom } from 'jotai'

import { GRID_SIZE } from './constants'
import { getGridFromPuzzleString } from './helpers'
import { getCellIsInvalid } from './sudoku'

export type ICell = {
  value: number
  index: number
} & (
  | {
      isFixed: true
    }
  | {
      isFixed: false
      isInvalid?: boolean
    }
)

export const gridAtom = atom<ICell[]>(
  Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
    value: 0,
    index: i,
    isFixed: false,
  })),
)

export const gridWithErrorsAtom = atom((get) => {
  const grid = get(gridAtom)
  return grid.map((cell) => ({
    ...cell,
    isInvalid:
      !cell.isFixed && cell.value !== 0 && getCellIsInvalid(cell, grid),
  }))
})

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

export const gameSolvedAtom = atom((get) => {
  const gridWithErrors = get(gridWithErrorsAtom)
  return gridWithErrors.every((cell) => cell.value !== 0 && !cell.isInvalid)
})
