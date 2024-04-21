// importing db/prisma connection
const prisma = require("../database/prisma.js");

// importing Mock Data
const users = require("../data/users.json");
const tasks = require("../data/tasks.json");

prisma.user
  .createMany({ data: users, skipDuplicates: true })
  .then((response) => {
    console.log("Users seeded successfull ✅: ", response);
    console.log("******************************");
  });

prisma.task
  .createMany({ data: tasks, skipDuplicates: true })
  .then((response) => {
    console.log("Tasks seeded successfull ✅: ", response);
    console.log("******************************");
  });
