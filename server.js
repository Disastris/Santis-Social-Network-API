const express = require("express");
const db = require("./config/connection");
const { User } = require("./models");
// const routes = require("./routes");

// const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// // Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes("01-Activities")
//   ? cwd.split("01-Activities")[1]
//   : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

app.get("/api/users", async (req, res) => {
  const users = await User.find({});

  res.json(users);
});
app.post("/api/users", async (req, res) => {
  // req is from insomnia
  // res is out back to insomnia
  //console.log(req);
  const result = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  res.json(result);
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
  });
});
