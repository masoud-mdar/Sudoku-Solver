const handleKeyPressFunc = (setCheckResult, setIsCleanMode, setSelectedValue, setCellInput, setMoves, setAllChecks, setCustomCellInput, setCustomKeys, code, rawId, isRawSquare, cellInput, selectedPuzzle, moves, selectedCell, axios, BASE_URL, allChecks, customCellInput, customKeys) => {

    setCheckResult({})
    setIsCleanMode(false)

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
    
                setCustomCellInput(tempInputArr)

                setCustomKeys(tempCustomKeysArr)

            }
        }
    }
}

export default handleKeyPressFunc