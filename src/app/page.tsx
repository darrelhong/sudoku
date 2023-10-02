import supabase from '@/utils/supabase'

import { Board } from './components/Board'
import { PuzzleSelect } from './components/PuzzleSelect'
import { ShowGuideButton } from './components/ShowGuideButton'
import { SuccessDialog } from './components/SuccessDialog'

export const revalidate = 60

export default async function Home() {
  let { data: puzzles, error } = await supabase.from('sudoku_puzzles').select()

  if (error) console.log('error', error)

  if (!puzzles) {
    puzzles = [
      {
        id: '1',
        puzzle:
          '.697.4123..26195.7471.5.8.693...8654.549.6..881.4.52..1.3...7.562..47.817985.1432',
        created_at: '',
      },
    ]
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <PuzzleSelect puzzles={puzzles} />
      <Board initialPuzzle={puzzles[0].puzzle} />
      <ShowGuideButton />
      <SuccessDialog />
    </main>
  )
}
