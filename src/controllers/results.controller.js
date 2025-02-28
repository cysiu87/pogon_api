const postgre = require('../database')
const resultsController = {
    getResults: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from \"Results\" where \"GameID\" = "+req.params.id+"")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },    
    getTeams: async(req, res) => {
        console.log(req.params.id)
        try {
            const { rows } = await postgre.query("select * from \"Teams\" where \"GameID\" = "+req.params.id+"")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },    
    getGames: async(req, res) => {
        console.log("aa")
        try {
            const { rows } = await postgre.query("select * from \"Games\";")
            console.log(rows)
            res.json({msg: "OK", data: rows})
            
        } catch (error) {
            res.json({msg: error.msg})
        }
    },  
    getGame: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from \"Games\" where \"Id\" = $1", [req.params.id])
            console.log(rows)
            res.json({msg: "OK", data: rows})
            
        } catch (error) {
            res.json({msg: error.msg})
        }
    },  
    


    setGame: async(req, res) => {
        try {            
            
            const gameName = req.body.gameName
            const gameDate = req.body.gameDate          
            const gameId = req.body.gameId       

            var sql = "UPDATE \"Games\" SET \"GameName\" = '"+gameName+"',\"GameDate\"  = '"+gameDate+"' WHERE \"Id\" = '"+gameId+"' RETURNING *;"
            
            const { rows } = await postgre.query(sql)

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },   
    addGame: async(req, res) => {
        try {            
            
            const gameName = req.body.gameName
            const gameDate = req.body.gameDate          
            const gameId = req.body.gameId       

            var sql = "INSERT INTO \"Games\" SET \"GameName\" = '"+gameName+"',\"GameDate\"  = '"+gameDate+"' RETURNING *;"
            
            const { rows } = await postgre.query(sql)

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },   
    createTeam: async(req, res) => {
        try {
            const teamName = req.body.teamName                 
            const gameId = req.body.gameId                
            
            const sql3 ="INSERT INTO \"Teams\" (\"Name\",\"GameID\") values ('"+teamName+"','"+gameId+"')  RETURNING *;"          
           
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
            const gameId = req.body.gameId                
            const order = req.body.order                
            
            const sql3 ="INSERT INTO \"Results\" (\"Team1\",\"Team2\",\"GameID\",\"Order\") values ('"+team1+"', '"+team2+"', '"+gameId+"' , '"+order+"')  RETURNING *;"          
           
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
            const status = req.body.status         
            const order = req.body.order         

            var sql = "UPDATE \"Results\" SET \"Team1\" = '"+team1+"',\"Team2\"  = '"+team2+"',\"Result1\" ="+result1+",\"Result2\"="+result2+", \"Status\" = "+status+", \"Order\" = "+order+" WHERE \"Id\" = "+id+" RETURNING *;"
            
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