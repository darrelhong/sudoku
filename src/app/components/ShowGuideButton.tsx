'use client'

import { useAtom } from 'jotai'

import { showGuidesAtom } from '@/utils/game'

export function ShowGuideButton() {
  const [showGuides, setShowGuides] = useAtom(showGuidesAtom)

  return (
    <button
      type="button"
      onClick={() => setShowGuides((prev) => !prev)}
      className="mt-2 rounded-md border border-gray-300 bg-white px-1.5 py-0.5 text-sm shadow-sm"
    >
      {showGuides ? 'Hide guides' : 'Show guides'}
    </button>
  )
}
