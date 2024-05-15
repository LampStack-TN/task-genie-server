const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { upload } = require("../helper/helperFunction.js");
const { profile } = require("../database/prisma");
// import User prisma Model
const User = require("../database/prisma").user;

//? Register Handler
const register = async (req, res) => {
  try {
    //make sure that i'm gonna send a file (done ✅)
    //req avatar from body
    const { avatar } = req.body;
    //
    const imageUrl = await upload(avatar);

    // deconstruct password for hashing
    const { password } = req.body;
    // copy req.body
    const data = { ...req.body };

    data.avatar = imageUrl;
    // hash password
    data.password = bcrypt.hashSync(password, 8);
    data.avatar = imageUrl;
    // execute query
    const response = await User.create({ data });

    // send success message
    res.send("User Registred Successfully");
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(400).send(error);
  }
};

//? Login Handler
const login = async (req, res) => {
  try {
    // cheking if the email and password are not a falsy value
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ error: "Email or Password not found." });
    }
    //cheking if the email exist in the database
    const user = await User.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }
    //cheking if the password is valid
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password is incorrect." });
    }
    // Generate a JSON Web Token (JWT) for authentication
    const acessToken = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.jwt_Secret,
      {
        expiresIn: "1d",
      }
    );
    //sending a succeeded response
    res.status(200).json({ acessToken, message: "Athentication Successful" });

    //sending a error response
  } catch (error) {
    console.log(error);
    res.status(500).send("Athentication Failed");
  }
};

//? Get Authenticated User
const getAuthUser = async (req, res) => {
  try {
    // deconstruct userId for Query
    const { userId } = req;
    // execute query
    const user = await User.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        password: false,
        role: true,
        phone: true,
        birthdate: true,
        city: true,
        address: true,
        zipcode: true,
        avatar: true,
        longitude: true,
        latitude: true,
        notifications: {
          include: {
            notifier: {
              select: {
                id: true,
                fullName: true,
                avatar: true,
              },
            },
          },
        },
        profile: true,
        _count: { select: { notifications: { where: { isRead: false } } } },
      },
    });

    // send success message
    res.send(user);
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(400).send("Error Verifying token.");
  }
};

//? Get Authenticated User
const setUserRole = async (req, res) => {
  try {
    // deconstruct userId for Query
    const { userId } = req;
    const { role } = req.body;
    // execute query
    const user = await User.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
      select: {
        id: false,
        fullName: true,
        email: true,
        password: false,
        role: true,
        phone: true,
        birthdate: true,
        city: true,
        address: true,
        zipcode: true,
        avatar: true,
        profile: true,
        longitude: true,
        latitude: true,
      },
    });

    res.status(201).send(user);
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(400).send("Error Updating Role!");
  }
};
// Update User Info
const updateUser = async (req, res) => {
  try {
    const { userId } = req;
    const { fullName, birthdate, phone, address, email } = req.body;
    let response = await User.update({
      where: {
        id: userId,
      },
      data: {
        fullName: fullName,
        birthdate: birthdate,
        phone: phone,
        address: address,
        email: email,
      },
    });
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};
//set user Password
const updateUserPassword = async (req, res) => {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    if (currentPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!passwordMatch) {
        return res.status(401).send("Incorrect password");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    }
    await User.update({
      where: {
        id: userId,
      },
      data: {
        password: user.password,
      },
    });
    res.status(201).send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  getAuthUser,
  setUserRole,
  updateUser,
  updateUserPassword,
};
