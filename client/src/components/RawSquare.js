import React from "react"

const Square = (props) => {


    let tableRow = ["A","B","C","D","E","F","G","H","I"]

    const {selectedPuzzle, solvedPuzzle, selectedCell, checkResult, allChecks, selectedValue} = props.data
    let selectedPuzzleArr = selectedPuzzle.split("")


    let puzzleIndexArr = selectedPuzzleArr.map(element => {
        return element === "." ? false : true
    })

    let selectedColumn
    let selectedRaw

    if (selectedCell) {
        let columnArr = selectedCell.split("")
        selectedColumn = columnArr[1]
        selectedRaw = columnArr[0]
        
    }



    const tableMaker = (row, d) => {

        let indexAbsolute = ((9*(d+1)) - 1)

        let tempArr = []

        let n = indexAbsolute - 8

        let indexRow = 1

        while (n <= indexAbsolute) {
            //console.log(indexRow)
            let item = <td key={Math.random() * Math.random()}>
                <span name="cell" className="table-span">
                    <div className="coordinates">
                        {
                            allChecks[`${row}${indexRow}${n}`] && allChecks[`${row}${indexRow}${n}`].valid ? `${row}${indexRow}`
                            : allChecks[`${row}${indexRow}${n}`] && !allChecks[`${row}${indexRow}${n}`].valid && allChecks[`${row}${indexRow}${n}`].conflict ? <ul>{allChecks[`${row}${indexRow}${n}`].conflict.map(element => <li key={element}>{element}</li>)}</ul>
                            : ""
                        }
                    </div>
                    
                    <input 
                    name="cell" 
                    type="text"
                    key={Math.random() * Math.random()} 
                    id={`${row}${indexRow}${n}`}
                    onClick={props.data.handleClick}
                    onChange={props.data.handleChange}
                    style={{
                        backgroundColor: checkResult.rawId === `${row}${indexRow}${n}` && !checkResult.valid ? "yellow"
                        : selectedCell === `${row}${indexRow}${n}` ? "gray" 
                        : selectedRaw === row ? "gray" 
                        : selectedColumn === `${indexRow}` ? "gray"
                        : selectedValue && selectedValue === props.data.cellInput[n].join("") ? "gray"
                        : selectedValue && selectedValue === selectedPuzzleArr[n] ? "gray"
                        : "",

                        color: !solvedPuzzle && allChecks[`${row}${indexRow}${n}`] && !allChecks[`${row}${indexRow}${n}`].valid ? "red" 
                        : !solvedPuzzle && allChecks[`${row}${indexRow}${n}`] && allChecks[`${row}${indexRow}${n}`].valid ? "green" 
                        : ""
                    }}

                    value={

                        !solvedPuzzle && puzzleIndexArr[n] ? selectedPuzzleArr[n] 
                        : !solvedPuzzle && props.data.cellInput[n] ? props.data.cellInput[n].join("")
                        : solvedPuzzle.split("")[n]
                    }
                    className="cell">

                    </input>
                
                </span>
            </td>
            
            tempArr.push(item)
            n ++
            indexRow ++
        }

        return (
            <tr key={Math.random() * Math.random()}>
                {
                    tempArr.map(item => item)
                }
            </tr>
        )
    }

    

    return (
        <div className="table-wrapper">
            <table className="table">
                <tbody>
                    {
                        tableRow.map((row, d) => tableMaker(row, d))
                    }
                </tbody>
            </table>

        </div>
    )

}

export default Square