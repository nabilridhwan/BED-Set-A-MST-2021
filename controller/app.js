// Name: Nabil Ridhwanshah Bin Rosli
// Class: DIT/FT/1B/05
// Admin Number: P2007421


var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

const Airport = require("../model/airport")
const Flight = require("../model/flight")

app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);


app.get("/airport/:country", (req, res) => {
    Airport.getAirportByCountry({
        ...req.params
    }, (err, results) => {
        if (err) {
            const obj = {
                "Message": "Some error occurred"
            }
            res.status(500).json(obj)
            return;
        }

        res.status(200).json(results)
        return;
    })

})

app.put("/flight/:flightid", (req, res) => {
    Flight.updateSeatPriceByFlightId({
        ...req.params,
        ...req.body
    }, (err, results) => {
        if (err) {
            const obj = {
                "Message": "Update Unsuccessful!"
            }
            res.status(500).json(obj)
            return;
        }

        if (results.affectedRows == 0) {
            const obj = {
                "message": "No such flight exists"
            }
            res.status(200).json(obj)
            return;
        } else {
            const obj = {
                "message": "Success"
            }
            res.status(200).json(obj)
            return;
        }
    })
})

app.post("/flight", (req, res) => {
    Flight.insertNewFlight({...req.body}, (err, results) => {
        if (err) {
            const obj = {
                "Message": "Insertion Failed"
            }
            res.status(500).json(obj)
            return;
        }

        const {insertId: flightid, insertionDate} = results;
        res.status(201).json([{flightid, insertionDate}])
        return;
    })
})

app.get("/top3CheapestFlights/:fromAirportId/:toAirportId", (req, res) => {
    Flight.getTop3CheapestFlights({...req.params}, (err, results) => {
        if (err) {
            const obj = {
                "Message": "Some error occurred"
            }
            res.status(500).json(obj)
            return;
        }

        let obj = {
            flights: results,

            "cheapest fare": results[0].price
        }

        res.status(200).json(obj)
        return;
    })
})



module.exports = app;