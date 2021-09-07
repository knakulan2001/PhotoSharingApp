// const express = require('express');
// var router = express.Router();
// const db = require('../conf/database');

//  router.get('/getAllUsers', (req, res, next) => {
//          db.query('SELECT * from users;', (err, results, fields) => {
//          console.log(results);
//          res.send(results);
//      })
//  });


// router.get('/getAllPostsP', (req, res, next) => {
//     db.query('SELECT * from posts;')
//     .then(([results, fields]) => {
//         console.log(results);
//         res.send(results);
//     })
//     .catch((err) => {
//         next(err);
//     })
// });

// router.post('/createUser', (req, res, next) => {
//     console.log(req.body);
//     let username = req.body.username;
//     let email = req.body.email;
//     let password = req.body.password;

//     let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
//     db.query(baseSQL, [username, email, password]).
//     then(([results, fields]) => {
//         if(results && results.affectedRows) {
//             res.send('user was made');
//         }
//         else {
//             res.send('user was not made');
//         }
//     })
//     .catch((err) => {
//         console.log("error: user already exists")
//         res.send("error: user already exists")
//         // next(err);
//     })
// });

// module.exports = router;