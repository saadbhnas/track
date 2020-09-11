require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/AuthRoutes");
const trackRoutes = require("./Routes/TrackRoutes");
const requireAuth = require("./Middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://student:passwordpassword@cluster0.fv2oj.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(" connected to mongo instance ");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongos instance", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`your email is : ${req.user.email}`);
});

app.listen(3000, () => {
  console.log(" listening on port 3000 ");
});
