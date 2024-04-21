// importing db/prisma connection
const prisma = require("../database/prisma.js");

prisma.user.deleteMany({}).then((response) => {
  console.log("Users truncated successfull ✅: ", response);
  console.log("******************************");
});

prisma.task.deleteMany({}).then((response) => {
  console.log("Tasks truncated successfull ✅: ", response);
  console.log("******************************");
});
