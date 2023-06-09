var jwt = require('jsonwebtoken');
var signup = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const usersController = {};

usersController.signup = async (req, res) => {
    try {
        let emailExist = await signup.findOne({ email: req.body.email })
        if (emailExist != null) {
            res.status(202).send("Email Already Exist")
        }
        else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    var obj1 = { name: req.body.name, email: req.body.email, password: hash }
                    let signupResult = signup.create(obj1)
                    if (signupResult) {
                        res.status(200).send("signup successful")
                    }
                    else {
                        res.status(402).send("signup unsuccessful")
                    }
                });
            })
        }
    } catch (ex) {
        res.status(402).send("Something went wrong")
    }
}

usersController.createAdminUser = async () => {
  try {
    const data = {
      email:"admin@admin.com",
      name:"admin",
      is_admin:true,
      password:"123456",
    }
    let emailExist = await signup.findOne({ email: data.email })
    if (emailExist != null) {
        return "Email Already Exist"
    } 
      bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(data.password, salt, function (err, hash) {
              var obj1 = { name: data.name, email: data.email, password: hash,is_admin: data.is_admin }
              let signupResult = signup.create(obj1)
              if (signupResult) {
                  return "signup successful"
              }
              else {
                return "signup unsuccessful"
              }
          });
        })
  } catch (ex) {
    return "Something went wrong"
  }
}
usersController.login = async (req, res) => {
    try {
      let emailExist = await signup.findOne({ email: req.body.email });
  
      if (emailExist === null) {
        res.status(202).send("Email does not exist");
      } else {
        bcrypt.compare(req.body.password, emailExist.password, async function (err, password_response) {
          if (password_response === true) {
            const payload = {
              id:emailExist._id,
              name: emailExist.name,
              email: emailExist.email,
              is_admin: emailExist.is_admin,
            };
            const token = await new Promise((resolve, reject) => {
              jwt.sign(payload, 'superSecret', function (err, token) {
                if (err) {
                  reject(err);
                } else {
                  resolve(token);
                }
              });
            });
            const updateResult = await signup.updateOne({ email: req.body.email }, { $set: { token: token } });
            let afterUpdate = await signup.findOne({ email: req.body.email });
            if (updateResult.modifiedCount) {
              res.status(200).send({message:"Login successful", data:afterUpdate});
            } else {
              res.status(500).send("Failed to update token");
            }
          } else {
            res.status(205).send("Incorrect password");
          }
        });
      }
    } catch (ex) {
      console.log(ex);
      res.status(500).send("Something went wrong");
    }
  };

module.exports = usersController;