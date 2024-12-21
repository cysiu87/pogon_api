const postgre = require('../database')
const scriptsController = {
    getAll: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from scripts")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getAllCat: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from scriptsCat")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getById: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from scripts where \"scriptId\" = $1", [req.params.id])

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
            console.log(req.body.sql)       

            let sql = req.body.sql
            let upSql = sql.replace(/'/g, "''");
            upSql = upSql.replace(/"/g, '""');
            const userId = req.body.userId
            console.log(upSql)                       
            const sql3 ="INSERT INTO \"scripts\" (\"userId\", \"script\", \"createDate\") values ('"+userId+"','"+upSql+"', CURRENT_TIMESTAMP) RETURNING *;"
            

            const { rows } = await postgre.query(sql3)

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    createCat: async(req, res) => {
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
    updateById: async(req, res) =>{
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
    updateCatById: async(req, res) =>{
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
    deleteCatById: async(req, res) => {
        try {
            const sql = 'DELETE FROM scriptsCat where id = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "not found"})
            

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
    }    
}

module.exports = scriptsController