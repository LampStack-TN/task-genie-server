const express = require("express");
const prisma = require("./database/prisma");

const app = express();

prisma.user.create({
  data: {
    name: "John Doe",
    email: "jondoe@gmail.com",
    password: "123456",
    phone: "123456",
  },
});

app.listen(3000, () => {
  console.log("express is working");
});
