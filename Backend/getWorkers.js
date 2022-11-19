const MYSQL = require("../Mysql")

const GetWorkers = async({req,res})=>{
    let conn = await MYSQL.createConexion().catch(e=>{
        res.json({
            error:"Error al conectar a la base de datos"
        })
    })
    if(conn){
        let query = `SELECT names, first_sname, second_sname FROM users`;
        let list = await MYSQL.executeArrayQuery({conn,query}).catch(e=>{
            res.json({
                error:"Error al consultar los usuarios."
            })
        })
        if(list){
            res.json({
                result:{
                    list
                }
            });
        }
    }
}
module.exports = GetWorkers;