import './main.css'

import React, { Component } from 'react'

import Modal from './Components/Modal'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      turn: 'X',
      gameEnded: false,
      winner: false,
      winnerLine: '',
      showModal: false,
      playerTurnLine: 'Player X plays first'
    }
    this.gameState = {
      board: Array(9).fill(''),
      totalMoves: 0
    }
  }

  modalHandler = () => {
    this.setState({
      showModal: false
    })
    window.location.reload()
    // this.gameState.board = []
  }

  handleClick = (e) => {
    if (this.gameState.board[e.target.dataset.square] === '') {
      e.target.innerText = this.state.turn
      this.gameState.board[e.target.dataset.square] = this.state.turn
      this.setState({
        turn: this.state.turn === 'X' ? 'O' : 'X'
      })
      this.gameState.totalMoves++
    }

    if (this.state.turn === 'X') {
      this.setState({
        playerTurnLine: `Player O's turn`
      })
    }

    if (this.state.turn === 'O') {
      this.setState({
        playerTurnLine: `Player X's turn`
      })
    }

    const result = this.checkWinner()

    if (result === 'X') {
      this.setState({
        gameEnded: true,
        winner: true,
        winnerLine: 'Player X wins',
        showModal: true
      })
    } else if (result === 'O') {
      this.setState({
        gameEnded: true,
        winner: true,
        winnerLine: 'Player O wins',
        showModal: true
      })
    } else if (result === 'draw') {
      this.setState({
        gameEnded: true,
        winner: undefined,
        winnerLine: 'Match is drawn!',
        showModal: true
      })
    }
    console.log(this.gameState.totalMoves)
    // console.log(this.state.board)
  }

  checkWinner = () => {
    const moves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    let board = this.gameState.board

    for (let i = 0; i < moves.length; i++) {
      if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
        return board[moves[i][0]]
      }

      if (this.gameState.totalMoves === 9) {
        return 'draw'
      }
    }
  }
  render() {
    const { winnerLine, showModal, playerTurnLine, gameEnded } = this.state
    return (
      <div className="main-ctn vh-100 d-flex flex-column justify-content-center align-items-center">
        {showModal && <Modal winnerLine={winnerLine} modalHandler={this.modalHandler} />}

        <div className="fixed-top text-center p-7">
          <h3 className="text-uppercase">Moscode's Tic Tac Toe game</h3>
        </div>
        {gameEnded ? null : <p className="mb-5">{playerTurnLine}</p>}
        <div
          className="board container w-30 d-flex flex-wrap align-items-center justify-content-center"
          onClick={this.handleClick}
        >
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
        <div className="footer">
          <span>
            Made with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            from Moscode
          </span>
        </div>
      </div>
    )
  }
}
