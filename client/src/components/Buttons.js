import React from "react"

const Buttons = (props) => {
    const {puzzleError, isCleanMode} = props.data
    const styles = {"border": "1px solid crimson"}

    return (
        <div className="buttons">
            {
                puzzleError && (
                    <div className="puzzle-error">
                        <h1>{puzzleError}</h1>
                    </div>
                )
            }
            <div className="solve-part">
                <button name="solve-me" onClick={props.data.handleClick} className="btn solve">Solve Me</button>

                <button name="unsolve-me" onClick={props.data.handleClick} className="btn unsolve">Unsolve Me</button>
            </div>

            <div className="undo-part">
                {
                    !props.data.isRawSquare && <div className="undo-wrapper">
                        <button name="undo" onClick={props.data.handleClick} className="btn undo"></button>
                        <div>Undo Moves</div>
                    </div>
                }

                <div className="clean-wrapper">
                    <button 
                    name="clean" 
                    onClick={props.data.handleClick} 
                    className="btn clean"
                    style={isCleanMode ? styles : {}}
                    ></button>
                    <div>Erase a number</div>
                </div>
                
            </div>

            <div className="control-part">
                <button name="new-one" onClick={props.data.handleClick} className="btn new">New Game</button>
                <button name="raw-square" onClick={props.data.handleClick} className="btn raw">
                    {
                        !props.data.isRawSquare ? (
                            "Custom Sudoku"
                        ) : (
                            "Just Play"
                        )
                    }
                </button>
            </div>
        </div>
    )
}

export default Buttons