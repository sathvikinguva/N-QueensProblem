import React from 'react';
import './ChessBoard.css';

export default function ChessBoard({ updateQueenPosition }) {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const index = event.dataTransfer.getData("text");
    const row = Math.floor(event.target.dataset.index / 4);
    const col = event.target.dataset.index % 4;
    const queenElement = document.getElementById(`queen-${index}`);

    if (event.target && event.target.classList.contains('square')) {
      event.target.appendChild(queenElement);
      updateQueenPosition(index, row, col);

      const squareColor = event.target.classList.contains('white') ? 'black' : 'white';
      queenElement.querySelector('.queen').style.color = squareColor;
    }
  };

  return (
    <div className="chessboard">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          data-index={index}
          className={`square ${index % 2 === Math.floor(index / 4) % 2 ? 'white' : 'black'}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
