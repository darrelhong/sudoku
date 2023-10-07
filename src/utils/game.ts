import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { GRID_SIZE, ZERO_VALUE } from './constants'
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

export const gridAtom = atomWithStorage<ICell[]>(
  'grid',
  Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
    value: ZERO_VALUE,
    index: i,
    isFixed: false,
  })),
)

export const updateGridAtom = atom(
  null,
  (get, set, { index, value }: { index: number; value: number }) => {
    const grid = get(gridAtom)
    const cell = grid[index]
    if (cell.isFixed) return

    let newGrid = [
      ...grid.slice(0, index),
      { ...cell, value },
      ...grid.slice(index + 1),
    ]

    newGrid = newGrid.map((cell) => {
      if (!cell.isFixed && cell.value !== ZERO_VALUE) {
        return {
          ...cell,
          isInvalid: getCellIsInvalid(cell, newGrid),
        }
      }
      return cell
    })

    set(gridAtom, newGrid)
  },
)

const gameDirtyAtom = atom((get) => {
  const grid = get(gridAtom)
  return grid.some((cell) => !cell.isFixed && cell.value !== ZERO_VALUE)
})

const gameDirtyAndNotSolvedAtom = atom((get) => {
  return get(gameDirtyAtom) && !get(gameSolvedAtom)
})

export const newGameAtom = atom(null, async (get, set, puzzleStr: string) => {
  if (get(gameDirtyAndNotSolvedAtom)) {
    const shouldReset = await confirm(
      'Are you sure you want to start a new game? Current progress will be lost.',
    )
    if (!shouldReset) return
  }
  set(gridAtom, getGridFromPuzzleString(puzzleStr))
})

export const gameSolvedAtom = atom((get) => {
  const grid = get(gridAtom)
  return grid.every((cell) => {
    if (cell.isFixed) {
      return true
    }
    return cell.value !== ZERO_VALUE && !cell.isInvalid
  })
})

export const showGuidesAtom = atom(true)
