import React from "react"

const Square = (props) => {

    let tableRow = ["A","B","C","D","E","F","G","H","I"]

    const tableMaker = (row, d) => {

        let indexFinder = ((9*(d+1)) - 1)

        let tempArr = []

        let n = indexFinder - 8

        while (n <= indexFinder) {
            let item = <td key={Math.random() * Math.random()}><span><div className="warning"></div><input type="text" key={Math.random() * Math.random()} id={`${row}${n}`} onChange={props.data.handleChange} value={props.data.cellInput[n]} name="cell" className="cell"></input></span></td>
            tempArr.push(item)
            n++
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