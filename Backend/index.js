const GetWorkers = require("./getWorkers");
const CreateWorker = require("./CreateWorker");
const Backend = {
    API:{
        POST:{
            GetWorkers,
            CreateWorker
        }
    }
}
module.exports = Backend;