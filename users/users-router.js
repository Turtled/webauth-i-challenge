const bcrypt = require('bcryptjs'); // npm i bcryptjs
const router = require('express').Router();
const usersHelper = require('../users/users-model');
const validation = require("../auth/auth-router");

router.post('/register', (req, res) => {
  let credentials = req.body;

  bcrypt.hash(credentials.password, 12, (err, hashedPassword) => {
    credentials.password = hashedPassword;

    usersHelper.add(credentials)
      .then(creds => {
        res.status(201).json(creds);
      })
      .catch(error => {
        res.status(500).json({message: "Error while saving credentials to DB"});
      });
  });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    usersHelper.findBy(username)
      .then(user => {
        //console.log("correct hash? ", bcrypt.compareSync(password, user.password));
        console.log("user? ", user);
        if (user && bcrypt.compareSync(password, user.password)) {
            console.log("bcrypt");
          req.session.user = user;
  
          res.status(200).json({
            message: `You are now logged in, ${user.username}!`
          });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      })
      .catch(error => {
        res.status(500).json({message: "Error finding user with that username"});
      });
});

router.get('/', validation, (req, res) => {

    usersHelper.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json({message: "Error getting users"}));

});

module.exports = router;