import React, { useState, useEffect } from "react";
import "./tictac.css";

export default function TicTac() {
  const [squares, setSquares] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isNext, setIsNext] = useState(false);
  const [hasWinner, SetHasWinner] = useState(null);
  const [history, setHistory] = useState([squares]);

  const HandleOnClick = (index) => {
      
    if (calculateWinner(squares) || squares[index] !== null) {
      return;
    }
    let square = "null";
    let auxSquares = [...squares];

    if (squares[index] === null) {
      if (isNext) {
        square = "O";
      } else {
        square = "X";
      }
      setIsNext(!isNext);
      auxSquares[index] = square;
      setSquares(auxSquares);
      let auxHistory=[...history];
     
       auxHistory.push(squares); 
    
       setHistory(auxHistory);
    
    }

      
      
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner !== null) {
      SetHasWinner(winner);
      document.getElementById(winner[0]).className="btn btn-success";
      document.getElementById(winner[1]).className="btn btn-success";
      document.getElementById(winner[2]).className="btn btn-success";
    }
   
    
  }, [squares]);

  const moveHandle = (step,index) => {
   
    setSquares(step);
  };

  const moves = history.map((step, index) => {
    
    const desc = index ? "Go to move #" + index : "Go to game start";
    return (
      <li className="step-history" key={index}>
        <button className="btn btn-secondary" onClick={() => moveHandle(step,index)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="game-info">
        <div class="alert alert-info" role="alert">
          Next Player :{isNext ? "O" : "X"}
        </div>
        <div> {moves} </div>

        {hasWinner ? (
          <h1 className="badge badge-warning">GAME FINISH, Player {hasWinner[3]}  Win</h1>
        ) : (
          <div></div>
        )}
      </div>
      <div className="wraper">
        {squares.map((square, index) => (
          <Square
            key={index}
            index={index}
            square={square}
            HandleOnClick={HandleOnClick}
          />
        ))}
      </div>
    </div>
  );
}

function Square(props) {
  const { index, square } = props;

  return (
    <div className="btn btn-primary" id={index} onClick={() => props.HandleOnClick(index)}>
      {square}
    </div>
  );
}

function calculateWinner(squares) {
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
    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        const result=[a,b,c,squares[a]];
      return result;
    }
  }
  return null;
}
