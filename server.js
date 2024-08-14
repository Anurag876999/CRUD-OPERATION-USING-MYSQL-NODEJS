const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./Config/db');

var bodyParser = require("body-parser");
 //app.use(bodyParser.json());

//configure dotenv
dotenv.config();
//dotenv.config({'path:'})



// rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/student",require("./Routes/stdRoute"));
app.get('/test',(req,res)=>{
    res.status(200).send(`<h1>Nodejs Mysql App</h1>`);
});


//port
const port = process.env.port || 8000;


// contidionaly listen
mySqlPool
.query("SELECT 1")
.then(() => {
// MYSQL
    console.log("MySQL DB Connected".bgCyan.white);

//listen
app.listen(port, () =>{
    console.log(`Server Running on port ${process.env.port}`.bgMagenta.white);
});
})
.catch((error) => {
    console.log(error);
});
