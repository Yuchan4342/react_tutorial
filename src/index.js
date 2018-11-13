import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square: controlled components by Board.
// Board has full control over Squares.
function Square(props) {
  return (
    // onClick prop: button に event listener をセット.
    // button をクリックすると onClick event が呼ばれる.
    // この event は props.onClick() を呼び,
    // Board で onClick として指定された prop が呼ばれる.
    // この prop は props.onClick() であり,
    // Game で onClick として指定された prop,
    // すなわち (i) => handleClick(i) が呼び出される.
    <button className="square" onClick={props.onClick}>
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // .slice(): レシーバの copy を作成する.
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      const diffLocation = getDiffLocation(move, history);

      return (
        <li key={ move }>
          <button onClick={() => this.jumpTo(move)}>{ desc }</button>
          <span> { diffLocation }</span>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
      return squares[a];
    }
  }
  return null;
}

// 前 step から変化した位置を文字列で示す.
// return the string of the location for move in step in the format (col, row).
function getDiffLocation(step, history) {
  let diff = -1;
  if (step) {
    const prev = history[step - 1].squares;
    const current = history[step].squares;
    for (let i = 0; i < prev.length; i++) {
      if (prev[i] !== current[i]) {
        diff = i;
        break;
      }
    }
  }
  let ret = (diff !== -1) ?
    '(' + (diff % 3) + ', ' + Math.floor(diff / 3) + ')' :
    '';
  return ret;
}