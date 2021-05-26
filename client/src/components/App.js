import React, {useState, useEffect} from "react"
import axios from "axios"

//import Square from "./Square"
import Square2 from "./Square2"

import {BASE_URL} from "../utils/constants"
import {puzzlesAndSolutions} from "../utils/puzzles"

const App = () => {

    const [cellInput, setCellInput] = useState([])  // an array of 81 array inputs
    const [selectedPuzzle, setSelectedPuzzle] = useState("")

    //const [selectedCellId, setSelectedCellId] = useState("")
    //const [selectedCellRaw, setSelectedCellRaw] = useState("")

    const [selectedCell, setSelectedCell] = useState("")

    const [keyValue, setKeyValue] = useState("")

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



    useEffect(() => {
        
        const handleKeyPress = (Event) => {
            const {code} = Event
            const rawId = selectedCell
            //console.log(rawId)

            let value

            switch (code) {

                case "Digit1":
                    value = "1"
                    setKeyValue(value)
                    break
                case "Digit2":
                    value = "2"
                    setKeyValue(value)
                    break
                case "Digit3":
                    value = "3"
                    setKeyValue(value)
                    break
                case "Digit4":
                    value = "4"
                    setKeyValue(value)
                    break
                case "Digit5":
                    value = "5"
                    setKeyValue(value)
                    break
                case "Digit6":
                    value = "6"
                    setKeyValue(value)
                    break
                case "Digit7":
                    value = "7"
                    setKeyValue(value)
                    break
                case "Digit8":
                    value = "8"
                    setKeyValue(value)
                    break
                case "Digit9":
                    value = "9"
                    setKeyValue(value)
                    break
                default:
                    console.log(code)
                    break
            }

            let coordinate = rawId.split("").slice(0,2).join("")
    
            let inputIndex = rawId.split("").slice(2).join("")

            let tempInputArr = JSON.parse(JSON.stringify(cellInput))

            if (tempInputArr[inputIndex]) {

                //console.log(tempInputArr[inputIndex])

                tempInputArr[inputIndex].splice(0)

                tempInputArr[inputIndex].push(value)
    
                setCellInput(tempInputArr)

                let sendingData = {
                    puzzle: selectedPuzzle,
                    coordinate: coordinate,
                    value: value
                }

                axios.post(`${BASE_URL}/api/check`, sendingData).then(response => {
                    const {data} = response
                    //console.log(data)
                    setCheckResult(data)
                })
            }


        }

        document.addEventListener("keydown", handleKeyPress)

    }, [selectedCell, cellInput, selectedPuzzle])


    

    const handleClick = (Event) => {
        const {name, value, id} = Event.target

        setKeyValue("")

        setSelectedCell(id)

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
            <Square2
                data={{
                    handleChange: handleChange,
                    handleClick: handleClick,
                    cellInput: cellInput,
                    selectedPuzzle: selectedPuzzle,
                    checkResult: checkResult,
                    selectedCell: selectedCell
                }}
            />
        </div>
    )
}

export default App