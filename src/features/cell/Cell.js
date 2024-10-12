import React from 'react';
import './cell.css';

export function Cell({ cell, onClick, onRightClick }) {
    const { isRevealed, isMine, isFlagged, neighborMines } = cell;

    const getValue = () => {
        if (!isRevealed){
            return isFlagged ? "🚩" : "";
        }

        if (isMine && isRevealed){
            return "💣";
        }

        if (neighborMines === 0){
            return "";
        }
        return neighborMines;
    }

    return (
    <div
        className={`cell ${isRevealed ? 'revealed' : ''} ${isFlagged ? 'flagged' : ''}`}
        onClick={onClick}
        onContextMenu={onRightClick}
    >
        {getValue()}

    </div>
    );
}