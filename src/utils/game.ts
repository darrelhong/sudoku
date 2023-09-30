import { atom } from 'jotai'

import { GRID_SIZE } from './constants'

export const gridAtom = atom<number[]>(new Array(GRID_SIZE ** 2).fill(0))

export const gameDirtyAtom = atom(false)

export const newGameAtom = atom(null, async (get, set, puzzleStr: string) => {
  if (get(gameDirtyAtom)) {
    const shouldReset = await confirm(
      'Are you sure you want to start a new game? Current progress will be lost.',
    )
    if (shouldReset) return
  }
  set(gridAtom, getGridFromPuzzleString(puzzleStr))
  set(gameDirtyAtom, false)
})

export const getGridFromPuzzleString = (puzzleStr: string) => {
  return puzzleStr
    .split('')
    .map((char) => (char === '.' ? 0 : parseInt(char, 10)))
}
