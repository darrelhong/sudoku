import supabase from "@/utils/supabase";
import { Board } from "./components/Board";

export const revalidate = 60;

export default async function Home() {
  let { data: puzzles } = await supabase.from("sudoku_puzzles").select();

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <Board
        puzzle={
          puzzles?.[0].puzzle ||
          ".697.4123..26195.7471.5.8.693...8654.549.6..881.4.52..1.3...7.562..47.817985.1432"
        }
      />
    </main>
  );
}
