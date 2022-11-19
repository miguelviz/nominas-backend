const GetWorkers = require("./getWorkers");
const CreateWorker = require("./CreateWorker");
const AddPackages = require("./AddPackage");
const RestartPackages = require("./RestartPackages");

const Backend = {
    API:{
        POST:{
            GetWorkers,
            CreateWorker,
            AddPackages,
            RestartPackages
        }
    }
}
module.exports = Backend;