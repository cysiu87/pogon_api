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
    getTeams: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from \"Teams\"")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },    
    createTeam: async(req, res) => {
        try {
            const teamName = req.body.teamName                 
            
            const sql3 ="INSERT INTO \"Teams\" (\"Name\") values ('"+teamName+"')  RETURNING *;"          
           
            const { rows } = await postgre.query(sql3)
           sqlRespond = rows[0]
           res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },   
    deleteTeamById: async(req, res) => {
        try {
            const id = req.body.id
            
            const sql = "DELETE FROM \"Teams\" where \"Id\"= "+id+" RETURNING *"
           
            const { rows } = await postgre.query(sql)

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "not found"})            

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    createResult: async(req, res) => {
        try {
            const team1 = req.body.team1
            const team2 = req.body.team2
            const result1 = req.body.result1                    
            const result2 = req.body.result2                    
            
            const sql3 ="INSERT INTO \"Results\" (\"Team1\",\"Team2\",\"Result1\",\"Result2\") values ('"+team1+"', '"+team2+"', "+result1+","+result2+")  RETURNING *;"          
           
            const { rows } = await postgre.query(sql3)
           sqlRespond = rows[0]
           res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },   
    updateById: async(req, res) => {
        try {            
            const id = req.body.id
            const team1 = req.body.team1
            const team2 = req.body.team2
            const result1 = req.body.result1                    
            const result2 = req.body.result2             

            var sql = "UPDATE \"Results\" SET \"Team1\" = '"+team1+"',\"Team2\"  = '"+team2+"',\"Result1\" ="+result1+",\"Result2\"="+result2+" WHERE \"Id\" = "+id+" RETURNING *;"
            
            const { rows } = await postgre.query(sql)

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    deleteById: async(req, res) => {
        try {
            const id = req.body.id
            
            const sql = "DELETE FROM \"Results\" where \"Id\"= "+id+" RETURNING *"
           
            const { rows } = await postgre.query(sql)

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "not found"})            

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
}

module.exports = resultsController