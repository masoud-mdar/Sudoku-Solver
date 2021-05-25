import React, {useState, useEffect} from "react"
import axios from "axios"

import Square from "./Square"

import {BASE_URL} from "../utils/constants"
import {puzzlesAndSolutions} from "../utils/puzzles"

const App = () => {

    const [cellInput, setCellInput] = useState([])
    const [selectedPuzzle, setSelectedPuzzle] = useState("")

    useEffect(() => {
        let tempArr = []
        for (let i=0; i<81; i++) {
            tempArr.push([])
        }
        setCellInput(tempArr)
    }, [])

    useEffect(() => {
        setSelectedPuzzle(puzzlesAndSolutions[0][0])
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
            //console.log(id)

            let tempInputArr = []

            for (let i=0; i<cellInput.length; i++) {
                tempInputArr.push(cellInput[i])
            }

            tempInputArr[id].shift()
            let onePartValueArr = value.split("")
            let onePartValue = onePartValueArr.length > 1 ? onePartValueArr[onePartValueArr.length-1] : value
            tempInputArr[id].push(onePartValue)

            let coordIdArr = coordId.split("")
            if (coordIdArr.length > 2) {
                coordIdArr.splice(1,2, (parseInt(id) - 8))

            }

            let finalCoordId = coordIdArr.join("")

            let sendingData = {
                puzzle: selectedPuzzle,
                coordinate: finalCoordId,
                value: onePartValue
            }

            axios.post(`${BASE_URL}/api/check`, sendingData).then(response => {
                const {data} = response
                console.log(data)
            })

            setCellInput(tempInputArr)

        }
    }

    //console.log(selectedPuzzle)


    return (
        <div>
            <Square
                data={{
                    handleChange: handleChange,
                    cellInput: cellInput,
                    selectedPuzzle: selectedPuzzle
                }}
            />
        </div>
    )
}

export default App