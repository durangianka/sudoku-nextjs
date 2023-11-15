import SudokuSolver from "@/components/SudokuSolver";

export default function Home() {
  return (
    <div className="w-full md:flex-1 flex flex-col items-center justify-center">
      <h1 className="w-full text-4xl text-center font-bold mb-4 md:mb-10">
        Sudoku Solver
      </h1>
      <SudokuSolver />
    </div>
  );
}
