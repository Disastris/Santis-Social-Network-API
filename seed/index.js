const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany({});

  await User.create({
    username: "jd",
    email: "jd@gmail.com",
    password: "123",
  });

  console.log("Seeded!");
  process.exit();
});
