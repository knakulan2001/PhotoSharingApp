var express = require('express')
var router = express.Router()
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn
const { getRecentPosts, getPostById, getCommentsByPostId } = require('../middleware/postsmiddleware')
var db = require('../config/database')

router.get('/', function(req, res, next) {
        res.render('index', {
            title: 'Photo Shack APP',
            javascript: true
        })
    })
    /* GET home page. */
router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Log In' })
})
router.get('/index', (req, res, next) => {
    res.render('index', { title: 'Home' })
})
router.get('/postimage', isLoggedIn, (req, res, next) => {
    res.render('postimage', { title: 'Post Image' })
})
router.get('/registration', (req, res, next) => {
    res.render('registration', { title: 'Register', javascript: true })
})
router.get('/viewpost', getRecentPosts, function(req, res, next) {
    res.render('viewpost', { title: 'View Photo Gallery' })
})

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
    res.render('imagepost', { title: `Post ${req.params.id}` })
})

module.exports = router