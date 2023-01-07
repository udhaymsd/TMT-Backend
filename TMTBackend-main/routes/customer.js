const mongodb = require('mongodb');
const client = mongodb.MongoClient;

const dburl = process.env.DB_URL || "mongodb://localhost:27017";

const express = require('express');
let router = express.Router();

// customer api
let tickets = router.route('/tickets');
let modifyTicket = router.route('/tickets/:id');

tickets.get(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true })
        let db = connection.db('freshdesk');
        let data = await db.collection('customerTickets').find().toArray();
        if (data) {
            res.json({
                data,
                status: 200,
                message: "Fetched data from DB"
            })
        } else {
            res.json({
                status: 401,
                message: "Some Issue while fetching the tickets data!!"
            })
        }
        connection.close();
    } catch (error) {
        console.log("Customer Tickets Error :", error)
    }
})

tickets.post(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true })
        let db = connection.db('freshdesk');
        let data = await db.collection('customerTickets').insertOne(req.body);
        if (data) {
            res.json({
                status: 200,
                message: "added to customer tickets"
            })
        } else {
            res.json({
                status: 401,
                message: "Some Issue while inserting the data!!"
            })
        }
        connection.close();
    } catch (error) {
        console.log("Customer Tickets Error :", error)
    }
})


modifyTicket.delete(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true });
        let db = connection.db('freshdesk');
        let data = await db.collection('customerTickets').deleteOne({ "_id": mongodb.ObjectID(req.params.id) })
            // console.log("data:::", data);
        if (data) {
            res.json({
                status: 200,
                message: "Deleted Successfully"
            })
        } else {
            res.json({
                status: 401,
                message: "Deletion Failed!"
            })
        }
    } catch (error) {
        console.log("Deletion ticket error :", error)
    }
})

modifyTicket.put(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true });
        let db = connection.db('freshdesk');
        let data = await db.collection('customerTickets').updateOne({ "_id": mongodb.ObjectID(req.params.id) }, { $set: req.body });
        if (data) {
            res.json({
                status: 200,
                message: "Updated Successfully"
            })
        } else {
            res.json({
                status: 401,
                message: "Updation Failed!"
            })
        }
    } catch (error) {
        console.log("Ticket Updation error :", error)
    }
})


module.exports = router;