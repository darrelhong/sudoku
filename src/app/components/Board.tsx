'use client'

import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useCallback } from 'react'

import { gridAtom, updateGridAtom } from '@/utils/game'
import { getValueFromKey } from '@/utils/helpers'

import { Cell } from './Cell'

export function Board() {
  const [grid] = useAtom(gridAtom)
  const [_, updateGrid] = useAtom(updateGridAtom)

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      const value = getValueFromKey(e.key)
      if (value !== null) {
        updateGrid({ index, value })
      }
    },
    [updateGrid],
  )

  return (
    <div className="grid w-full max-w-xl grid-cols-9 overflow-hidden rounded-lg bg-white text-xl shadow-lg dark:border dark:border-white dark:bg-black sm:text-2xl">
      {grid.map((cell) => (
        <Cell cell={cell} key={cell.index} handleKeyUp={handleKeyUp} />
      ))}
    </div>
  )
}
