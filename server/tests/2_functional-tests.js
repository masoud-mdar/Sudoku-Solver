const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite("Solve a puzzle, POST to /api/solve", () => {
    test("valid puzzle string", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      let solution = "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
      chai
      .request(server)
      .post("/api/solve")
      .send({"puzzle": string})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, `{"solution":"${solution}"}`)
        done()
      })
    })
    test("missing puzzle string", (done) => {
      let string = ""
      chai
      .request(server)
      .post("/api/solve")
      .send({"puzzle": string})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Required field missing"}')
        done()
      })
    })
    test("puzzle with invalid characters", (done) => {
      let string = "..9..#.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/solve")
      .send({"puzzle": string})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Invalid characters in puzzle"}')
        done()
      })
    })
    test("puzzle with incorrect length", (done) => {
      let string = "..9...1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/solve")
      .send({"puzzle": string})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}')
        done()
      })
    })
    test("puzzle that cannot be solved", (done) => {
      let string = "999....1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/solve")
      .send({"puzzle": string})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Puzzle cannot be solved"}')
        done()

      })
    })
  })

  suite("Check a puzzle placement POST to /api/check", () => {
    test("puzzle placement with all fields", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "A1", "value": "7"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"valid":true}')
        done()

      })
    })
    test(" puzzle placement with single placement conflict", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "A2", "value": "1"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"valid":false,"conflict":["row"]}')
        done()

      })
    })
    test("puzzle placement with multiple placement conflicts", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "A1", "value": "1"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"valid":false,"conflict":["row","column"]}')
        done()

      })
    })
    test("puzzle placement with all placement conflicts", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "A2", "value": "5"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"valid":false,"conflict":["row","column","region"]}')
        done()

      })
    })
      test("puzzle placement with missing required fields", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "A2"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Required field(s) missing"}')
        done()

      })
    })
      test("puzzle placement with invalid characters", (done) => {
      let string = "..9#.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "A2", "value": "6"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Invalid characters in puzzle"}')
        done()

      })
    })
      test("puzzle placement with incorrect length", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945......"
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "A2", "value": "6"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}')
        done()

      })
    })
      test("puzzle placement with invalid placement coordinate", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "AWESOME", "value": "6"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Invalid coordinate"}')
        done()

      })
    })
      test("puzzle placement with invalid placement value", (done) => {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      chai
      .request(server)
      .post("/api/check")
      .send({"puzzle": string, "coordinate": "A2", "value": "42"})
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"error":"Invalid value"}')
        done()

      })
    })
  })

});

