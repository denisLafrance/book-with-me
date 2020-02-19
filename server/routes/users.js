const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/user')

router.post('/auth', userController.auth);
router.post('/register', userController.register);

router.get('', function(req, res) {
    
    
    User.find({}, function(err, User) {
        res.json(User)
    })
})

router.get('/:id', function(req, res) {
    const emailId = req.params.id;
    
    User.findById(emailId, function(err, user) {
        if(err) {
            console.log(emailId);
            res.status(422).send({errors: [{title: 'User Error', detail: 'Could not find user'}]})
        } else {
            res.json(user)
        }
    })
})

module.exports = router;