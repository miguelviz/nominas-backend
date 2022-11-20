const MYSQL = require("../Mysql")

const GetWorkers = async({req,res})=>{
    let conn = await MYSQL.createConexion().catch(e=>{
        res.json({
            error:"Error al conectar a la base de datos"
        })
    })
    if(conn){
        let query = `
            SELECT 
                a.names, a.id_user AS ID, a.work_number, a.first_sname, a.second_sname, a.month_packages, 
                b.name_user_type, b.hour_bonus
            FROM users a 
            LEFT JOIN user_types b ON a.user_type = b.id_type
            ORDER BY a.names ASC`;
        let list = await MYSQL.executeArrayQuery({conn,query}).catch(e=>{
            res.json({
                error:"Error al consultar los usuarios."
            })
        })
        if(list){
            list = getPayrollUsers({list});
            res.json({
                result:{
                    list
                }
            });
        }
    }
    conn.close();
}
const getPayrollUsers = ({list})=>{
    const ServerOptions = require("../Utils/ServerOptions");
    const {payroll} = ServerOptions;
    const {salary_worker,package_bonus,hours_worked_per_month,isr_porcent,isr_extra_porcent,max_salary_extra} = payroll;
    if(list.length>0){
        let newList = list.map(el=>el);
        newList.forEach(user => {
            let salary = Math.round((salary_worker*hours_worked_per_month)*100)/100;
            let user_hour_bonus = Math.round((user.hour_bonus*hours_worked_per_month)*100)/100;
            let user_package_bonus = Math.round((package_bonus*user.month_packages)*100)/100;
            let full_salary = Math.round((user_package_bonus + user_hour_bonus + salary)*100)/100;
            let porcent = isr_porcent;
            if(full_salary>=max_salary_extra){
                porcent += isr_extra_porcent;
            }
            let one_porcent = Math.round((full_salary/100)*100)/100;
            let isr_total = Math.round((porcent*one_porcent)*100)/100;
            user.salary = salary; 
            user.hours_worked_per_month = hours_worked_per_month;
            user.hour_bonus = user_hour_bonus;
            user.package_bonus = user_package_bonus;
            user.full_salary = full_salary;
            user.salary_total = full_salary - isr_total;
            user.isr_porcent = porcent;
            user.isr_total = isr_total;
        });
        return newList;
    }else{
        return [];
    }
}
module.exports = GetWorkers;