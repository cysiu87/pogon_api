const postgre = require('../database')
const results2Controller = {
    getResults: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from \"Results\"")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

module.exports = results2Controller