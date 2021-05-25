const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      
      let {puzzle,coordinate,value} = req.body
      let valid = true
      let conflict = []

      //check for valid coordinate to add:
      
      if(!coordinate || !value || !puzzle) {
        res.json({ "error": "Required field(s) missing" })
      } else {
        if (coordinate.length !== 2) {
          res.json({ "error": "Invalid coordinate" })

        } else {
          let coordinateArr = coordinate.split("")
          let regex = /[A-I]/
          let regexNum = /[1-9]/
          if (!regex.test(coordinateArr[0].toUpperCase())) {
            res.json({ "error": "Invalid coordinate" })
          } else {
            if (!regexNum.test(coordinateArr[1])) {
              res.json({ "error": "Invalid coordinate" })
            } else if (value.length !== 1 || !regexNum.test(value)){
              res.json({ "error": "Invalid value" })
            }else {
              let validChecker = solver.validate(puzzle)
              console.log(validChecker)
              if (validChecker !== true) {
                res.json(validChecker)
              } else {
                let x = solver.checkRowPlacement(puzzle, coordinateArr[0].toUpperCase(),coordinateArr[1], value)
                let y = solver.checkColPlacement(puzzle, coordinateArr[0].toUpperCase(),coordinateArr[1], value)
                let z = solver.checkRegionPlacement(puzzle, coordinateArr[0].toUpperCase(),coordinateArr[1], value)

                let obj = {valid: true}

                if (!x.validation || !y.validation || !z.validation) {
                  obj.valid = false
                  obj.conflict = []
                  if (!x.validation) {
                    obj.conflict.push("row")
                  }
                  if (!y.validation) {
                    obj.conflict.push("column")
                  }
                  if (!z.validation) {
                    obj.conflict.push("region")
                  }
                  res.json(obj)
                } else {
                  res.json(obj)
                }
              }
            }
          }
        }
      }

    });

    /////////////
    
  app.route('/api/solve')
    .post((req, res) => {
      
      let {puzzle} = req.body
      if (!puzzle) {
        res.json({error: "Required field missing"})
      } else {
        let validChecker = solver.validate(puzzle)
        if (validChecker !== true) {
          res.json(validChecker)
        } else {
          let result = solver.solve(puzzle)
          //console.log(result)
          
          res.json(result)
        }
      }
      console.log(JSON.stringify(res.json()))
    });
};
