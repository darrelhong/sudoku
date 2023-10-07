import { PuzzleForm } from '../components/PuzzleForm'

export default function EditPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-semibold">Edit puzzles</h1>
      <PuzzleForm />
    </main>
  )
}
