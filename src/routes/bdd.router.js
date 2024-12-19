const express = require("express")
const router = express.Router()

const usersController = require('../controllers/bdd.controller')

router.post("/createBDD", usersController.createBDD)
router.post("/createROBDD", usersController.createROBDD)
router.post("/save", usersController.saveLogicF)

module.exports = router