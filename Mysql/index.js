const mysql = require("mysql2/promise");
const DefaultConn = require("./DefaultConn");
const MYSQL = {
    createConexion:()=>{
        return new Promise((resolve,reject)=>{
            (async()=>{
                let conn = await mysql.createConnection(DefaultConn).catch((e) => {
                    reject({
                        error: "Error al conectar a la base de datos."
                    })
                });
                resolve(conn);
            })()
        })
    },
    executeArrayQuery:({conn,query})=>{
        return new Promise((resolve,reject)=>{
            (async()=>{
                if(conn&&query){
                    let [result] = await conn.query(query).catch(e=>{
                        console.log("Error al ejecutar la consulta",query);
                        reject({
                            error:"Query Error.",
                            query
                        })
                    })
                    if(result){
                        resolve(result);
                    }
                }else{
                    reject({
                        error:"You need define 'conn' AND 'query' Arg."
                    })
                }
            })()
        })
    },
    executeInsertQuery:({conn,query})=>{
        return new Promise((resolve,reject)=>{
            (async()=>{
                if(conn&&query){
                    let [result] = await conn.query(query).catch(e=>{
                        console.log("Error al ejecutar el insert",query);
                        reject({
                            error:"Query Error."
                        })
                    })
                    if(result){
                        if(result.insertId){
                            resolve(result.insertId);
                        }else{
                            //console.log("dont use for normal querys.")
                            resolve(true);
                        }
                    }
                }else{
                    reject({
                        error:"You need define 'conn' AND 'query' Arg."
                    })
                }
            })()
        })
    },
    executeUpdateQuery:({conn,query})=>{
        return new Promise((resolve,reject)=>{
            (async()=>{
                if(conn&&query){
                    let [result] = await conn.query(query).catch(e=>{
                        console.log("Error al ejecutar el update",query);
                        reject({
                            error:"Query Error."
                        })
                    })
                    if(result){
                        if(result.affectedRows > 0){
                            resolve(true);
                        }else{
                            console.log("becareful db do not updated or query not is for update.")
                            resolve(true);
                        }
                    }
                }else{
                    reject({
                        error:"You need define 'conn' AND 'query' Arg.",
                        conn,
                        query
                    })
                }
            })()
        })
    }
}
module.exports = MYSQL;