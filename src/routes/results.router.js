const express = require("express")
const router = express.Router()

const resultControler = require('../controllers/results.controller')

router.get("/result/:id", resultControler.getResults)
router.post("/result", resultControler.createResult)
router.put("/result", resultControler.updateById)
router.delete("/result", resultControler.deleteById)
router.get("/teams/:id", resultControler.getTeams)
router.post("/teams", resultControler.createTeam)
router.delete("/teams", resultControler.deleteTeamById)
router.get("/games", resultControler.getGames)
router.get("/game/:id", resultControler.getGame)
router.put("/game", resultControler.setGame)
router.post("/game", resultControler.addGame)

module.exports = router