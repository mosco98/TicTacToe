import React from 'react'

const Modal = ({ winnerLine, modalHandler }) => {
  return (
    <div
      className="position-fixed vh-100 w-100 d-flex justify-content-center align-items-center shadow-sm"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="d-flex flex-column align-items-center justify-content-center border p-5 border bg-warning">
        <span className="mb-2 shadow" style={{ fontSize: '1rem' }}>
          {winnerLine}
        </span>
        <button className="btn btn-primary p-1" onClick={modalHandler} style={{}}>
          Restart game
        </button>
      </div>
    </div>
  )
}

export default Modal
