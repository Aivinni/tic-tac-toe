import { useState } from 'react'
import './App.css'

interface board {
  board: [[string, string, string], [string, string, string], [string, string, string]];
  turn: string;
  won: boolean;
  winner: string;
}

function App() {
  const [board, setBoard] = useState<board>({
      board: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]],
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
    // Horizontal Victory
    for (const row of copy.board) {
      if (row[0] == row[1] && row[0] == row[2] && row[0] != " ") {
        copy.winner = row[0];
        copy.won = true;
      }
    }

    // Vertical Victory
    for (let i = 0; i < copy.board[0].length; i++) {
      if (copy.board[0][i] == copy.board[1][i] && copy.board[0][i] == copy.board[2][i] && copy.board[0][i] != " ") {
        copy.winner = copy.board[0][i];
        copy.won = true;
      }
    }

    // Diagonal victory
    if (copy.board[0][0] == copy.board[1][1] && copy.board[0][0] == copy.board[2][2] && copy.board[0][0] != " ") {
      copy.winner = copy.board[0][0];
      copy.won = true;
    }
    if (copy.board[0][2] == copy.board[1][1] && copy.board[0][2] == copy.board[2][0] && copy.board[0][2] != " ") {
      copy.winner = copy.board[0][2];
      copy.won = true;
    }
    return copy;
  }
  function handleClear() {
    const copy = {... board};
    copy.board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
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
