import React, { useState } from 'react';
import Queen from "./components/Queen";
import ChessBoard from "./components/ChessBoard";
import './App.css';
import { isSafe, solveNQ } from './NQueenSolver';

function App() {
  const [queens, setQueens] = useState([null, null, null, null]);
  const [result, setResult] = useState("");

  const updateQueenPosition = (index, row, col) => {
    const newQueens = [...queens];
    newQueens[index] = { row, col };
    setQueens(newQueens);

    if (newQueens.filter(q => q !== null).length === 4) {
      checkNQueens(newQueens);
    }
  };

  const checkNQueens = (queens) => {
    let board = Array.from({ length: 4 }, () => Array(4).fill(0));
    
    queens.forEach(q => {
      if (q !== null) {
        board[q.row][q.col] = 1;
      }
    });

    const positions = queens.map(q => q.row * 4 + q.col).sort();
    const validPositions = [
      [1, 7, 8, 14].sort(),
      [2, 4, 11, 13].sort()
    ];
    const isValidPosition = validPositions.some(valid => 
      JSON.stringify(positions) === JSON.stringify(valid)
    );

    const allSafe = queens.every(q => isSafe(board, q.row, q.col));
    if (allSafe && solveNQ(board) && isValidPosition) {
      setResult("N-Queens Algorithm Satisfied");
    } else {
      setResult("N-Queens Algorithm Not Satisfied");
    }
  };

  return (
    <div className="App">
      <h1>N-Queens Problem</h1>
      <div className="container">
        <div className="queens">
          {queens.map((_, index) => (
            <Queen key={index} id={`queen-${index}`} index={index} />
          ))}
        </div>
        <ChessBoard updateQueenPosition={updateQueenPosition} />
      </div>
      <h2>{result}</h2>
    </div>
  );
}

export default App;
