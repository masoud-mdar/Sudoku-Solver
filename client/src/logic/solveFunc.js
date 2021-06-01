const solveFunc = (setIsLoading, setIsCleanMode, setPuzzleError, isRawSquare, customCellInput, selectedPuzzle, axios, BASE_URL, setSolvedPuzzle) => {
    setIsLoading(true)
    setIsCleanMode(false)
    
    let puzzle = isRawSquare ? customCellInput.join("") : selectedPuzzle
    
    axios.post(`${BASE_URL}/api/solve`, {puzzle: puzzle}).then(response => {
        const {data} = response
        console.log(data)

        data.hasOwnProperty("error") ? setPuzzleError(true) : setSolvedPuzzle(data.solution)

        setIsLoading(false)
    })
}

export default solveFunc
