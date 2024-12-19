const express = require("express")
const router = express.Router()

const scriptsController = require('../controllers/scripts.controller')

router.get("/", scriptsController.getAll)
router.get("/cat/", scriptsController.getAllCat)
router.get("/id/:id", scriptsController.getById)
router.post("/", scriptsController.create)
router.post("/cat/", scriptsController.createCat)
router.put("/update/:id", scriptsController.updateById)
router.put("/update/cat/:id", scriptsController.updateCatById)
router.delete("/id/:id", scriptsController.deleteById)
router.delete("/id/cat/:id", scriptsController.deleteCatById)

module.exports = router