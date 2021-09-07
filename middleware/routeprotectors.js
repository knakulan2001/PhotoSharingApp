const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const routeProtectors = {};

routeProtectors.userIsLoggedIn = ((req, res, next) => {
    if (req.session.username) {
        successPrint('User is now successfully logged in!');
        next();
    } else {
        errorPrint('User is not yet logged in!');
        req.flash('error', 'You must be logged in!');
        res.redirect('/login');
    }
})

module.exports = routeProtectors;