const mongodb = require('mongodb');
const client = mongodb.MongoClient;

const dburl = process.env.DB_URL || "mongodb://localhost:27017";

const express = require('express');
let router = express.Router();

// customer api
let users = router.route('/');

users.get(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true })
        let db = connection.db('freshdesk');
        let data = await db.collection('users').find().toArray();
        if (data) {
            res.json({
                data,
                status: 200,
                message: "Fetched users' data from DB"
            })
        } else {
            res.json({
                status: 401,
                message: "Some Issue while fetching the users' data!!"
            })
        }
        connection.close();
    } catch (error) {
        console.log("Error while fetching Users' Data :", error)
    }
})


module.exports = router;