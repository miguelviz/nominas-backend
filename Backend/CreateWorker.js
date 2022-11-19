const MYSQL = require("../Mysql")

const CreateWorker = async({req,res})=>{
    let post = req.body;
    let conn = await MYSQL.createConexion().catch(e=>{
        res.json({
            error:"Error al conectar a la base de datos"
        })
    })
    if(conn){
        let {names,first_sname,second_sname,userType} = post;
        if(names&&first_sname&&second_sname&&userType){
            let sql_check = `SELECT * FROM users WHERE names='${names}' AND first_sname='${first_sname}' AND second_sname='${second_sname}'`
            let checkArray = await MYSQL.executeArrayQuery({conn,query:sql_check}).catch(e=>res.json({error:"Error al verificar si existe el usuario"}));
            if(checkArray.length===0){
                let query = `
                    INSERT INTO 
                    users(
                        names,first_sname,second_sname,user_type
                    )VALUES(
                        '${names}','${first_sname}','${second_sname}',${userType}
                    )
                `;
                let insertId = await MYSQL.executeInsertQuery({conn,query}).catch(e=>{
                    res.json({
                        error:"Error al crear el trabajador."
                    })
                })
                if(insertId){
                    res.json({
                        result:true
                    })
                }
            }else{
                res.json({
                    error:`Error el usuario ${names} ${first_sname} ${second_sname} ya existe`
                })
            }
        }else{
            res.json({
                error:"Argumentos de creación inválidos."
            })
        }
    }
}
module.exports = CreateWorker;