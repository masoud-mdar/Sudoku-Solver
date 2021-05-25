import React, {useState, useEffect} from "react"
import Square from "./Square"

const App = () => {

    const [cellInput, setCellInput] = useState([])

    useEffect(() => {
        let tempArr = []
        for (let i=0; i<81; i++) {
            tempArr.push([])
        }
        setCellInput(tempArr)
    }, [])

    const handleClick = () => {

    }

    const handleChange = (Event) => {
        const {name, value} = Event.target
        const coordId = Event.target.id
        console.log(coordId)
        console.log(value)

        if (name === "cell") {
            let tempArr = coordId.split("")
            tempArr.shift()
            const id = tempArr.join("")
            console.log(id)

            let tempInputArr = []

            for (let i=0; i<cellInput.length; i++) {
                tempInputArr.push(cellInput[i])
            }

            tempInputArr[id].shift()
            let onePartValueArr = value.split("")
            let onePartValue = onePartValueArr[onePartValueArr.length-1]
            tempInputArr[id].push(onePartValue)

            setCellInput(tempInputArr)

        }
    }

    //console.log(cellInput)


    return (
        <div>
            <Square
                data={{
                    handleChange: handleChange,
                    cellInput: cellInput
                }}
            />
        </div>
    )
}

export default App