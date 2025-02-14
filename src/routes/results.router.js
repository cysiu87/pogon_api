const express = require("express")
const router = express.Router()

const resultControler = require('../controllers/results.controller')

router.get("/", resultControler.getResults)
router.post("/", resultControler.createResult)
router.put("/", resultControler.updateById)
router.delete("/", resultControler.deleteById)

module.exports = router