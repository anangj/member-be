const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//model
const Role = require("./app/models/Role");

//routes
const userRoutes = require("./app/routes/user.routes");
const roleRoutes = require("./app/routes/role.routes");
const memberRoutes = require("./app/routes/member.routes");
const benefitRoutes = require("./app/routes/benefit.routes");
const communityRoutes = require("./app/routes/community.routes");
const adminLogRoutes = require("./app/routes/adminLog.routes");
const notificationRoutes = require("./app/routes/notification.routes");
const paymentRoutes = require("./app/routes/payment.routes");
const adminRoutes = require("./app/routes/admin.routes");

const app = express();

dotenv.config();

var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Handle CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Application is running" });
});

// api route
app.use("/api/v1/", [
  userRoutes,
  // roleRoutes,
  // memberRoutes,
  // benefitRoutes,
  // communityRoutes,
  // adminLogRoutes,
  // notificationRoutes,
  // paymentRoutes,
  // adminRoutes,
]);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      try {
        await new Role({ name: "patient" }).save();
        console.log("added 'patient' to roles collection");
      } catch (err) {
        console.log("error", err);
      }
      try {
        await new Role({ name: "staff" }).save();
        console.log("added 'staff' to roles collection");
      } catch (err) {
        console.log("error", err);
      }
      try {
        await new Role({ name: "doctor" }).save();
        console.log("added 'doctor' to roles collection");
      } catch (err) {
        console.log("error", err);
      }
      try {
        await new Role({ name: "superadmin" }).save();
        console.log("added 'superadmin' to roles collection");
      } catch (error) {}
      try {
        await new Role({ name: "vendor" }).save();
        console.log("added 'vendor' to roles collection");
      } catch (err) {
        console.log("error", err);
      }
    }
  } catch (err) {
    console.log("error", err);
  }
}
