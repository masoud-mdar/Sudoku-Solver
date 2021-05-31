const undoFunc = (setIsCleanMode, setAllChecks, setSelectedCell, setSelectedValue, setMoves, setCellInput, setCheckResult, moves, isRawSquare, cellInput, allChecks) => {

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
}

export default undoFunc