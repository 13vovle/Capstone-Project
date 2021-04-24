let express = require('express')
let app = express();
let mongoose = require('mongoose'); 
let cors = require('cors');
let bodyParser = require("body-parser");

//Database URL Details 
let url = "mongodb://localhost:27017/StoreDB";

//middleware enable data from post method
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());            // enable cors policy for cross domin communication

//Database connection without warning 
const mongooseDbOption ={       // to avoid warning 
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,mongooseDbOption);   //ready to connect

//Connect the data 
mongoose.connection

//link to router module like a import concept. 
var User = require("./router/general_router.js");

app.use("/user", User);

app.listen(9090, () => console.log("Listening on port 9090..."))