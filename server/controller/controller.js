var userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    req.session.userLoginErr = "email or password required";
    res.redirect("/UserSign");
  } else {
    console.log(req.body);
    userdb
      .findOne({ email: req.body.email })
      .then((data) => {
        console.log(data);
        if (data) {
          req.session.userLoginErr = "the email id is exist";
          res.redirect("/UserSign");
        } else {
          const user = new userdb({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          user
            .save(user)
            .then((result) => {
              console.log("success");
              res.redirect("/");
            })
            .catch((err) => {
              res.status(500).status({ message: err.message });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//login user
exports.find = (req, res) => {
  userdb
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.redirect("/userLogin");
      } else {
        if (user.password == req.body.password) {
          console.log(user);
          req.session.userLogginIN = true;
          res.redirect("/");
        } else {
          req.session.userLoginErr = "invalid email or password";
          res.redirect("/userLogin");
        }
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
    });
};

/* -------------------------------------------------------------------------- */
/*                              end  user side  route                         */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             start to admin side route                      */
/* -------------------------------------------------------------------------- */

// create admin section
const email = "ckmhdroshan@gmail.com";
const password = 12345;
exports.adminLogin = (req, res) => {
  if (!req.body) {
    res.status(404).send({ message: "no admin is found" });
  } else if (email == req.body.email && password == req.body.password) {
    req.session.adminLogeIn = true;
    res.redirect("/adminHome");
  } else {
    req.session.adminErr = "invalid email or password";
    res.redirect("/adminLogin");
  }
};

exports.adminAddUser = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: "content not empty" });
    return
  } else {
    userdb
      .findOne({ email: req.body.email })
      .then((data) => {
        if (data) {
          res.status(400).sent({ message: "user already exist" });
        } else {
          const user = new userdb({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          user
            .save(user)
            .then((value) => {
              res.redirect("/adminHome");
            })
            .catch((err) => {
              res.status(500).send({ message: err.message });
            });
        }
      })
      .catch((err) => {});
  }
};

// update the user details in admin
exports.updateUser = (req, res) => {
  console.log(req.body);
  let id=req.params.id
  userdb.findByIdAndUpdate(id,req.body).then((result)=>{
    res.status(200).json({url:"http://localhost:3000/adminHome"})
  }).catch((err)=>{
    console.log(err);
  })
};
