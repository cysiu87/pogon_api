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
            
            const sql3 ="CALL insert_user_if_not_exists($1, $2, $3);"
            

            const { rows } = await postgre.query(sql3, [login, email, password])
            console.log(rows[0])
            if(rows[0].pass == password)           
                res.json({msg: "OK", data: {status: "OK"}});
            else
            res.json({msg: "OK", data: "errorrr"});

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    updatePasswordByEmail: async(req, res) =>{
        try {                   
            const oldPassword = req.body.cur_password
            const password = req.body.new_password
            const confPassword = req.body.new_conf_password
            const email = req.body.email
            const sql = "SELECT * FROM users where \"email\" ='"+email+"';";
            const { rows } = await postgre.query(sql)
            
            const user = rows[0]
            const oldPass = user.pass;
            
            if(oldPassword == oldPass){
                if(password !== confPassword){
                    res.json({msg: "OK", data: "New password is not reaepeted well"})
                
                } else if (oldPass == password){

                    res.json({msg: "OK", data: "New Password need to be diferent than current one"})
                }
                
                else {
                    const sql2 = "UPDATE users set \"pass\" = '"+password+"', \"updateDate\" = CURRENT_TIMESTAMP where \"email\" = '"+email+"' RETURNING *;";
                    try {
                        const { rows } = await postgre.query(sql2);         
                        if(rows[0].pass == password)           
                            res.json({msg: "OK", data: {status: "OK"}});
                        else
                        res.json({msg: "OK", data: "errorrr"});
                        
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
        //console.log(req.body)
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