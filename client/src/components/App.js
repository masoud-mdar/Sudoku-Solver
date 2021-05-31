import React, {useState, useEffect} from "react"
import axios from "axios"

import RawSquare from "./RawSquare"
import Square from "./Square"
import Buttons from "./Buttons"

import {BASE_URL} from "../utils/constants"
import {puzzlesAndSolutions} from "../utils/puzzles"


import solveFunc from "../logic/solveFunc"
import newOneFunc from "../logic/newOneFunc"

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

    const [isCleanMode, setIsCleanMode] = useState(false)

    const [isRawSquare, setIsRawSquare] = useState(false)

    const [customCellInput, setCustomCellInput] = useState({})

    const [customKeys, setCustomKeys] = useState([])

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        let tempArr = []
        for (let i=0; i<81; i++) {
            tempArr.push(["."])
        }
        setCustomCellInput(tempArr)
    }, [isRawSquare]) 

    useEffect(() => {
        let tempArr = []
        for (let i=0; i<81; i++) {
            tempArr.push([false])
        }
        setCustomKeys(tempArr)
    }, [isRawSquare]) 


    useEffect(() => {
        let randomIndex = Math.floor(Math.random() * 5) 
        setSelectedPuzzle(puzzlesAndSolutions[randomIndex][0])

        let tempPuzzleArr = puzzlesAndSolutions[randomIndex][0].split("")
        //console.log(tempPuzzleArr)

        let tempCellArr = []
        for (let i=0; i<tempPuzzleArr.length; i++) {

            tempCellArr.push([tempPuzzleArr[i]])
            
        }
        
        setCellInput(tempCellArr)
    }, [randomMaker])




    useEffect(() => {

        const handleKeyPress = (Event) => {
            const {code} = Event
            const rawId = selectedCell

            setCheckResult({})
            setIsCleanMode(false)
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

                if (!isRawSquare) {

                    let coordinate = rawId.split("").slice(0,2).join("")
    
                    let inputIndex = rawId.split("").slice(2).join("")
            
                    let tempInputArr = JSON.parse(JSON.stringify(cellInput))

                    let selectedPuzzleArr = selectedPuzzle.split("")
            
                    if (tempInputArr[inputIndex] && selectedPuzzleArr[inputIndex] === ".") {
            
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
                            puzzle: cellInput.join(""),
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




                } else if (isRawSquare) {
    
                    let inputIndex = rawId.split("").slice(2).join("")
            
                    let tempInputArr = JSON.parse(JSON.stringify(customCellInput))

                    let tempCustomKeysArr = JSON.parse(JSON.stringify(customKeys))

                    if (tempInputArr[inputIndex]) {
            
                        tempInputArr[inputIndex].splice(0)
                        tempInputArr[inputIndex].push(value)

                        tempCustomKeysArr[inputIndex].splice(0)
                        tempCustomKeysArr[inputIndex].push(true)

                        ///////////////////////////////////////////////
            
                        setCustomCellInput(tempInputArr)

                        setCustomKeys(tempCustomKeysArr)

                        //console.log(tempInputArr.join(""))

                    }


                }
                

            }
    
        }

        document.addEventListener("keydown", handleKeyPress)

        return () => {document.removeEventListener("keydown", handleKeyPress)}

    })


    

    const handleClick = (Event) => {
        const {name, id, innerHTML} = Event.target

        if (name === "solve-me") {

            // adding error response "puzzle can't be solved to isRawSquare part"
            solveFunc(setIsLoading, setIsCleanMode, isRawSquare, customCellInput, selectedPuzzle, axios, BASE_URL, setSolvedPuzzle)



        } else if (name === "unsolve-me") {
            setSolvedPuzzle("")
            setIsCleanMode(false)
        } else if (name === "new-one") {

            newOneFunc(setSolvedPuzzle, setSelectedValue, setSelectedCell, setSelectedPuzzle, setAllChecks, setMoves, setCellInput, setIsCleanMode, setRandomMaker, setCustomCellInput, setCustomKeys, isRawSquare)

        } else if (name === "undo") {
            console.log("undo")
            setIsCleanMode(false)

            if (moves.length >= 1 && !isRawSquare) {

                let movesTempArr = JSON.parse(JSON.stringify(moves))
                let tempInputArr = JSON.parse(JSON.stringify(cellInput))
    
                let undoIndex = movesTempArr[movesTempArr.length - 1][0]

                let lastItemrawId = movesTempArr[movesTempArr.length - 1][1]

                let tempAllChecks = JSON.parse(JSON.stringify(allChecks))
                delete tempAllChecks[lastItemrawId]
                setAllChecks(tempAllChecks)

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
                setCheckResult({})

            }



        } else if (name === "clean") {

            setIsCleanMode(true)

        } else if (name === "raw-square") {
            setIsRawSquare(prevIsRawSquare => !prevIsRawSquare)
            setSolvedPuzzle("")

            if (!isRawSquare) {
                console.log("zzz")
                setSolvedPuzzle("")
            
            }



        } else {

            setSelectedCell(id)
            setSelectedValue(innerHTML)
            

            if (isCleanMode && !isRawSquare) {

                let movesTempArr = JSON.parse(JSON.stringify(moves))
                let tempInputArr = JSON.parse(JSON.stringify(cellInput))

                let inputIndex = id.split("").slice(2).join("")

                tempInputArr.splice(inputIndex, 1, ["."])
                setCellInput(tempInputArr)
                

                let indexInMoves = movesTempArr.findIndex(element => {
                    return element.indexOf(id) > -1
                })

                movesTempArr.splice(indexInMoves, 1)

                setMoves(movesTempArr)

                let tempAllChecks = JSON.parse(JSON.stringify(allChecks))
                delete tempAllChecks[id]

                setAllChecks(tempAllChecks)

                setCheckResult({})

                setSelectedValue("")
                setIsCleanMode(false)

            } else if (isCleanMode && isRawSquare) {

                let tempInputArr = JSON.parse(JSON.stringify(customCellInput))
                let tempCustomKeysArr = JSON.parse(JSON.stringify(customKeys))

                let inputIndex = id.split("").slice(2).join("")

                tempInputArr.splice(inputIndex, 1, ["."])
                setCustomCellInput(tempInputArr)

                tempCustomKeysArr.splice(inputIndex, 1, [false])
                setCustomKeys(tempCustomKeysArr)

                setSelectedValue("")
                setIsCleanMode(false)
            }


        }



    }




    return (
        <div>
            {
                !isLoading ? (
                    <div className="container">
                        {
                            !isRawSquare ? (
                                <Square
                                    data={{
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
                            ) : (
                                <RawSquare
                                    data={{
                                        handleClick: handleClick,
                                        customCellInput: customCellInput,
                                        customKeys: customKeys,
                                        solvedPuzzle: solvedPuzzle,
                                        selectedCell: selectedCell,
                                        selectedValue: selectedValue
                                    }}
                                />
                            )
                        }

                        <Buttons
                            data={{
                                handleClick: handleClick,
                                isRawSquare: isRawSquare
                            }}
                        />


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