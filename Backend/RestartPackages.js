const MYSQL = require("../Mysql")

const RestartPackages = async({req,res})=>{
    let conn = await MYSQL.createConexion().catch(e=>{
        res.json({
            error:"Error al conectar a la base de datos"
        })
    })
    if(conn){
        let sql_update = `UPDATE users SET month_packages = 0 WHERE month_packages > 0`;
        let updated = await MYSQL.executeUpdateQuery({conn,query:sql_update}).catch(e=>{
            res.json({
                error:"Error al reiniciar los paquetes."
            })
        })
        if(updated){
            res.json({
                result:true
            })
        }
    }
    conn.close();
}
module.exports = RestartPackages;