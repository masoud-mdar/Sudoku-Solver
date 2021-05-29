import React from "react"

const Square = (props) => {


    let tableRow = ["A","B","C","D","E","F","G","H","I"]

    const {selectedPuzzle, cellInput, solvedPuzzle, selectedCell, checkResult, allChecks, selectedValue} = props.data
    let selectedPuzzleArr = selectedPuzzle.split("")

    console.log(selectedValue)


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
                    
                    <div 
                    name="cell" 
                    key={Math.random() * Math.random()} 
                    id={`${row}${indexRow}${n}`}
                    onClick={props.data.handleClick}
                    style={{
                        backgroundColor: checkResult.rawId === `${row}${indexRow}${n}` && !checkResult.valid ? "#ffcdd4"
                        : selectedValue && selectedValue === cellInput[n].join("") && selectedRaw === row && !checkResult.valid ? "#ffcdd4"
                        : selectedValue && selectedValue === cellInput[n].join("") && selectedColumn === `${indexRow}` && !checkResult.valid ? "#ffcdd4"
                        : selectedCell === `${row}${indexRow}${n}` ? "#afdffc" 
                        : selectedRaw === row ? "#dfebf3" 
                        : selectedColumn === `${indexRow}` ? "#dfebf3"
                        : selectedValue && selectedValue === cellInput[n].join("") ? "#dfebf3"
                        : selectedValue && selectedValue === selectedPuzzleArr[n] ? "#dfebf3"
                        : "",

                        color: !solvedPuzzle && allChecks[`${row}${indexRow}${n}`] && !allChecks[`${row}${indexRow}${n}`].valid ? "#fb5365" 
                        : !solvedPuzzle && allChecks[`${row}${indexRow}${n}`] && allChecks[`${row}${indexRow}${n}`].valid ? "#1a91db" 
                        : "#304c64"
                    }}
                    className="cell">

                        {
                        !solvedPuzzle && puzzleIndexArr[n] ? selectedPuzzleArr[n] 
                        : !solvedPuzzle &&cellInput[n] &&cellInput[n].join("") !== "." ? cellInput[n].join("")
                        : solvedPuzzle ? solvedPuzzle.split("")[n]
                        : ""
                        }

                    </div>
                
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