import React from "react"

const Square = (props) => {

    const grrenStyle = {color: "blue"}
    const redStyle = {color: "red"}
    const bgColor = {backgroundColor: "grey"}

    let tableRow = ["A","B","C","D","E","F","G","H","I"]

    const {selectedPuzzle} = props.data
    let selectedPuzzleArr = selectedPuzzle.split("")
    let puzzleIndexArr = selectedPuzzleArr.map(element => {
        return element === "." ? false : true
    })

    const tableMaker = (row, d) => {

        let indexAbsolute = ((9*(d+1)) - 1)

        let tempArr = []

        let n = indexAbsolute - 8

        let indexRow = 1

        while (n <= indexAbsolute) {
            //console.log(indexRow)
            let item = <td key={Math.random() * Math.random()}>
                <span className="table-span">
                    <div className="warning-row"></div><div className="warning-col"></div><div className="warning-reg"></div>
                    
                    <input 
                    type="text"
                    name="cell" 
                    key={Math.random() * Math.random()} 
                    id={`${row}${indexRow}${n}`}

                    onChange={props.data.handleChange} 
                    onClick={props.data.handleClick} 
                    value={puzzleIndexArr[n] ? selectedPuzzleArr[n] : props.data.cellInput[n]}

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