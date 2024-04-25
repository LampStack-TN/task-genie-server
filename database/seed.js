// importing db/prisma connection
const prisma = require("../database/prisma.js");

// importing Mock Data
const users = require("../data/users.json");
const tasks = require("../data/tasks.json");
const skills = require("../data/skills.json");
(async () => {
  await prisma.user
    .createMany({ data: users, skipDuplicates: true })
    .then((response) => {
      console.log("Users seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.task
    .createMany({ data: tasks, skipDuplicates: true })
    .then((response) => {
      console.log("Tasks seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.skill
    .createMany({ data: skills, skipDuplicates: true })
    .then((response) => {
      console.log("skills seeded successfull ✅: ", response);
      console.log("******************************");
    });
})();
