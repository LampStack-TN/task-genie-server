// importing db/prisma connection
const prisma = require("../database/prisma.js");

// importing Mock Data
const users = require("../data/users.json");
const tasks = require("../data/tasks.json");
const skills = require("../data/skills.json");
const profiles = require("../data/profiles.json");

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

  await prisma.skills
    .createMany({ data: skills, skipDuplicates: true })
    .then((response) => {
      console.log("skills seeded successfull ✅: ", response);
      console.log("******************************");
    });
  await prisma.profile
    .createMany({ data: profiles, skipDuplicates: true })
    .then((response) => {
      console.log("profiles seeded successfull ✅: ", response);
      console.log("******************************");
    });
})();
