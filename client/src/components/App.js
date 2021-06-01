import React, {useState, useEffect} from "react"
import axios from "axios"

import RawSquare from "./RawSquare"
import Square from "./Square"
import Buttons from "./Buttons"

import solveFunc from "../logic/solveFunc"
import newOneFunc from "../logic/newOneFunc"
import undoFunc from "../logic/undoFunc"
import cellClickFunc from "../logic/cellClickFunc"
import handleKeyPressFunc from "../logic/handleKeyPressFunc"

import {BASE_URL} from "../utils/constants"
import {puzzles} from "../utils/puzzles"

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

    const [puzzleError, setPuzzleError] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const handleKeyPress = (Event) => {
        const {code} = Event
        const rawId = selectedCell
        handleKeyPressFunc(setCheckResult, setIsCleanMode, setSelectedValue, setCellInput, setMoves, setAllChecks, setCustomCellInput, setCustomKeys, code, rawId, isRawSquare, cellInput, selectedPuzzle, moves, selectedCell, axios, BASE_URL, allChecks, customCellInput, customKeys)
    
    }

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
        setSelectedPuzzle(puzzles[randomIndex][0])

        let tempPuzzleArr = puzzles[randomIndex][0].split("")

        let tempCellArr = []
        for (let i=0; i<tempPuzzleArr.length; i++) {

            tempCellArr.push([tempPuzzleArr[i]])
        }
        
        setCellInput(tempCellArr)
    }, [randomMaker])

    useEffect(() => {

        document.addEventListener("keydown", handleKeyPress)

        return () => {document.removeEventListener("keydown", handleKeyPress)}

    })

    const handleClick = (Event) => {
        const {name, id, innerHTML} = Event.target

        if (name === "solve-me") {

            // adding error response "puzzle can't be solved to isRawSquare part"
            solveFunc(setIsLoading, setIsCleanMode, setPuzzleError, isRawSquare, customCellInput, selectedPuzzle, axios, BASE_URL, setSolvedPuzzle)

        } else if (name === "unsolve-me") {
            setSolvedPuzzle("")
            setPuzzleError("")
            setIsCleanMode(false)
        } else if (name === "new-one") {

            newOneFunc(setSolvedPuzzle, setSelectedValue, setSelectedCell, setSelectedPuzzle, setAllChecks, setMoves, setCellInput, setIsCleanMode, setRandomMaker, setCustomCellInput, setCustomKeys, setPuzzleError, isRawSquare)

        } else if (name === "undo") {
            undoFunc(setIsCleanMode, setAllChecks, setSelectedCell, setSelectedValue, setMoves, setCellInput, setCheckResult, moves, isRawSquare, cellInput, allChecks)

        } else if (name === "clean") {

            setIsCleanMode(prevIsCleanMode => !prevIsCleanMode)

        } else if (name === "raw-square") {
            setIsRawSquare(prevIsRawSquare => !prevIsRawSquare)
            setSolvedPuzzle("")
            setPuzzleError("")
            !isRawSquare && setSolvedPuzzle("")

        } else {
            cellClickFunc(setSelectedCell, setSelectedValue, setCellInput, setMoves, setCheckResult, setIsCleanMode, setCustomCellInput, setCustomKeys, setAllChecks, id, innerHTML, isCleanMode, isRawSquare, moves, cellInput, allChecks, customCellInput, customKeys)
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
                                        selectedValue: selectedValue,
                                        isCleanMode: isCleanMode
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
                                isRawSquare: isRawSquare,
                                puzzleError: puzzleError,
                                isCleanMode: isCleanMode
                            }}
                        />


                    </div>

                ) : (

                    <div className="loading">
                        <h1>Loading...</h1>
                        <div className="loader"></div>
                    </div>
                )
            }

        </div>
    )
}

export default App