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

    const [solvedPuzzle, setSolvedPuzzle] = useState("")

    const [moves, setMoves] = useState([])

    const [randomMaker, setRandomMaker] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let tempArr = []
        for (let i=0; i<81; i++) {
            tempArr.push([])
        }
        setCellInput(tempArr)
    }, [randomMaker])


    useEffect(() => {
        let randomIndex = Math.floor(Math.random() * 5)
        setSelectedPuzzle(puzzlesAndSolutions[randomIndex][0])
    }, [randomMaker])




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

            if (/[1-9]/.test(code)) {
                
                let coordinate = rawId.split("").slice(0,2).join("")
    
                let inputIndex = rawId.split("").slice(2).join("")
        
                let tempInputArr = JSON.parse(JSON.stringify(cellInput))
        
                if (tempInputArr[inputIndex]) {
        
                    tempInputArr[inputIndex].splice(0)
        
                    tempInputArr[inputIndex].push(value)
        
                    setCellInput(tempInputArr)
    
                    let tempMovesArr = JSON.parse(JSON.stringify(moves))
                    let lastItem = tempMovesArr[tempMovesArr.length-1]
                    //console.log(tempMovesArr)
                    //console.log(lastItem)
                    if (lastItem && lastItem[0] !== inputIndex) {
                        tempMovesArr.push([inputIndex, rawId])
                        setMoves(tempMovesArr)
                    } else if (!lastItem) {
                        tempMovesArr.push([inputIndex, rawId])
                        setMoves(tempMovesArr)
                    }

        
                    let sendingData = {
                        puzzle: selectedPuzzle,
                        coordinate: coordinate,
                        value: value,
                        rawId: rawId
                    }
        
                    axios.post(`${BASE_URL}/api/check`, sendingData).then(response => {
                        const {data} = response
                        //console.log(data)
                        setCheckResult(data)
    
                        let tempObj = JSON.parse(JSON.stringify(allChecks))
                        tempObj[rawId] = data
                        setAllChecks(tempObj)
    
                        //setCount(prevCount => prevCount += 1)
                    })
                }
            }
    

    
    
        }


        
        document.addEventListener("keydown", handleKeyPress)

        return () => {document.removeEventListener("keydown", handleKeyPress)}


    })


    

    const handleClick = (Event) => {
        const {name, id, innerHTML} = Event.target

        if (name === "solve-me") {

            setIsLoading(true)

            axios.post(`${BASE_URL}/api/solve`, {puzzle: selectedPuzzle}).then(response => {
                const {data} = response
                //console.log(data)
                setSolvedPuzzle(data.solution)
                setIsLoading(false)
            })

        } else if (name === "unsolve-me") {
            setSolvedPuzzle("")
        } else if (name === "new-one") {

            setSolvedPuzzle("")
            setSelectedValue("")
            setSelectedCell("")
            setSelectedPuzzle("")
            setAllChecks({})
            setMoves([])
            setCellInput([])
            setRandomMaker(prevRandomMaker => prevRandomMaker += 1)

        } else if (name === "undo") {

            if (moves.length >= 1) {

                let movesTempArr = JSON.parse(JSON.stringify(moves))
                let tempInputArr = JSON.parse(JSON.stringify(cellInput))
    
                let undoIndex = movesTempArr[movesTempArr.length - 1][0]

                let lastItemrawId = movesTempArr[movesTempArr.length - 1][1]
                delete allChecks[lastItemrawId]

                tempInputArr.splice(undoIndex, 1, [])
    
                movesTempArr.pop()
    

                if (moves.length > 1) {
                    let newIndex = movesTempArr[movesTempArr.length - 1][0]
                    setSelectedCell(movesTempArr[movesTempArr.length - 1][1])
                    setSelectedValue(tempInputArr[newIndex].join(""))
                } else {
                    setSelectedCell("")
                    setSelectedValue("")
                }

                setMoves(movesTempArr)
                setCellInput(tempInputArr)

            }



        } else {
            //console.log(name)
            setSelectedCell(id)

            setSelectedValue(innerHTML)
        }



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

    //console.log(cellInput)
    //console.log(moves)
    //console.log(allChecks)



    return (
        <div>
            {
                !isLoading ? (
                    <div className="container">
                        <Square2
                            data={{
                                handleChange: handleChange,
                                handleClick: handleClick,
                                cellInput: cellInput,
                                selectedPuzzle: selectedPuzzle,
                                solvedPuzzle: solvedPuzzle,
                                checkResult: checkResult,
                                selectedCell: selectedCell,
                                allChecks: allChecks,
                                selectedValue: selectedValue
                            }}
                        />

                        <br />

                        <button name="solve-me" onClick={handleClick}>Solve Me</button>
                        <br />
                        <button name="unsolve-me" onClick={handleClick}>Unsolve Me</button>
                        <br />
                        <button name="new-one" onClick={handleClick}>New Puzzle</button>
                        <br />
                        <button name="undo" onClick={handleClick}>Undo</button>
                    </div>

                ) : (
                    <div className="loading">
                        <h1>Loading...</h1>
                    </div>
                )
            }

        </div>
    )
}

export default App