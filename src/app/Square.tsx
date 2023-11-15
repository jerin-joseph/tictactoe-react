// 'use client';

// import { useState } from "react";
import "./globals.css";

function Square({ winner, value, onSquareClick }) {
  return (
    <button
      className={
        "square " + value.toLowerCase() + "style " + winner.toLowerCase()
      }
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
export default Square;
