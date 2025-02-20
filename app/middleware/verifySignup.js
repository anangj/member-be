const User = require('../models/User');

const ROLES = ["patient", "doctor", "superadmin", "staff", "vendor"];

checkDuplicateNameOrEmail = async (req, res, next) => {
    try {
      // Username
      const nameUser = await User.findOne({ name: req.body.name }).exec();
      if (nameUser) {
        return res.status(400).send({ message: "Failed! Username is already in use!" });
      }
  
      // Email
      const emailUser = await User.findOne({ email: req.body.email }).exec();
      if (emailUser) {
        return res.status(400).send({ message: "Failed! Email is already in use!" });
      }
  
      // Additional check by phone number (assuming 'phoneNumber' is a field in the user model)
      // Uncomment and modify the code below if phone number check is required
      /*
      const phoneNumberUser = await User.findOne({ phoneNumber: req.body.phoneNumber }).exec();
      if (phoneNumberUser) {
        return res.status(400).send({ message: "Failed! Phone number is already in use!" });
      }
      */
  
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  };
  
checkRolesExisted = (req, res, next) => {
    // console.log(req.body.roles)
  if (req.body.roles) {
    // for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles)) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles} does not exist!`,
        });
        return;
      }
    // }
  }
  next();
};

const verifySignUp = {
    checkDuplicateNameOrEmail,
  checkRolesExisted,
};
module.exports = verifySignUp;