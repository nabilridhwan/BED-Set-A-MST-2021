// Name: Nabil Ridhwanshah Bin Rosli
// Class: DIT/FT/1B/05
// Admin Number: P2007421

var db = require('./databaseConfig');

module.exports = {
    updateSeatPriceByFlightId: ({
        flightid,
        price
    }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect((err) => {
            if (err) {
                return callback(err, null);
            }

            const sqlQuery = "UPDATE flight SET price = ? WHERE flightid = ?";

            dbConn.query(sqlQuery, [price, flightid], (err, results) => {

                dbConn.end();

                if (err) {
                    return callback(err, null);
                }

                return callback(null, results);
            })
        })
    },

    insertNewFlight: ({
        flightCode,
        departAirportId,
        arrivalAirportId,
        departTime,
        duration,
        price
    }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect((err) => {
            if (err) {
                return callback(err, null);
            }

            const sqlQuery = "INSERT INTO flight(flightCode, departAirportId, arrivalAirportId, departTime, duration, price) VALUES(?,?,?,?,?,?);";

            dbConn.query(sqlQuery, [flightCode, departAirportId, arrivalAirportId, departTime, duration, price], (err, insertResults) => {


                if (err) {
                    return callback(err, null);
                }

                const {
                    insertId
                } = insertResults;

                const sqlQuery = "SELECT insertionDate FROM flight WHERE flightid = ?"
                dbConn.query(sqlQuery, [insertId], (err, selectResults) => {

                    insertResults.insertionDate = selectResults[0].insertionDate;
                    dbConn.end();

                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, {
                        ...insertResults,
                    });
                })

            })
        })
    },

    getTop3CheapestFlights: ({
        fromAirportId,
        toAirportId
    }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect((err) => {
            if (err) {
                return callback(err, null);
            }

            const sqlQuery = "SELECT flightcode, a1.name as departAirport, a2.name as arrivalAirport, price FROM airport a1, airport a2, flight f WHERE f.departAirportId = a1.id AND f.arrivalAirportId = a2.id AND f.departAirportId = ? AND f.arrivalAirportId = ? ORDER BY f.price ASC LIMIT 3;";

            dbConn.query(sqlQuery, [fromAirportId, toAirportId], (err, results) => {

                dbConn.end();

                if (err) {
                    return callback(err, null);
                }

                return callback(null, results);
            })
        })
    }
}