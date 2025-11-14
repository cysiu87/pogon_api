const postgre = require('../database')
const resultsController = {
    getResults: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from \"Results\"")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getResultsByTournament: async(req, res) => {
        try {
            const { rows } = await postgre.query('SELECT * FROM "Results" WHERE "TournamentId" = $1', [req.params.tournamentId])
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.message})
        }
    },    
    getTeams: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from \"Teams\"")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getTeamsByTournament: async(req, res) => {
        try {
            const { rows } = await postgre.query('SELECT * FROM "Teams" WHERE "TournamentId" = $1', [req.params.tournamentId])
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.message})
        }
    },    
    getGame: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from \"Games\"")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getGamesByTournament: async(req, res) => {
        try {
            const { rows } = await postgre.query('SELECT * FROM "Games" WHERE "TournamentId" = $1', [req.params.tournamentId])
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.message})
        }
    },  
    setGame: async(req, res) => {
        try {            
            const { gameName, gameDate, tournamentId, gameId } = req.body

            const sql = 'UPDATE "Games" SET "GameName" = $1, "GameDate" = $2, "TournamentId" = $3 WHERE "Id" = $4 RETURNING *'
            
            const { rows } = await postgre.query(sql, [gameName, gameDate, tournamentId, gameId])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }
            
            res.status(404).json({msg: "Game not found"})

        } catch (error) {
            res.json({msg: error.message})
        }
    },
    createGame: async(req, res) => {
        try {
            const { gameName, gameDate, tournamentId } = req.body
            
            const sql = 'INSERT INTO "Games" ("TournamentId", "GameName", "GameDate", "CreateDate") VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *'
            
            const { rows } = await postgre.query(sql, [tournamentId, gameName, gameDate])
            
            res.json({msg: "OK", data: rows[0]})
        } catch (error) {
            res.json({msg: error.message})
        }
    },   
    createTeam: async(req, res) => {
        try {
            const { teamName, tournamentId } = req.body
            
            const sql = 'INSERT INTO "Teams" ("TournamentId", "Name", "CreateDate") VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *'
           
            const { rows } = await postgre.query(sql, [tournamentId, teamName])
            
            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.message})
        }
    },   
    deleteTeamById: async(req, res) => {
        try {
            const id = req.params.id
            
            const sql = 'DELETE FROM "Teams" WHERE "Id" = $1 RETURNING *'
           
            const { rows } = await postgre.query(sql, [id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "Team not found"})            

        } catch (error) {
            res.json({msg: error.message})
        }
    },
    createResult: async(req, res) => {
        try {
            const { team1, team2, result1, result2, status, tournamentId } = req.body
            
            const sql = 'INSERT INTO "Results" ("TournamentId", "Team1", "Team2", "Result1", "Result2", "Status", "CreateDate") VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *'
           
            const { rows } = await postgre.query(sql, [tournamentId, team1, team2, result1 || 0, result2 || 0, status || 'pending'])
            
            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.message})
        }
    },   
    updateById: async(req, res) => {
        try {            
            const { id, team1, team2, result1, result2, status, tournamentId } = req.body

            const sql = 'UPDATE "Results" SET "TournamentId" = $1, "Team1" = $2, "Team2" = $3, "Result1" = $4, "Result2" = $5, "Status" = $6, "UpdateDate" = CURRENT_TIMESTAMP WHERE "Id" = $7 RETURNING *'
            
            const { rows } = await postgre.query(sql, [tournamentId, team1, team2, result1, result2, status, id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }
            
            res.status(404).json({msg: "Result not found"})

        } catch (error) {
            res.json({msg: error.message})
        }
    },
    deleteById: async(req, res) => {
        try {
            const id = req.params.id
            
            const sql = 'DELETE FROM "Results" WHERE "Id" = $1 RETURNING *'
           
            const { rows } = await postgre.query(sql, [id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "Result not found"})            

        } catch (error) {
            res.json({msg: error.message})
        }
    },
}

module.exports = resultsController