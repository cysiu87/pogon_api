const express = require("express")
const router = express.Router()

const resultControler = require('../controllers/results.controller')

// Results routes
router.get("/", resultControler.getResults)
router.get("/tournament/:tournamentId", resultControler.getResultsByTournament)
router.post("/", resultControler.createResult)
router.put("/", resultControler.updateById)
router.delete("/:id", resultControler.deleteById)

// Teams routes
router.get("/teams", resultControler.getTeams)
router.get("/teams/tournament/:tournamentId", resultControler.getTeamsByTournament)
router.post("/teams", resultControler.createTeam)
router.delete("/teams/:id", resultControler.deleteTeamById)

// Games routes
router.get("/game", resultControler.getGame)
router.get("/game/tournament/:tournamentId", resultControler.getGamesByTournament)
router.post("/game", resultControler.createGame)
router.put("/game", resultControler.setGame)

module.exports = router