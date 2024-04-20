const prisma = require("../database/prisma.js");

const users = require("../data/users.json");
const tasks = require("../data/tasks.json");

(async () =>
  await prisma.user.createMany({ data: users, skipDuplicates: true }))();

(async () =>
  await prisma.task.createMany({ data: tasks, skipDuplicates: true }))();
