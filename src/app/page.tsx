"use client";
import { useEffect, useState } from "react";
import Square from "./Square";
import "./globals.css";

export default function Board() {
  const [squareValue, setSquareValue] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  let winLine = Array(3);
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

  function calculateWinner(squareValue: Array<string>) {
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
        console.log(lines[i]);
        winLine = lines[i];
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

  function handleClick(i: number) {
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
          <Square
            winner={winLine.includes(0) ? winner : ""}
            value={squareValue[0]}
            onSquareClick={() => handleClick(0)}
          />
          <Square
            winner={winLine.includes(1) ? winner : ""}
            value={squareValue[1]}
            onSquareClick={() => handleClick(1)}
          />
          <Square
            winner={winLine.includes(2) ? winner : ""}
            value={squareValue[2]}
            onSquareClick={() => handleClick(2)}
          />
        </div>
        <div>
          <Square
            winner={winLine.includes(3) ? winner : ""}
            value={squareValue[3]}
            onSquareClick={() => handleClick(3)}
          />
          <Square
            winner={winLine.includes(4) ? winner : ""}
            value={squareValue[4]}
            onSquareClick={() => handleClick(4)}
          />
          <Square
            winner={winLine.includes(5) ? winner : ""}
            value={squareValue[5]}
            onSquareClick={() => handleClick(5)}
          />
        </div>
        <div>
          <Square
            winner={winLine.includes(6) ? winner : ""}
            value={squareValue[6]}
            onSquareClick={() => handleClick(6)}
          />
          <Square
            winner={winLine.includes(7) ? winner : ""}
            value={squareValue[7]}
            onSquareClick={() => handleClick(7)}
          />
          <Square
            winner={winLine.includes(8) ? winner : ""}
            value={squareValue[8]}
            onSquareClick={() => handleClick(8)}
          />
        </div>
      </div>
      <div>
        <button
          onClick={resetBoard}
          className={"reset " + (winner ? "resetOnWin" : "")}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
