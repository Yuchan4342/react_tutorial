import React, { Component, Suspense } from 'react';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

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

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rowN = 3;
    const colN = 3;
    let rows = [];
    for (let i = 0; i < rowN; i++) {
      let columns = [];
      for (let j = 0; j < colN; j++) {
        columns.push(this.renderSquare(j + i * colN));
      }
      rows.push(<div className="board-row">{ columns }</div>);
    }
    return (
      <div>
        { rows }
      </div>
    );
  }
}

class LegacyGameClass extends Component {
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

  changeLanguage(locale) {
    i18next.changeLanguage(locale, (err) => {
      if (err) return console.log('something went wrong loading', err);
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const { t } = this.props;

    const moves = history.map((step, move) => {
      const descStr = move ?
        t('go_to_move', { number: move }):
        t('go_to_game_start');
      const desc = (move === this.state.stepNumber) ?
        <b>{ descStr }</b> : descStr;
      const diffLocation = getDiffLocation(move, history);

      return (
        <li key={ move }>
          <div className="history" onClick={() => this.jumpTo(move)}>{ desc }</div>
          <div className="diff-location">{ diffLocation }</div>
        </li>
      );
    });

    let status;
    if (winner) {
      status = <b className="winner">{ t('winner', { winner: winner }) }</b>;
    } else {
      status = t('next_player') + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <h1 className="title">{ t('tic_tac_toe') }</h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={ current.squares }
              onClick={(i) => this.handleClick(i)}
            />
            <div className="select-lang-box">
              <div>{ t('language') }</div>
              <div className="select-lang" onClick={() => this.changeLanguage('en')}>English</div>
              <div className="select-lang" onClick={() => this.changeLanguage('ja')}>日本語</div>
            </div>
          </div>
          <div className="game-info">
            <div className="game-status">{ status }</div>
            <ol>{ moves }</ol>
          </div>
        </div>
      </div>
    );
  }
}

const MyGame = withTranslation()(LegacyGameClass);

// i18n translations might still be loaded by the http backend
// use react's Suspense
export default function Game() {
  return (
    <Suspense fallback="loading">
      <MyGame />
    </Suspense>
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
