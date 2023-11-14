"use client";
import { useState } from "react";
import Square from "./Square";
import "./globals.css";

export default function Board() {
  const [squareValue, setSquareValue] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squareValue);
  let status;
  if (winner) {
    if (winner === "tie") {
      status = "Match drawn!";
    } else {
      status = "Winner: " + winner;
    }
  } else {
    status = "Next Player: " + (isXNext ? "X" : "O");
  }

  function calculateWinner(squareValue) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squareValue[a] &&
        squareValue[a] == squareValue[b] &&
        squareValue[a] == squareValue[c]
      ) {
        return squareValue[a];
      }
    }
    // console.log("hello");
    // console.log(squareValue);

    if (!squareValue.includes("")) {
      return "tie";
    }
    return null;
  }

  function handleClick(i) {
    const nextSquares = squareValue.slice();
    if (
      nextSquares[i] == "X" ||
      nextSquares[i] == "O" ||
      calculateWinner(squareValue)
    )
      return;
    if (isXNext) {
      nextSquares[i] = "X";
      setIsXNext(false);
    } else {
      nextSquares[i] = "O";
      setIsXNext(true);
    }
    setSquareValue(nextSquares);
  }

  function resetBoard() {
    setSquareValue(Array(9).fill(""));
    setIsXNext(true);
  }

  return (
    <div className="page">
      <div className="status">{status}</div>
      <div className="board">
        <div>
          <Square value={squareValue[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squareValue[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squareValue[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div>
          <Square value={squareValue[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squareValue[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squareValue[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div>
          <Square value={squareValue[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squareValue[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squareValue[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div>
        <button onClick={resetBoard} className="reset">
          Restart
        </button>
      </div>
    </div>
  );
}
