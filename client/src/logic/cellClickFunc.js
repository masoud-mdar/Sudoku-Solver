const cellClickFunc = (setSelectedCell, setSelectedValue, setCellInput, setMoves, setCheckResult, setIsCleanMode, setCustomCellInput, setCustomKeys, setAllChecks, id, innerHTML, isCleanMode, isRawSquare, moves, cellInput, allChecks, customCellInput, customKeys) => {

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

export default cellClickFunc