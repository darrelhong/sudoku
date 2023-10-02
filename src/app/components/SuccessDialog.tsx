'use client'

import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'

import { gameSolvedAtom } from '@/utils/game'

export function SuccessDialog() {
  const [solved] = useAtom(gameSolvedAtom)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (solved) {
      dialogRef.current?.showModal()
      dialogRef.current?.blur()
    }
  }, [solved])

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg border border-gray-300 px-2 py-3 backdrop:bg-gray-800/40 dark:border-white dark:bg-black dark:text-white dark:backdrop:bg-gray-300/40"
      onClick={() => dialogRef.current?.close()}
    >
      You solved the puzzle!
    </dialog>
  )
}
