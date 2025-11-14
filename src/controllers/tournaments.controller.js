const postgre = require('../database')

const tournamentsController = {
    // Get all tournaments
    getAll: async(req, res) => {
        try {
            const { rows } = await postgre.query('SELECT * FROM "Tournaments" ORDER BY "CreateDate" DESC')
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.message})
        }
    },

    // Get tournament by ID
    getById: async(req, res) => {
        try {
            const { rows } = await postgre.query('SELECT * FROM "Tournaments" WHERE "Id" = $1', [req.params.id])
            
            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }
            
            res.status(404).json({msg: "Tournament not found"})
        } catch (error) {
            res.json({msg: error.message})
        }
    },

    // Get tournaments by user
    getByUserId: async(req, res) => {
        try {
            const { rows } = await postgre.query('SELECT * FROM "Tournaments" WHERE "CreatedBy" = $1 ORDER BY "CreateDate" DESC', [req.params.userId])
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.message})
        }
    },

    // Get active tournaments
    getActive: async(req, res) => {
        try {
            const { rows } = await postgre.query('SELECT * FROM "Tournaments" WHERE "Status" = \'active\' ORDER BY "StartDate" DESC')
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.message})
        }
    },

    // Create tournament
    create: async(req, res) => {
        try {
            const { name, description, startDate, endDate, status, createdBy } = req.body
            
            const sql = `INSERT INTO "Tournaments" ("Name", "Description", "StartDate", "EndDate", "Status", "CreatedBy", "CreateDate", "UpdateDate") 
                         VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
                         RETURNING *`
            
            const { rows } = await postgre.query(sql, [
                name, 
                description || null, 
                startDate || null, 
                endDate || null, 
                status || 'active', 
                createdBy || null
            ])
            
            res.json({msg: "OK", data: rows[0]})
        } catch (error) {
            res.json({msg: error.message})
        }
    },

    // Update tournament
    updateById: async(req, res) => {
        try {
            const { name, description, startDate, endDate, status } = req.body
            const id = req.params.id
            
            const sql = `UPDATE "Tournaments" 
                         SET "Name" = $1, "Description" = $2, "StartDate" = $3, "EndDate" = $4, "Status" = $5, "UpdateDate" = CURRENT_TIMESTAMP 
                         WHERE "Id" = $6 
                         RETURNING *`
            
            const { rows } = await postgre.query(sql, [
                name, 
                description || null, 
                startDate || null, 
                endDate || null, 
                status || 'active', 
                id
            ])
            
            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }
            
            res.status(404).json({msg: "Tournament not found"})
        } catch (error) {
            res.json({msg: error.message})
        }
    },

    // Delete tournament
    deleteById: async(req, res) => {
        try {
            const sql = 'DELETE FROM "Tournaments" WHERE "Id" = $1 RETURNING *'
            const { rows } = await postgre.query(sql, [req.params.id])
            
            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }
            
            return res.status(404).json({msg: "Tournament not found"})
        } catch (error) {
            res.json({msg: error.message})
        }
    },

    // Get tournament statistics (teams, games, results count)
    getStatistics: async(req, res) => {
        try {
            const tournamentId = req.params.id
            
            const teamCountQuery = await postgre.query('SELECT COUNT(*) as count FROM "Teams" WHERE "TournamentId" = $1', [tournamentId])
            const gameCountQuery = await postgre.query('SELECT COUNT(*) as count FROM "Games" WHERE "TournamentId" = $1', [tournamentId])
            const resultCountQuery = await postgre.query('SELECT COUNT(*) as count FROM "Results" WHERE "TournamentId" = $1', [tournamentId])
            
            const statistics = {
                tournamentId: tournamentId,
                teamsCount: parseInt(teamCountQuery.rows[0].count),
                gamesCount: parseInt(gameCountQuery.rows[0].count),
                resultsCount: parseInt(resultCountQuery.rows[0].count)
            }
            
            res.json({msg: "OK", data: statistics})
        } catch (error) {
            res.json({msg: error.message})
        }
    }
}

module.exports = tournamentsController
