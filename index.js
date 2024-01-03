const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require("dotenv").config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("uploads"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const port =  process.env.PORT  || 4002  ;
const uri = process.env.ATLAS_URI;

app.listen(port, ()=>{
    console.log("Running on port " + port);

});
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log("DB Connected")
})

const userRoutes = require("./Routes/UserRoutes");
app.use("/user", userRoutes);

