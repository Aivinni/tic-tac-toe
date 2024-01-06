import { useState } from 'react'
import './App.css'

interface board {
  board: string[][];
  turn: string;
  won: boolean;
  winner: string;
}

function App() {
  const boardValue = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  const [board, setBoard] = useState<board>({
      board: boardValue,
      turn: "X",
      won: false,
      winner: " ",
    }
  )

  function handleChangeState(index: number, index2: number) {
    let copy = {... board};
    if (copy.board[index][index2] == " " && copy.turn == "X") {
      copy.board[index][index2] = "X";
      copy.turn = "O"
    } else if (copy.board[index][index2] == " " && copy.turn == "O") {
      copy.board[index][index2] = "O";
      copy.turn = "X"
    }
    copy = checkVictor(copy);
    setBoard(copy);
  }
  function checkVictor(copy: board) {
    if (!board.won) {
      // Horizontal Victory
      let victory = true;
      for (const row of copy.board) {
        victory = true;
        for (let i = 1; i < copy.board[0].length; i++) {
          if (row[i - 1] != row[i] || row[i] == " ") {
            victory = false;
          }
        }
        if (victory) {
          copy.winner = row[0];
          copy.won = true;
        }
      }

      // Vertical Victory
      for (let i = 0; i < copy.board[0].length; i++) {
        victory = true;
        for (let j = 1; j < copy.board.length; j++) {
          if (copy.board[j - 1][i] != copy.board[j][i] || copy.board[j][i] == " ") {
            victory = false;
          }
        }
        if (victory) {
          copy.winner = copy.board[0][i];
          copy.won = true;
        }
      }

      // Diagonal victory
      victory = true;
      for (let i = 1; i < copy.board.length; i++) {
        if (copy.board[i - 1][i - 1] != copy.board[i][i] || copy.board[i][i] == " ") {
          victory = false;
        }
      }
      if (victory) {
        copy.winner = copy.board[0][0];
        copy.won = true;
      }
      victory = true;
      for (let i = 1; i < copy.board.length; i++) {
        if (copy.board[i - 1][copy.board.length - i] != copy.board[i][copy.board.length - (i + 1)] || copy.board[i][copy.board.length - (i + 1)] == " ") {
          victory = false;
        }
      }
      if (victory) {
        copy.winner = copy.board[0][copy.board.length - 1];
        copy.won = true;
      }
    }

    return copy;
  }
  function handleClear() {
    const copy = {... board};
    copy.board = boardValue;
    copy.turn = "X";
    copy.won = false;
    copy.winner = " "
    setBoard(copy);
  }

  return (
    <>
      {board.board.map((value, index) => (
        <div style={{display: 'flex', backgroundColor: 'bisque'}}>
          {value.map((value2, index2) => (
            <div className='box' onClick={() => handleChangeState(index, index2)}>
              <h1>{value2}</h1>
            </div>
          ))}
        </div>
      ))}
      {board.won ?
        <h2>{board.winner} has won!</h2> :
        <p>{board.turn} to move (click any empty tile)</p>
      }
      <button onClick={() => handleClear()}>Reset</button>

    </>
  )
}

export default App