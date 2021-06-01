class SudokuSolver {

    validate(puzzleString) {
      let result = true
      if (puzzleString.length !== 81) {
        result = {"error": "Expected puzzle to be 81 characters long"}
      } else {
        let regex =/[1-9]/
        let puzzleArr = puzzleString.split("")
        let ans = true
        puzzleArr.map(i => {
          if (regex.test(i) === false) {
            if (i !== ".") {
              ans = false
            }
          }
        })
        if (!ans) {
          result = { "error": "Invalid characters in puzzle" }
        } else {
          result = ans
        }
      }
      return result
    }
  
    checkRowPlacement(puzzleString, row, column, value) {
      let puzzleArr = puzzleString.split("")

      let rowArr = ["A","B","C","D","E","F","G","H","I"]
      let rowIndex = rowArr.indexOf(row)
  
      // 0-8 9-17 18-26 27-35 36-44 45-53 54-62 63-71 72-80
  
      let mainArr = []
      // in mainArr, each child array represents a row
      for (let i=0; i<81; i+=9) {

        let tempArr = puzzleArr.slice(i, i+9)
        mainArr.push(tempArr)
      }
  
      // the row that we want :
      let oneRow = mainArr[rowIndex]
  
      let num = oneRow[column-1]
  
      let finder = oneRow.indexOf(value)
      if (finder > -1) {
        let clueChecker = oneRow.filter(i => i === value)
        if (num == value) {
          return {validation: "clue", arr: mainArr, one: oneRow, clueChecker: clueChecker}
        } else {
          return {validation: false, arr: mainArr, one: oneRow, clueChecker: clueChecker}
        }
      } else {
        return {validation: true, arr: mainArr, one: oneRow}
      }
    }
  
    checkColPlacement(puzzleString, row, column, value) {
  
      let puzzleArr = puzzleString.split("")
  
      let mainArr = []
  
      let rowArr = ["A","B","C","D","E","F","G","H","I"]
      let rowIndex = rowArr.indexOf(row)
  
      //col1: 1,10,19,28,37,46,55,64,73
      //col2: 2,11,20,29,38,47,56,65,74
      //col3: 3,12,21,30,39,48,57,66,75
      //col4: 4,13,22,31,40,49,58,67,76
      //col5: 5,14,23,32,41,50,59,68,77
      //col6: 6,15,24,33,42,51,60,69,78
      //col7: 7,16,25,34,43,52,61,70,79
      //col8: 8,17,26,35,44,53,62,71,80
      //col9: 9,18,27,36,45,54,63,72,81
  
      for (let i=0; i<9; i++) {
   
        let n = 0
        let tempArr = []
        let index = i
        while (n<9) {
          tempArr.push(puzzleArr[index])
          index += 9
          n++
        }
        mainArr.push(tempArr)
      }
  
      let oneColumn = mainArr[column-1]
  
      let num = oneColumn[rowIndex]
  
      let finder = oneColumn.indexOf(value)
  
      if (finder > -1) {
        let clueChecker = oneColumn.filter(i => i === value)
        if (num == value) {
          return {validation: "clue", arr: mainArr, one: oneColumn, clueChecker: clueChecker}
        } else {
          return {validation: false, arr: mainArr, one: oneColumn, clueChecker: clueChecker}
        }
      } else {
        return {validation: true, arr: mainArr, one: oneColumn}
      }
    }
  
    checkRegionPlacement(puzzleString, row, column, value) {
  
      let puzzleArr = puzzleString.split("")
      let mainArr = []
  
      //region1: 0,1,2, 9,10,11, 18,19,20
      //region2: 3,4,5, 12,13,14, 21,22,23
      //region3: 6,7,8, 15,16,17, 24,25,26
  
      //region4: 27,28,29, 36,37,38, 45,46,47
      //region5: 30,31,32, 39,40,41, 48,49,50
      //region6: 33,34,35, 42,43,44, 51,52,53
  
      //region7: 54,55,56, 63,64,65, 72,73,74 
      //region8: 57,58,59, 66,67,68, 75,76,77
      //region9: 60,61,62, 69,70,71, 78,79,80
      
      //First we create an array of 9 region:
  
      for (let i=0; i<9; i++) {
        //each i represents one region array
        let n = 1
        let index
        let tempArr = []
        //index represents the index of the first item in each region (0,3,6,27,30,33,54,57,60)
        if (i>=0 && i<3) {
          index = i*3
        } else if (i>=3 && i<6) {
          index = i*3 + 18
        } else {
          index = i*3 + 36
        }
  
        while (n<=9) {
          //n represents the number of elements in each region array
          tempArr.push(puzzleArr[index])
          
          if (index%3 === 2 && index>0) {
            index += 7
          } else {
            index ++
          }
          n++
        }
        mainArr.push(tempArr)
      }
  
      // now we have to find out the coordinate is for which region
      let rowArr = [["A","B","C"],["D","E","F"],["G","H","I"]]
      let colArr = [["1","2","3"],["4","5","6"],["7","8","9"]]
      
      let regionRow = rowArr.findIndex((element,i) => {
        let index = element.indexOf(row)
        if (index > -1) {
          return true
        }
      })
  
      let regionCol = colArr.findIndex((element,i) => {
        
        let index = element.indexOf(column)
        if (index > -1) {
          return true
        }
      })
  
      //region1: 0,0
      //region2: 0,1
      //region3: 0,2
      //region4: 1,0
      //region5: 1,1
      //region6: 1,2
      //region7: 2,0
      //region8: 2,1
      //region9: 2,2
      let regionMap = [[1,2,3],[4,5,6],[7,8,9]]
  
      let regionIndex = regionMap[regionRow][regionCol]
  
      //oneRegion is the Region that we search for!
      //Attention: regionIndex - 1, because in mainArr, index starts with 0, not 1
  
      let oneRegion = mainArr[regionIndex-1]
  
      // Finally we check to see if value exists in our region or not Remember that value has already passed the tests of row and column
      let tester = oneRegion.indexOf(value)
  
      if (tester > -1) {
        let clueChecker = oneRegion.filter(i => i === value)
        let x = this.checkRowPlacement(puzzleString, row, column, value)
        let y = this.checkColPlacement(puzzleString, row, column, value)
        if (x.validation === "clue" && y.validation === "clue") {
          return {validation: true, arr: mainArr, one: oneRegion, clueChecker: clueChecker}
        } else {
          return {validation: false, arr: mainArr, one: oneRegion, clueChecker: clueChecker}
        }
      } else {
        return {validation: true, arr: mainArr, one: oneRegion}
      }
  
    }
  
    solve(puzzleString) {
      let puzzleArr = puzzleString.split("")
  
      // Finding the index of each empty cell in our puzzle string
      let indexArr = [] 
      puzzleArr.map((element, i) => {
        if (element === ".") {
          indexArr.push(i)
        }
      })
  
      // now we should find out each index is in which region
      // first we should turn the index into coordinate
      let coordMap =[
        "A1","A2","A3","A4","A5","A6","A7","A8","A9",
        "B1","B2","B3","B4","B5","B6","B7","B8","B9",
        "C1","C2","C3","C4","C5","C6","C7","C8","C9",
        "D1","D2","D3","D4","D5","D6","D7","D8","D9",
        "E1","E2","E3","E4","E5","E6","E7","E8","E9",
        "F1","F2","F3","F4","F5","F6","F7","F8","F9",
        "G1","G2","G3","G4","G5","G6","G7","G8","G9",
        "H1","H2","H3","H4","H5","H6","H7","H8","H9",
        "I1","I2","I3","I4","I5","I6","I7","I8","I9"
      ]
  
      // now we have the coordinate of all the empty cells:
      let coordArr = []
  
      indexArr.map(element => {
        coordArr.push([coordMap[element][0], coordMap[element][1]])
      })
      
      // Now we find the row, column and region of each cell
      let clueArr = []
      coordArr.map(element => {
        //clueArr.push([oneRow, oneColumn, oneRegion])
        let x = this.checkRowPlacement(puzzleString, element[0], element[1], 0)
        let y = this.checkColPlacement(puzzleString, element[0], element[1], 0)
        let z = this.checkRegionPlacement(puzzleString, element[0], element[1], 0)
        clueArr.push([x.one, y.one, z.one])
      })
  
      // First we check if the puzzle is valid:
      let clueIndexArr = []
      puzzleArr.map((element, i) => {
        if (element !== ".") {
          clueIndexArr.push(i)
        }
      })
  
      let clueCoordArr = []
  
      clueIndexArr.map(element => {
        clueCoordArr.push([coordMap[element][0], coordMap[element][1]])
      })
  
      let k = 0
      let puzzleCheckerArr = []
  
      while (k<clueIndexArr.length) {
        let value = puzzleArr[clueIndexArr[k]]
        let row = clueCoordArr[k][0]
        let col = clueCoordArr[k][1]
        let x = this.checkRowPlacement(puzzleString, row, col, value)
        let y = this.checkColPlacement(puzzleString, row, col, value)
        let z = this.checkRegionPlacement(puzzleString, row, col, value)
  
        if (x.clueChecker.length === 1 && y.clueChecker.length === 1 && z.clueChecker.length === 1) {
          puzzleCheckerArr.push(true)
        } else {
          puzzleCheckerArr.push(false)
        }
  
        k++
      }
  
      let unvalid = puzzleCheckerArr.some(item => {
        return item === false
      })
  
      if (unvalid) {
        return {error: 'Puzzle cannot be solved'}
      }
  
      // now we find:
      //1. the potentiel choices for each cell based on its row
      //2. the potentiel choices for each cell based on its column
      //3. the potentiel choices for each cell based on its region
  
      let numArr = ["1","2","3","4","5","6","7","8","9"]
  
      // 1. row choices
      let rowChoices = []
      clueArr.map(element => {
        let tempArr = numArr.filter(item => {
          return element[0].indexOf(item) === -1
        })
        rowChoices.push(tempArr)
      })
  
      // 2. col choices
      let colChoices = []
      clueArr.map(element => {
        let tempArr = numArr.filter(item => {
          return element[1].indexOf(item) === -1
        })
        colChoices.push(tempArr)
      })
  
      // 3. reg choices
      let regChoices = []
      clueArr.map(element => {
        let tempArr = numArr.filter(item => {
          return element[2].indexOf(item) === -1
        })
        regChoices.push(tempArr)
      })
  
      // choicesArr: for each cell: [rowChoices, colChoices, regChoices]
  
      let choicesArr = []
      for (let i=0; i<coordArr.length; i++) {
        choicesArr.push([rowChoices[i], colChoices[i], regChoices[i]])
      }
      
      // now we have to filter these 3 choices arrays to have one final choices array with an array for each cell
      let finalChoices = []
      choicesArr.map(element => {
        let tempArr = []
        element[0].map(item => {
          let indexOne = element[1].indexOf(item)
          let indexTwo = element[2].indexOf(item)
          if (indexOne> -1 && indexTwo > -1) {
            tempArr.push(item)
          }
        })
        finalChoices.push(tempArr)
      })
  
      // The main Algorithm:
  
      let solved = false
      let i = 0
      let index = 0
      let n = 0
  
      while (i<finalChoices.length) {
  
        let value = finalChoices[i][index]
        let row = coordArr[i][0]
        let col = coordArr[i][1]
  
        let x = this.checkRowPlacement(puzzleString, row, col, value)
        let y = this.checkColPlacement(puzzleString, row, col, value)
        let z = this.checkRegionPlacement(puzzleString, row, col, value)
  
        if (x.validation === true && y.validation === true && z.validation === true) {
          puzzleArr.splice(indexArr[i], 1, value)
          puzzleString = puzzleArr.join("")
          index = 0
          i ++
  
          if (i === finalChoices.length) {
            solved = true
          }
  
        } else {
          index ++
  
          while (index >= finalChoices[i].length) {
  
            let lastValue = puzzleArr[indexArr[i-1]]
            let lastIndex = finalChoices[i-1].indexOf(lastValue)
            let newIndex = lastIndex + 1
            index = newIndex
            i --
            puzzleArr.splice(indexArr[i], 1, ".")
            puzzleString = puzzleArr.join("")
          }
        }
      }
      
      return {solution: puzzleString}
    }
  }
  
  module.exports = SudokuSolver;
  
  