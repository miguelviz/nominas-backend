const MYSQL = require("../Mysql")

const AddPackages = async({req,res})=>{
    let post = req.body;
    let conn = await MYSQL.createConexion().catch(e=>{
        res.json({
            error:"Error al conectar a la base de datos"
        })
    })
    if(conn){
        let {userID,packages} = post;
        if(userID&&packages){
            let query_check_packages = `SELECT month_packages FROM users WHERE id_user = ${userID}`;
            let arrayCheck = await MYSQL.executeArrayQuery({conn,query:query_check_packages}).catch(e=>{
                res.json({
                    error:"Error al consultar la información del empleado."
                })
            })
            if(arrayCheck&&arrayCheck.length>0){
                let newPackages = ((arrayCheck[0].month_packages)||0) + parseInt(packages);
                let query_update = `UPDATE users SET month_packages = ${newPackages} WHERE id_user = ${userID}`;
                let updated = await MYSQL.executeUpdateQuery({conn,query:query_update}).catch(e=>{
                    res.json({
                        error:`Error, no se pudo actualizar '${newPackages}' al empleado '${userID}'`
                    })
                })
                if(updated){
                    res.json({
                        result:true
                    })
                }
            }else{
                res.json({
                    error:`Empleado no identificado: '${userID}'`
                })
            }
        }else{
            res.json({
                error:"Argumentos de creación inválidos."
            })
        }
    }
    conn.close();
}
module.exports = AddPackages;