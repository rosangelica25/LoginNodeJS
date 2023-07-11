const mysql=require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection=mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Alexandria332601",
        database: "logindb"
    }
);

//conectando a la base de datos 
connection.connect(function(error)
    {
        if (error) throw error 
        else console.log("Conectado a la base de datos correctamente!")
    }
)

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

//despues de que el login funcione correctamente
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})

// set app port 
app.listen(4500);
