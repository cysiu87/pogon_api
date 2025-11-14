const express = require('express')
const router = express.Router()
const tournamentsController = require('../controllers/tournaments.controller')

// Get all tournaments
router.get('/', tournamentsController.getAll)

// Get active tournaments only
router.get('/active', tournamentsController.getActive)

// Get tournament by ID
router.get('/:id', tournamentsController.getById)

// Get tournament statistics
router.get('/:id/statistics', tournamentsController.getStatistics)

// Get tournaments by user ID
router.get('/user/:userId', tournamentsController.getByUserId)

// Create tournament
router.post('/', tournamentsController.create)

// Update tournament
router.put('/:id', tournamentsController.updateById)

// Delete tournament
router.delete('/:id', tournamentsController.deleteById)

module.exports = router
