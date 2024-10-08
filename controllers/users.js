const express = require('express');
const router = express.Router();

const User = require('../models/user');

// ------------- Endpoints -------------
router.get('/', async function (req, res) {
    try {
        const allUsers = await User.find({});
        res.render('users/index.ejs', { users: allUsers });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

router.get('/:userId', async function (req, res) {
    try {
        const currentUser = req.session.user;

        const author = await User.findOne({ _id: req.params.userId });
        const postsInAuthor = author.posts;
        res.render('users/show.ejs', { user: currentUser, posts: postsInAuthor, author: author.username });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});
// -------------------------------------

module.exports = router;