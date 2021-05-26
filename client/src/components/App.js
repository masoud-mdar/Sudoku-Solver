import React, {useState, useEffect} from "react"
import axios from "axios"

//import Square from "./Square"
import Square2 from "./Square2"

import {BASE_URL} from "../utils/constants"
import {puzzlesAndSolutions} from "../utils/puzzles"

const App = () => {

    const [cellInput, setCellInput] = useState([])  // an array of 81 array inputs
    const [selectedPuzzle, setSelectedPuzzle] = useState("")

    const [selectedCell, setSelectedCell] = useState("")

    const [selectedValue, setSelectedValue] = useState("")

    const [checkResult, setCheckResult] = useState({})

    const [allChecks, setAllChecks] = useState({})

    //const [count, setCount] = useState(0)

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

            setCheckResult({})
            //console.log(rawId)
    
            let value
    
            switch (code) {
    
                case "Digit1":
                    value = "1"
                    setSelectedValue(value)
                    break
                case "Digit2":
                    value = "2"
                    setSelectedValue(value)
                    break
                case "Digit3":
                    value = "3"
                    setSelectedValue(value)
                    break
                case "Digit4":
                    value = "4"
                    setSelectedValue(value)
                    break
                case "Digit5":
                    value = "5"
                    setSelectedValue(value)
                    break
                case "Digit6":
                    value = "6"
                    setSelectedValue(value)
                    break
                case "Digit7":
                    value = "7"
                    setSelectedValue(value)
                    break
                case "Digit8":
                    value = "8"
                    setSelectedValue(value)
                    break
                case "Digit9":
                    value = "9"
                    setSelectedValue(value)
                    break
                default:
                    console.log(code)
                    break
            }
    
            let coordinate = rawId.split("").slice(0,2).join("")
    
            let inputIndex = rawId.split("").slice(2).join("")
    
            let tempInputArr = JSON.parse(JSON.stringify(cellInput))
    
            if (tempInputArr[inputIndex]) {
    
                tempInputArr[inputIndex].splice(0)
    
                tempInputArr[inputIndex].push(value)
    
                setCellInput(tempInputArr)
    
                let sendingData = {
                    puzzle: selectedPuzzle,
                    coordinate: coordinate,
                    value: value,
                    rawId: rawId
                }
    
                axios.post(`${BASE_URL}/api/check`, sendingData).then(response => {
                    const {data} = response
                    console.log(data)
                    setCheckResult(data)

                    let tempObj = JSON.parse(JSON.stringify(allChecks))
                    tempObj[rawId] = data
                    setAllChecks(tempObj)

                    //setCount(prevCount => prevCount += 1)
                })
            }
    
    
        }


        
        document.addEventListener("keydown", handleKeyPress)

        return () => {document.removeEventListener("keydown", handleKeyPress)}


    })


    

    const handleClick = (Event) => {
        const {id, innerHTML} = Event.target

        setSelectedCell(id)

        setSelectedValue(innerHTML)

    }

    const handleChange = (Event) => {
        console.log("rrrr")
        //const {name, value} = Event.target

        /*if (name === "cell") {

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

        }*/
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
                    selectedCell: selectedCell,
                    allChecks: allChecks,
                    selectedValue: selectedValue
                }}
            />
        </div>
    )
}

export default App