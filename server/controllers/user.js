const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');



exports.auth = function(req, res) {
    const { email, password} = req.body;

    if(!password || !email) {
      return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password'}]});
    }

    User.findOne({email}, function(err, user) {
      if(err) {
        return  res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)});
      }

      if(!user) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: "User doesn't exist"}]});
      }
      if(user.hasSamePassword(password)) {
        // return JWT token
       const token = jwt.sign({
        userId: user.id,
        username: user.username
        }, config.SECRET, {expiresIn: '1h'});

       return res.json(token) 

      }  else {
        return res.status(422).send({errors: [{title: 'Wrong Data!', detail: "Wrong email or password"}]});
      }
    })
}

exports.register = function(req, res) {
   const { username, email, password, passwordConfirmation } = req.body;

   if(!password || !email) {
     return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password'}]})
   }

   if(password !== passwordConfirmation ) {
     return res.status(422).send({errors: [{title: 'Invalid Password', detail: 'Password is not the same as confirmation'}]});
   }

   User.findOne({email: email}, function(err, existingUser) {
      if(err) {
       return  res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)});
      }

      if(existingUser) {
        return res.status(422).send({errors:[{title: 'Invalid Email', detail: 'User with this email already exists'}]});
      }

      const user = new User({
         username: username,
         email: email,
         password: password
      });

      user.save(function(err) {
        if(err) {
          return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)})
        }
        return res.json({"registered": true})
      })
   })
     
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  console.log(req);

  if(token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user) {
      if(err) {
        return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)})
      }

      if(user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    })

  } else {
    return notAuthorized(res);
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({errors:[{title: 'Not authorized', detail: 'You need to login to get access'}]});
}