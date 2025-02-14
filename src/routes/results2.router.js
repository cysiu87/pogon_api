const express = require("express")
const router = express.Router()

const result2Controler = require('../controllers/results2.controller')

router.get("/reults2", result2Controler.getResults)

module.exports = router