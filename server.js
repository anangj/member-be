const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

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
