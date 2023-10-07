import { Board } from './components/Board'
import { PuzzleSelect } from './components/PuzzleSelect'
import { ShowGuideButton } from './components/ShowGuideButton'
import { SuccessDialog } from './components/SuccessDialog'

export const revalidate = 60

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <PuzzleSelect />
      <Board />
      <ShowGuideButton />
      <SuccessDialog />
    </main>
  )
}
