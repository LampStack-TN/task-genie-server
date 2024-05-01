// importing db/prisma connection
const prisma = require("../database/prisma.js");

(async () => {
  await prisma.message.deleteMany({}).then((response) => {
    console.log("Messages truncated successfull ✅: ", response);
    console.log("******************************");
  });

  await prisma.participant.deleteMany({}).then((response) => {
    console.log("Participant truncated successfull ✅: ", response);
    console.log("******************************");
  });

  await prisma.conversation.deleteMany({}).then((response) => {
    console.log("Conversation truncated successfull ✅: ", response);
    console.log("******************************");
  });

  await prisma.skill.deleteMany({}).then((response) => {
    console.log("Skills truncated successfull ✅: ", response);
    console.log("******************************");
  });

  await prisma.profile.deleteMany({}).then((response) => {
    console.log("Profiles truncated successfull ✅: ", response);
    console.log("******************************");
  });

  await prisma.application.deleteMany({}).then((response) => {
    console.log("Apps truncated successfull ✅: ", response);
    console.log("******************************");
  });

  await prisma.task.deleteMany({}).then((response) => {
    console.log("Tasks truncated successfull ✅: ", response);
    console.log("******************************");
  });

  await prisma.service.deleteMany({}).then((response) => {
    console.log("Services truncated successfull ✅: ", response);
    console.log("******************************");
  });

  await prisma.user.deleteMany({}).then((response) => {
    console.log("Users truncated successfull ✅: ", response);
    console.log("******************************");
  });
})();
