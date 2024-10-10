import './cell.css'

export const Cell = ({value, leftClick, rightClick}) => {

    return (
        <div className='cell' onClick={leftClick} onContextMenu={rightClick}>
            
        </div>
    )

}