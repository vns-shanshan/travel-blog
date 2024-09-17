const express = require('express');
const router = express.Router();

const User = require('../models/user');

// ------------- Endpoints -------------
router.get('/', async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('posts/index.ejs', { posts: currentUser.posts });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

router.get("/new", function (req, res) {
    res.render('posts/new.ejs');
});

router.post('/', async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.posts.push(req.body);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/posts`);
    } catch (error) {
        console.log(error);
        res.render('posts/new.ejs', { errorMessage: "Please try again later." });
    };
});

router.get('/:postId', async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const postDoc = currentUser.posts.id(req.params.postId);

        res.render('posts/show.ejs', { post: postDoc });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

router.delete('/:postId', async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const postDoc = currentUser.posts.id(req.params.postId).deleteOne();
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/posts`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

router.get('/:postId/edit', async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const postDoc = currentUser.posts.id(req.params.postId);

        res.render('posts/edit.ejs', { post: postDoc });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

router.put('/:postId', async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const postDoc = currentUser.posts.id(req.params.postId);
        postDoc.set(req.body);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/posts/${postDoc._id}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});
// -------------------------------------

module.exports = router;
