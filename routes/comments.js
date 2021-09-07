var express = require('express');
var router = express.Router();
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { create } = require('../models/Comments');

router.post('/create', (req, res, next) => {
    if (!req.session.username) {
        errorPrint('Oops! You must be logged in to create a comment.');
        res.json({
            code: -1,
            status: 'danger',
            message: 'Oops! You must be logged in to create a comment.'
        });
    } else {

        let { comment, postId } = req.body;
        let username = req.session.username
        let userId = req.session.userId

        create(userId, postId, comment)
            .then((wasSuccessful) => {
                if (wasSuccessful != -1) {
                    successPrint(`Congratulations ${username}! Your comment was successfully created.`);
                    res.json({
                        code: 1,
                        status: 'success',
                        message: 'Comment created.',
                        comment: comment,
                        username: username
                    })
                } else {
                    errorPrint('Comment not created');
                    res.json({
                        code: -1,
                        status: 'danger',
                        message: 'Comment not created.',
                    })
                }
            })
            .catch(err => next(err));
    }

})


module.exports = router;