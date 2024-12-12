const express = require("express")
const router = express.Router()

const usersController = require('../controllers/users.controller')

router.get("/", usersController.getAll)
router.get("/id/:id", usersController.getById)
router.get("/email/:email", usersController.getByEmail)
router.post("/", usersController.create)
router.put("/password/:id", usersController.updatePasswordById)
router.put("/reset/:id", usersController.resetById)
router.put("/active/:id", usersController.activeById)
router.delete("/id/:id", usersController.deleteById)
router.delete("/email/:email", usersController.deleteByEmail)

module.exports = router