const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./users-model');
const restricted = require('../Auth/restricted');

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  
  Users.findBy(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res
          .status(200)
          .json({ message: `Welcome ${user.username}! eat this token`, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.get('/users', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.send(err));
});


function generateToken(user){
    const payload = {
        subject: user.user_id,
        username: user.username
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, secret, options)
};

module.exports = router;