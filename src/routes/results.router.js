const express = require("express")
const router = express.Router()

const resultControler = require('../controllers/results.controller')

router.get("/", resultControler.getResults)
router.post("/", resultControler.createResult)
router.put("/", resultControler.updateById)
router.delete("/", resultControler.deleteById)
router.get("/teams", resultControler.getTeams)
router.post("/teams", resultControler.createTeam)
router.delete("/teams", resultControler.deleteTeamById)
router.get("/game", resultControler.getGame)
router.put("/game", resultControler.setGame)

module.exports = router