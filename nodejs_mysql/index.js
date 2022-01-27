const mysql = require('mysql2')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'library'
});


var insertBook = (sqlparam)=>{
    var sqlQuery = 'INSERT INTO BOOKS VALUES(?, ?)';
    connection.query(sqlQuery, sqlparam, (e, results, fields)=>{
        if(e){
            console.log(e);
        }
        console.log(results)
        // callback(results)
    });
}

var getBooks = (sqlparam)=>{
    var sqlQuery = 'SELECT * FROM BOOKS WHERE b_id = ?';
    connection.query(sqlQuery, sqlparam, (e, results, fields)=>{
        if(e){
            console.log(e);
        }
        console.log(results)
        // callback(results)
    });
}

var updateBook = (sqlparam)=>{
    var sqlQuery = 'UPDATE BOOKS SET b_name = ? where b_id = ?';
    connection.query(sqlQuery, sqlparam, (e, results, fields)=>{
        if(e){
            console.log(e);
        }
        console.log(results)
        // callback(results)
    });
}

var deleteBook = (sqlparam)=>{
    var sqlQuery = 'DELETE FROM BOOKS WHERE b_id = ?';
    connection.query(sqlQuery, sqlparam, (e, results, fields)=>{
        if(e){
            console.log(e);
        }
        console.log(results)
        // callback(results)
    });
}

// var sqlParam = [1, "Wings of Fire"]
// insertBook(sqlParam);

// var sqlParam = [1]; // b_id of the record we recently inserted
// getBooks(sqlParam);

// var sqlParam = ["My Experiment with Truth", 1]
// updateBook(sqlParam);

var sqlParam = [1] // b_id to uniquely identify the record 
deleteBook(sqlParam);