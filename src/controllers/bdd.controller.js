const postgre = require('../database')
const bddController = {   
    createBDD: async(req, res) => {
        try {
            const login = req.body.login
            const email = req.body.email
            const password = req.body.password
            var id = 0;
            console.log(req.body)            
            
            const sql3 ="CALL insert_user_if_not_exists($1, $2, $3, $4);"
            

            const { rows } = await postgre.query(sql3, [login, email, password, id])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    createROBDD: async(req, res) => {
        try {
            const login = req.body.login
            const email = req.body.email
            const password = req.body.password
            var id = 0;
            console.log(req.body)            
            
            const sql3 ="CALL insert_user_if_not_exists($1, $2, $3, $4);"
            

            const { rows } = await postgre.query(sql3, [login, email, password, id])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    saveLogicF: async(req, res) => {
        try {
            const login = req.body.login
            const email = req.body.email
            const password = req.body.password
            var id = 0;
            console.log(req.body)            
            
            const sql3 ="CALL insert_user_if_not_exists($1, $2, $3, $4);"
            

            const { rows } = await postgre.query(sql3, [login, email, password, id])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    }

}

module.exports = bddController