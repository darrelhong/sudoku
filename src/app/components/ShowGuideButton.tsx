'use client'

import { useAtom } from 'jotai'

import { showGuidesAtom } from '@/utils/game'

export function ShowGuideButton() {
  const [showGuides, setShowGuides] = useAtom(showGuidesAtom)

  return (
    <button
      type="button"
      onClick={() => setShowGuides((prev) => !prev)}
      className="btn mt-2 text-sm"
    >
      {showGuides ? 'Hide guides' : 'Show guides'}
    </button>
  )
}
