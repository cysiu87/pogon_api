const postgre = require('../database')
const usersController = {
    getAll: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from users")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getById: async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const { rows } = await postgre.query("select * from users where id = $1", [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            res.status(404).json({msg: "not found"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getByEmail: async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const { rows } = await postgre.query("select * from users where email = $1", [req.params.email])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            res.status(404).json({msg: "not found"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    create: async(req, res) => {
        try {
            const login = req.body.login
            const email = req.body.email
            const password = req.body.password
            var id = 0;
            console.log(req.body)            
            const sql = "DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM users WHERE email = $2) THEN INSERT INTO users (login, email, pass) VALUES($1, $2, $3)RETURNING *; ELSE RAISE NOTICE 'duplicate'; END IF; END $$;"
            const sql2 = "INSERT INTO users (login, email, pass) SELECT $1, $2, $3 FROM users WHERE NOT EXISTS (SELECT 1  FROM users WHERE email = $2) RETURNING *;"
            const sql3 ="CALL insert_user_if_not_exists($1, $2, $3, $4);"
            

            const { rows } = await postgre.query(sql3, [login, email, password, id])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    updatePasswordById: async(req, res) =>{
        try {       
            const password = req.body.password
            const oldPassword = req.body.old_password
            const sql = "SELECT * FROM users where id =$1;";
            const { rows } = await postgre.query(sql, [req.params.id])
            const user = rows[0]
            const oldPass = user.pass;
            if(oldPassword == oldPass){
                if(oldPass == password){
                    res.json({msg: "OK", data: "New Password need to be diferent than current one"})
                } else {
                    const sql2 = "UPDATE users set pass = $1 where id = $2 RETURNING *;";
                    try {
                        const { rows } = await postgre.query(sql2, [password, req.params.id]);                    
                        res.json({msg: "OK", data: rows[0]});
                    } catch (error) {
                        res.json({msg: "OK", data: error.msg});
                    }                    
                }
            } else {
                res.json({msg: "OK", data: "Wrong current Password"})
            }      

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    resetById: async(req, res) => {
        try {            
            const reset = req.body.reset
            var sql = "";
            if(reset)
            {
                sql = "UPDATE users set reset = 1 where id = $1 RETURNING *"
                 
            } else {
                sql = "UPDATE users set reset = 0 where id = $1 RETURNING *"
            }
            const { rows } = await postgre.query(sql, [req.params.id])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    activeById: async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {            
            const active = req.body.active
            var sql = "";
            if(active)
            {
                sql = "UPDATE users set active = 1 where id = $1 RETURNING *"
                 
            } else {
                sql = "UPDATE users set active = 0 where id = $1 RETURNING *"
            }
            const { rows } = await postgre.query(sql, [req.params.id])            

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    deleteById: async(req, res) => {
        try {
            const sql = 'DELETE FROM users where id = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "not found"})
            

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    deleteByEmail: async(req, res) => {
        try {
            const sql = 'DELETE FROM users where email = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.email])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "not found"})
            

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    login: async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH,OPTIONS");
        res.header("Access-Control-Allow-Headers", "X-Custom-Header")
        console.log(req.body)
        try{
            // const sql = "SELECT * FROM users where \"email\" = 1$ and \"pass\" = $2;";
            const sql = "select 'OK' as \"status\", \"login\" as \"login\" from users where email = '"+req.body.email+"' and pass = '"+req.body.password+"'"
            const { rows } = await postgre.query(sql)

            if (rows[0].status == "OK") {
                return res.json({msg: "OK", data: rows[0]})
            } 

            return res.status(404).json({msg: "not found"})
        } catch (error){
            res.json({msg: error.msg})
        }
        
    }
}

module.exports = usersController