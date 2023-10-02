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
      if (!cell.isFixed && cell.value !== 0) {
        return {
          ...cell,
          isInvalid: getCellIsInvalid(cell, newGrid),
        }
      }
      return cell
    })

    set(gridAtom, newGrid)

    set(gameDirtyAtom, true)
  },
)

const gameDirtyAtom = atom(false)

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
  set(gameDirtyAtom, false)
})

export const gameSolvedAtom = atom((get) => {
  const grid = get(gridAtom)
  return grid.every((cell) => {
    if (cell.isFixed) {
      return true
    }
    return cell.value !== 0 && !cell.isInvalid
  })
})

export const showGuidesAtom = atom(true)
