const port = process.env.PORT || 8081;
//Librerias
const express = require("express");
const bodyParser = require('body-parser');
//Express CONFIG
const app = express();
app.use(express.static(__dirname + "/build/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//GET PRINCIPAL
app.get(/.*/,function(req,res){
    res.sendFile(__dirname+"/build/index.html");
});
const Backend = require("./Backend");
//API PRINCIPAL
app.post("/getWorkers",(req, res)=>{
    Backend.API.POST.GetWorkers({req,res});
})
app.post("/createWorker",(req, res)=>{
    Backend.API.POST.CreateWorker({req,res});
})
app.post("/addPackages",(req, res)=>{
    Backend.API.POST.AddPackages({req,res});
})
app.post("/restartPackages",(req, res)=>{
    Backend.API.POST.RestartPackages({req,res});
})
//APP LISTEN
app.listen(port,()=>{
    const ServerOptions = require("./Utils/ServerOptions");
    console.log(`<< Rinku Server >> (( Starting )) [[ In Port ${port} ]]`, ServerOptions);
});