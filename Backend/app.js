let express = require('express')
let app = express();
let mongoose = require('mongoose'); 
let cors = require('cors');

//middleware enable data from post method
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());            // enable cors policy for cross domin communication
