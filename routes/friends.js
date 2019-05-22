const express = require('express');
const router = express.Router();
const database = require('../config/database/database');

router.get('/myfriends/:id', (req, res, next) => {
    const username = req.params.id;
    const id = username;
    const account_id = '1222';
    // this is just a simple example Sha, change the db connection in the config part
    database.query('SELECT * FROM friends WHERE id = ? AND account_id = ?', [id, account_id], (error, friends, fields) => {
        if (error) {
            console.error('An error occurred while executing the query')
            throw error
        }
        // console.log(business)

        return res.json({
            success: true,
            msg: username,
            business,
            // fields,
        });
    })

});


module.exports = router;