const { user } = require("../database/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import User prisma Model
const User = require("../database/prisma").user;

//? Register Handler
const register = async (req, res) => {
  try {
    // deconstruct password for hashing
    const { password } = req.body;
    // copy req.body
    const data = { ...req.body };

    // hash password
    data.password = bcrypt.hashSync(password, 8);

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
    if (user.isactive == false) {
      return res.status(401).json({ error: "avtivate your account" });
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
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = { register, login };
