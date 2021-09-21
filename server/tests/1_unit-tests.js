const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  suite("puzzle string tests in solver.validate()", () => {
    test("puzzle string of 81 characters", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."

      assert.equal(solver.validate(string),true)
      done()
    })

    test("puzzle string with invalid characters", (done)=> {
      let string = "..9..5.1.85.4./..2#32......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      
      assert.equal(solver.validate(string).error, "Invalid characters in puzzle")
      done()
    })
    test("puzzle string that is not 81 characters", (done) => {
      let string = "..9..5.1.85.4....2432.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      assert.equal(solver.validate(string).error, "Expected puzzle to be 81 characters long")
      done()
    })

  })

  suite("checkRowPlacement", () => {
    test("valid row placement", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      let row = "A"
      let col = "1"
      let value = "7"
      assert.equal(solver.checkRowPlacement(string, row, col, value).validation, true)
      done()
    })
    test("invalid row placement", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      let row = "A"
      let col = "1"
      let value = "9"
      assert.equal(solver.checkRowPlacement(string, row, col, value).validation, false)
      done()
    })
  })

  suite("checkColPlacement", () => {
    test("valid col placement", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      let row = "A"
      let col = "1"
      let value = "7"
      assert.equal(solver.checkColPlacement(string, row, col, value).validation, true)
      done()
    })
    test("invalid col placement", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      let row = "A"
      let col = "1"
      let value = "5"
      assert.equal(solver.checkColPlacement(string, row, col, value).validation, false)
      done()
    })
  })

  suite("checkRregionPlacement", () => {
    test("valid region placement", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      let row = "A"
      let col = "1"
      let value = "7"
      assert.equal(solver.checkRegionPlacement(string, row, col, value).validation, true)
      done()
    })
    test("invalid region placement", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      let row = "A"
      let col = "1"
      let value = "3"
      assert.equal(solver.checkRegionPlacement(string, row, col, value).validation, false)
      done()
    })
  })

  suite("solver tests", () => {
    test("Valid puzzle strings pass the solver", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      assert.typeOf(solver.solve(string).solution, "string")
      done()
    })

    test("Invalid puzzle strings fail the solver", (done) => {
      let string = "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      assert.equal(solver.solve(string).error, "Puzzle cannot be solved")
      done()
    })

    test("Solver returns the the expected solution", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      let solution = "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
      assert.equal(solver.solve(string).solution, solution)

      done()
    })
  })

});
