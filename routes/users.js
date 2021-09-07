// Backend Code for user registration: allows for user registration, login, and logout
var express = require('express')
var router = express.Router()
const UserModel = require('../models/users')
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters')
const { check, validationResult } = require('express-validator')
const UserError = require('../helpers/error/UserError')
const { usernameExists } = require('../models/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post(
  '/registration',
  [
    check('username').custom(async username => {
      const usernameRegex = new RegExp('^[a-zA-z]')
      if (!usernameRegex.test(username)) {
        throw new Error('must begin with alpha')
      }
    }),
    check('username').isLength({ min: 3 }),
    check('email').isEmail(),
    check('password').custom(async password => {
      const passRegex = new RegExp('^(?=.[A-Z])(?=.[0-9])(?=.[/-+!@#$^&()])')
      if (!passRegex.test(password)) {
        throw new Error('weak password')
      }
    }),
    check('confirmPw').custom(async (confirmPw, { req }) => {
      const password = req.body.password

      if (password != confirmPw) {
        throw new Error('Passwords must be the same')
      }
    })
  ],
  (req, res, next) => {
    console.log(req.body)
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let confirmPw = req.body.confirmPw

    UserModel.usernameExists(username)
      .then(userNameDoesExist => {
        if (userNameDoesExist) {
          throw new UserError(
            'Registration Failed: Username already exists',
            '/registration',
            200
          )
        } else {
          return UserModel.emailExists(email)
        }
      })
      .then(emailDoesExist => {
        if (emailDoesExist) {
          throw new UserError(
            'Registration Failed: Email already exists.',
            '/registration',
            200
          )
        } else {
          return UserModel.create(username, password, email)
        }
      })
      .then(createdUserId => {
        if (createdUserId < 0) {
          throw new UserError(
            'Server Error, user could not be created.',
            '/registration',
            500
          )
        } else {
          successPrint(`User.js --> User ${username} was created!`)
          req.flash('success', 'User account has been made!')
          res.redirect('/login')
        }
      })
      .catch(err => {
        errorPrint('user could not be made', err)

        if (err instanceof UserError) {
          errorPrint(err.getMessage())
          req.flash('error', err.getMessage())
          res.status(err.getStatus())
          res.redirect(err.getRedirectURL())
        } else {
          next(err)
        }
      })
    /*
              db.execute("SELECT * FROM users WHERE username=?", [username]).then(([results, fields]) => {

                if(results && results.length == 0) {
                  return db.execute("SELECT * FROM users WHERE email=?", [email]);
                }
                else {
                  throw new UserError(
                    "Registration Failed: Username already exists",
                    "/registration",
                    200
                  );     
                }
              })
              .then(([results, fields]) => {

                if(results && results.length == 0) {
                  return bcrypt.hash(password, 15);
                }
                else {
                  throw new UserError(
                    "Registration Failed: Email already exists.",
                    "/registration",
                    200
                  );     
                }
              }).then((hashedPassword) => {

                let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());"
                return db.execute(baseSQL, [username ,email, hashedPassword]);

                // if(results && results.length == 0) {
                  
                // }
                // else {
                //   throw new UserError(
                //     "Registration Failed: Email already exists.",
                //     "/registration",
                //     200
                //   );     
                // }
              }).then(([results, fields]) => {
              
                if(results && results.affectedRows) {
                  successPrint(`User.js --> User ${username} was created!`);
                  res.flash('success', 'User account has been made!');
                  res.redirect('/login');
                }
                else {
                  throw new UserError(
                    "Server Error, user could not be created.",
                    "/registration",
                    500
                  );
                }
              }).catch((err) => {

                  errorPrint("user could not be made", err);

                  if (err instanceof UserError) {
                    errorPrint(err.getMessage());
                    req.flash('error', err.getMessage());
                    res.status(err.getStatus());
                    res.redirect(err.getRedirectURL());
                  }
                  else {
                    next(err);
                  }
                });
                */
  }
)

router.post('/login', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password

  UserModel.authenticate(username, password)
    .then(loggedUserId => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in!`)
        req.session.username = username
        req.session.userId = loggedUserId
        res.locals.logged = true
        req.flash('success', 'You have been successfully logged in!')
        res.redirect('/')
      } else {
        req.flash('error', 'You have entered an invalid username/password. Please try again!')
        res.redirect('/login')
      }
    })
    .catch(err => {
      errorPrint('You have entered an invalid password. Please try again!')
      if (err instanceof UserError) {
        errorPrint(err.getMessage())
        req.flash('error', err.getMessage())
        res.status(err.getStatus())
        res.redirect('/login')
      } else {
        req.flash('error', 'You have entered an invalid username/password. Please try again!')
        res.redirect('/login')
      }
    })
})

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      errorPrint('session could not be destroyed.')
      next(err)
    } else {
      successPrint('Session was destroyed.')
      res.clearCookie('csid')
      res.json({ status: 'OK', message: 'User is logged out.' })
    }
  })
})

module.exports = router
