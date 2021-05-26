import React, {useState, useEffect} from "react"
import axios from "axios"

import Square from "./Square"

import {BASE_URL} from "../utils/constants"
import {puzzlesAndSolutions} from "../utils/puzzles"

const App = () => {

    const [cellInput, setCellInput] = useState([])  // an array of 81 array inputs
    const [selectedPuzzle, setSelectedPuzzle] = useState("")

    //const [selectedCellId, setSelectedCellId] = useState("")
    //const [selectedCellRaw, setSelectedCellRaw] = useState("")

    //const [selectedCell, setSelectedCell] = useState("")

    const [checkResult, setCheckResult] = useState({})

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
    

    const handleClick = (Event) => {
        const {name, value, id} = Event.target
        console.log(id)
        console.log(value)


        //setSelectedCell(id)
        //setSelectedCellId(id.split("").splice(1,1).join(""))
        //setSelectedCellRaw(id.split("").splice(0,1).join(""))

    }

    const handleChange = (Event) => {
        console.log("rrrr")
        const {name, value} = Event.target

        if (name === "cell") {

            if (/[1-9]/.test(value)) {

                const rawId = Event.target.id

                let coordinate = rawId.split("").slice(0,2).join("")
    
                let inputIndex = rawId.split("").slice(2).join("")
    
                let tempInputArr = JSON.parse(JSON.stringify(cellInput))
    
                tempInputArr[inputIndex].splice(0)
    
                //let onePartValue = value.split("").length > 1 ? value.split("")[value.split("").length-1] : value
                let onePartValue = value
    
                tempInputArr[inputIndex].push(onePartValue)

                setCellInput(tempInputArr)

                let sendingData = {
                    puzzle: selectedPuzzle,
                    coordinate: coordinate,
                    value: onePartValue
                }

                axios.post(`${BASE_URL}/api/check`, sendingData).then(response => {
                    const {data} = response
                    console.log(data)
                    setCheckResult(data)
                })



            }

        }
    }



    return (
        <div>
            <Square
                data={{
                    handleChange: handleChange,
                    handleClick: handleClick,
                    cellInput: cellInput,
                    selectedPuzzle: selectedPuzzle,
                    checkResult: checkResult
                }}
            />
        </div>
    )
}

export default App