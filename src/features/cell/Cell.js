import React from 'react';
import './cell.css';

export function Cell({ cell, onClick, onRightClick }) {
  const { isRevealed, isMine, isFlagged, neighborMines } = cell;

  return (
    <div
      className={`cell ${!isRevealed ? 'revealed' : ''} ${isFlagged ? 'flagged' : ''}`}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {isRevealed && isMine && '💣'}
      {isRevealed && !isMine && neighborMines > 0 && neighborMines}
    </div>
  );
}