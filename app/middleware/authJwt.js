const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const dotenv = require("dotenv");

const { TokenExpiredError } = jwt;
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isPatient = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const roles = await Role.find({
      _id: { $in: user.roles },
    }).exec();

    const isPatient = roles.some((role) => role.name === "patient");

    if (isPatient) {
      next();
    } else {
      res.status(403).send({ message: "Require Patient Role!" });
    }
  } catch (err) {
    console.error(err);
    catchError(err, res);
  }
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const roles = await Role.find({
      _id: { $in: user.roles },
    }).exec();

    const isAdmin = roles.some((role) => role.name === "staff");

    if (isAdmin) {
      next();
    } else {
      res.status(403).send({ message: "Require Staff Role!" });
    }
  } catch (err) {
    console.error(err);
    catchError(err, res);
  }
};

isSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const roles = await Role.find({
      _id: { $in: user.roles },
    }).exec();

    const isSuperAdmin = roles.some((role) => role.name === "superadmin");

    if (isSuperAdmin) {
      next();
    } else {
      res.status(403).send({ message: "Require Super Admin Role!" });
    }
  } catch (err) {
    console.error(err);
    catchError(err, res);
  }
};

isDoctor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const roles = await Role.find({
      _id: { $in: user.roles },
    }).exec();

    const isDoctor = roles.some((role) => role.name === "doctor");

    if (isDoctor) {
      next();
    } else {
      res.status(403).send({ message: "Require Doctor Role!" });
    }
  } catch (err) {
    console.error(err);
    catchError(err, res);
  }
};

isVendor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const roles = await Role.find({
      _id: { $in: user.roles },
    }).exec();

    const isVendor = roles.some((role) => role.name === "vendor");

    if (isVendor) {
      next();
    } else {
      res.status(403).send({ message: "Require Vendor Role!" });
    }
  } catch (err) {
    console.error(err);
    catchError(err, res);
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isSuperAdmin,
  isDoctor,
  isPatient,
  isVendor,
};

module.exports = authJwt;
