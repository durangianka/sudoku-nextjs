"use client";
import { backtrack, isValidSudokuGrid } from "@/sudoku-utils";
import React, { useState } from "react";
import LoaderSpinner from "./LoaderSpinner";

const SudokuSolver: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSolveClick = () => {
    setIsSolving(true);
    const copyGrid = [...grid];
    const { result, error } = isValidSudokuGrid(copyGrid);
    if (!result) {
      setErrorMsg(error);
      setIsSolved(true);
      return setIsSolving(false);
    }

    if (backtrack(copyGrid)) {
      setGrid(copyGrid);
      setIsSolved(true);
    } else {
      alert("No solution exists for the current Sudoku puzzle.");
      setIsSolved(false);
    }
    setIsSolving(false);
  };

  const handleRestartClick = () => {
    setGrid(Array.from({ length: 9 }, () => Array(9).fill(0)));
    setSelectedCell(null);
    setIsSolved(false);
    setErrorMsg(null);
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num: number) => {
    if (selectedCell !== null) {
      const newGrid = [...grid];
      newGrid[selectedCell.row][selectedCell.col] = num;
      setGrid(newGrid);
      setSelectedCell(null);
    }
  };

  const renderGrid = () => {
    return (
      <table className="border-collapse border-2 border-black">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`w-10 h-10 md:w-12 md:h-12 text-3xl text-center cursor-pointer ${
                    cell === 0 ? "bg-gray-200" : "bg-white"
                  } ${
                    selectedCell?.row === rowIndex &&
                    selectedCell?.col === colIndex
                      ? "bg-blue-200"
                      : ""
                  } ${
                    colIndex % 3 === 2 && colIndex !== 8
                      ? "border-r-2 border-r-black"
                      : ""
                  } ${
                    rowIndex % 3 === 2 && rowIndex !== 8
                      ? "border-b-2 border-b-black"
                      : ""
                  } border border-gray-300 transition-all`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell !== 0 ? cell : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderNumberPad = () => {
    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-4 md:gap-6 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="bg-blue-500 hover:bg-blue-700 text-white text-3xl font-bold px-10 py-2 md:px-10 md:py-4 rounded disabled:opacity-20 transition-all shadow-md"
            onClick={() => handleNumberClick(num)}
            disabled={isSolving || isSolved}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center">
      {renderGrid()}
      <div className="flex flex-col items-center space-y-4">
        {renderNumberPad()}
        <div className="w-full flex items-center justify-between">
          <button
            className={`bg-green-500 ${
              !isSolved && "hover:bg-green-700"
            }  text-white font-bold py-3 px-10 rounded mr-4 ${
              isSolved && "disabled:opacity-20 "
            } transition-all`}
            onClick={handleSolveClick}
            disabled={isSolving || isSolved}
          >
            {isSolving ? (
              <div className="flex items-center space-x-2">
                <LoaderSpinner />
                <span>Solving...</span>
              </div>
            ) : (
              "Solve Sudoku"
            )}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded disabled:opacity-20 transition-all"
            onClick={handleRestartClick}
            disabled={isSolving}
          >
            Restart
          </button>
        </div>
        <div className="w-[335px] h-[55px] mr-auto">
          {errorMsg && (
            <p className="text-lg text-red-600 font-semibold ">{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SudokuSolver;
