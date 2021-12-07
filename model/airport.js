// Name: Nabil Ridhwanshah Bin Rosli
// Class: DIT/FT/1B/05
// Admin Number: P2007421


const db = require('./databaseConfig')

module.exports = {
    getAirportByCountry: ({
        country
    }, callback) => {
        const dbConn = db.getConnection();
        dbConn.connect((err) => {
            if (err) {
                return callback(err, null);
            }

            const sqlQuery = "SELECT name,country,city,description FROM airport WHERE country = ?";

            dbConn.query(sqlQuery, [country], (err, results) => {

                dbConn.end();

                if (err) {
                    return callback(err, null);
                }

                return callback(null, results);
            })
        })
    },
}