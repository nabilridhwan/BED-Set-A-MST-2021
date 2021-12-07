// Name: Nabil Ridhwanshah Bin Rosli
// Class: DIT/FT/1B/05
// Admin Number: P2007421

var mysql=require('mysql');

var dbConnect={

    getConnection:function(){
        var conn=mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"root",
            database:"sp_air"

        }

        );

        return conn;

    },
}
module.exports=dbConnect;