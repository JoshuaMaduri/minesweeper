const initalizeGrid = (rows, columns, mines) => {
    const grid = Array(rows).fill(null).map(() => 
      Array(columns).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    )

    return grid
}

console.log(initalizeGrid(8, 8, 10))