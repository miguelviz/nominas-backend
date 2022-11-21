const DefaultConn = require("../Mysql/DefaultConn");
const ServerOptions = {
    production:false,
    selectedDatabase:DefaultConn.database,
    payroll:{
        salary_worker:30,
        package_bonus:5,
        hours_worked_per_month:192,
        isr_porcent:9,
        isr_extra_porcent:3,
        max_salary_extra:10000
    }
}
module.exports = ServerOptions;