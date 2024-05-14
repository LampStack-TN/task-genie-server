// importing db/prisma connection
const prisma = require("../database/prisma.js");

// importing Mock Data
const users = require("../data/users.json");
const tasks = require("../data/tasks.json");
const skills = require("../data/skills.json");
const profiles = require("../data/profiles.json");
const services = require("../data/services.json");
const applications = require("../data/applications.json");
const conversations = require("../data/chat/conversations.json");
const participants = require("../data/chat/participants.json");
const messages = require("../data/chat/messages.json");
const notifications = require("../data/notifications.json");

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
      console.log("Skills seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.profile
    .createMany({ data: profiles, skipDuplicates: true })
    .then((response) => {
      console.log("Profiles seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.application
    .createMany({ data: applications, skipDuplicates: true })
    .then((response) => {
      console.log("Applications seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.service
    .createMany({ data: services, skipDuplicates: true })
    .then((response) => {
      console.log("services seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.conversation
    .createMany({ data: conversations, skipDuplicates: true })
    .then((response) => {
      console.log("conversations seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.participant
    .createMany({ data: participants, skipDuplicates: true })
    .then((response) => {
      console.log("participants seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.message
    .createMany({ data: messages, skipDuplicates: true })
    .then((response) => {
      console.log("messages seeded successfull ✅: ", response);
      console.log("******************************");
    });

  await prisma.notification
    .createMany({ data: notifications, skipDuplicates: true })
    .then((response) => {
      console.log("messages seeded successfull ✅: ", response);
      console.log("******************************");
    });
})();
