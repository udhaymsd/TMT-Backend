const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongodb = require('mongodb');
const api = require('./routes/api');
const customer = require('./routes/customer');
const users = require('./routes/users');


const app = express();
// const dburl = process.env.DB_URL || "mongodb://localhost:27017";
const port = process.env.PORT || 4000;


//middle ware
app.use(cors());
app.use(bodyparser.json())

//api routes
app.use('/api', api)
app.use('/customer', customer)
app.use('/users', users)

app.get("/", (req, res) => {
    res.send("Ticket Management Tool Backend")
})

// function authVerify(req, res, next) {
//     if (req.headers.authorization !== undefined) {
//         let result = await jwt.verify(req.headers.authorization, 'secretkey');
//         next();
//     }
// }


app.listen(port, () => console.log("Server started at port 4000!!!"));