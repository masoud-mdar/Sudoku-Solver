import React from "react"

const RawSquare = (props) => {


    let tableRow = ["A","B","C","D","E","F","G","H","I"]

    const {customCellInput, solvedPuzzle, selectedCell, customKeys} = props.data

    console.log(customKeys)


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

            let item = <td key={Math.random() * Math.random()}>
                <span name="cell" className="table-span">
                    
                    <div 
                    name="cell" 
                    key={Math.random() * Math.random()} 
                    id={`${row}${indexRow}${n}`}
                    onClick={props.data.handleClick}
                    style={{
                        backgroundColor: selectedCell === `${row}${indexRow}${n}` ? "#dfebf3" 
                        : selectedRaw === row ? "#dfebf3" 
                        : selectedColumn === `${indexRow}` ? "#dfebf3"
                        : "",

                        color: customKeys[n] && customKeys[n][0] === true ? "304c64" 
                        : ""
                    }}
                    className="cell">

                        {
                        !solvedPuzzle && customCellInput[n] && customCellInput[n].join("") !== "." ? customCellInput[n].join("")
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

export default RawSquare