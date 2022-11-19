const DefaultConn = require("../Mysql/DefaultConn");
const ServerOptions = {
    production:false,
    selectedDatabase:DefaultConn.database
}
module.exports = ServerOptions;