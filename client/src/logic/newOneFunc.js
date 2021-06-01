const newOneFunc = (setSolvedPuzzle, setSelectedValue, setSelectedCell, setSelectedPuzzle, setAllChecks, setMoves, setCellInput, setIsCleanMode, setRandomMaker, setCustomCellInput, setCustomKeys, setPuzzleError, isRawSquare) => {

    setSolvedPuzzle("")
    setSelectedValue("")
    setSelectedCell("")
    setPuzzleError(false)

    if (!isRawSquare) {

        setSelectedPuzzle("")
        setAllChecks({})
        setMoves([])
        setCellInput([])
        setIsCleanMode(false)
        setRandomMaker(prevRandomMaker => prevRandomMaker += 1)

    } else if (isRawSquare) {

        let inputTempArr = []
        for (let i=0; i<81; i++) {
            inputTempArr.push(["."])
        }
        setCustomCellInput(inputTempArr)

        let keysTempArr = []
        for (let i=0; i<81; i++) {
            keysTempArr.push([false])
        }
        setCustomKeys(keysTempArr)
    }
}

export default newOneFunc