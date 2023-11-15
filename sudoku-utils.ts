// Backtracking algorithm to solve Sudoku
export const backtrack = (grid: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(grid, row, col, num)) {
              grid[row][col] = num;
              if (backtrack(grid)) {
                return true;
              }
              grid[row][col] = 0; // Backtrack if the current move leads to no solution
            }
          }
          return false; // No valid number for the current cell
        }
      }
    }
    return true; // Sudoku solved successfully
};

  // Function to check if a move is valid
const isValidMove = (
    grid: number[][],
    row: number,
    col: number,
    num: number
  ): boolean => {
    return (
      !usedInRow(grid, row, num) &&
      !usedInCol(grid, col, num) &&
      !isNumberInSubgrid(grid, row - (row % 3), col - (col % 3), num)
    );
};

  // Helper function to check if a number is used in the current row
const usedInRow = (grid: number[][], row: number, num: number): boolean => {
    return grid[row].includes(num);
  };

  // Helper function to check if a number is used in the current column
const usedInCol = (grid: number[][], col: number, num: number): boolean => {
    for (let row = 0; row < 9; row++) {
      if (grid[row][col] === num) {
        return true;
      }
    }
    return false;
};

  // Helper function to check if a number is used in the current 3x3 subgrid
const isNumberInSubgrid = (
    grid: number[][],
    startRow: number,
    startCol: number,
    num: number
  ): boolean => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) {
          return true;
        }
      }
    }
    return false;
};

interface ValidationResult {
    result: boolean;
    error: string;
}

export const isValidSudokuGrid = (grid: number[][]): ValidationResult => {
    // Check each row
    for (let row = 0; row < 9; row++) {
      if (!isValidRow(grid, row)) {
        return { result: false, error: `Identical numbers in row ${row + 1}.` };
      }
    }
  
    // Check each column
    for (let col = 0; col < 9; col++) {
      if (!isValidColumn(grid, col)) {
        return { result: false, error: `Identical numbers in column ${col + 1}.` };
      }
    }
  
    // Check each 3x3 subgrid
    for (let startRow = 0; startRow < 9; startRow += 3) {
      for (let startCol = 0; startCol < 9; startCol += 3) {
        if (!isValidSubgrid(grid, startRow, startCol)) {
          return {
            result: false,
            error: `Identical numbers in subgrid row: ${startRow + 1} and column: ${startCol + 1}.`,
          };
        }
      }
    }
  
    return { result: true, error: ""};
};
  
const isValidRow = (grid: number[][], row: number): boolean => {
    const seen = new Set<number>();
  
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
  
      if (num !== 0) {
        if (seen.has(num)) {
          return false; // Duplicate number in the row
        }
        seen.add(num);
      }
    }
  
    return true;
};
  
const isValidColumn = (grid: number[][], col: number): boolean => {
    const seen = new Set<number>();
  
    for (let row = 0; row < 9; row++) {
      const num = grid[row][col];
  
      if (num !== 0) {
        if (seen.has(num)) {
          return false; // Duplicate number in the column
        }
        seen.add(num);
      }
    }
  
    return true;
};
  
const isValidSubgrid = (grid: number[][], startRow: number, startCol: number): boolean => {
    const seen = new Set<number>();
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const num = grid[startRow + i][startCol + j];
  
        if (num !== 0) {
          if (seen.has(num)) {
            return false; // Duplicate number in the 3x3 subgrid
          }
          seen.add(num);
        }
      }
    }
  
    return true;
};
  