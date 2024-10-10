import { Box } from "@mui/material"
import { Cell } from "../cell/Cell"

export const Board = () => {

    const value = {
        isMine: true,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0
    }

    const handleClick = () => {
        console.log('Left Click')
    }
    const contextMenu = (e) => {
        e.preventDefault();
        console.log('Right Click')
    }

    return (
        <Box sx={{backgroundColor: 'grey'}}>
            <Cell value={value} leftClick={handleClick} rightClick={contextMenu}/>
        </Box>
    )

}