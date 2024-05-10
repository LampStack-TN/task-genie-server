const {User,Task} = require("../database/prisma.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {upload} = require("../helper/helperFunction.js")
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const admin = await User.findUnique({
      where: {
        email: email,
      },
    });

    if (!admin) {
      return res.status(410).json({ error: "Email doesn't exist" });
    }

    const likePassword = await bcrypt.compare(password, admin.password);
    if (!likePassword) {
      return res.status(411).json({ error: "Invalid password" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Invalid user role" });
    }
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(201)
      .json({ message: "Logged in successfully as an admin", token: token });
  } catch (error) {
    console.error("Error in signin function:", error);
    res.status(500).send(error);
  }
};

const getAllClients = async (req, res) => {
  try {
    const result = await User.findMany({
      where: {
        role: "client",
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getAllProfessionals = async (req, res) => {
  try {
    const result = await User.findMany({
      where: {
        role: "professional",
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};



const countProfessionals = async (req, res) => {
  try {
    const result = await User.count({
      where: {
        role: "professional",
      },
    });
    res.status(200).json({ professionalCount: result });
  } catch (error) {
    console.error(error);
  }
};

const countClients = async (req, res) => {
  try {
    const result = await User.count({
      where: {
        role: "client",
      },
    });
    res.status(200).json({ clientCount: result });
  } catch (error) {
    console.error(error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findMany({
      include: {
        client: {
          select: {
            fullName: true,
          },
        },
        applications: true,
        favouriteTasks: true,
      },
    });
    const formatedTasks = tasks.map((task) => ({
      ...task,
      clientName: task.client ? task.client.fullName : null,
      applicantCount: task.applications.length,
      favouriteCount: task.favouriteTasks.length,
    }));
    res.status(200).json(formatedTasks);
  } catch (error) {
    console.log(error);
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await User.findFirst({
      where: {
        role: "admin",
      },
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    return res.status(200).json(admin);
  } catch (error) {
    console.error("getAdmin failds:", error);
    res.status(500).send(error);
  }
};

const updateUserPasswordAndEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword, newEmail } = req.body;

    const user = await User.findUnique({
      where: {
        id: parseInt(id),
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

    if (newEmail) {
     
      user.email = newEmail;
    }

    await User.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: user.password,
        email: user.email,
      },
    });

    res.status(201).send("Password and email updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

 

const updateAdminAvatar = async (req, res) => {
  try {
    const { id } = req.params;

   
    const {avatar} = req.body
console.log(avatar)

    // Perform the upload process
    const avatarUrl = await upload(avatar);

 const data = {...req.body}
 data.avatar = avatarUrl
    // Update user with the new avatar URL
    await User.update({
      where: {
        id: parseInt(id),
      },
      
      data
     
     
    });

    res.status(201).send("Avatar updated successfully");
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).send(error.message || "Internal server error");
  }
};







module.exports = {
  signin,
  getAllClients,
  getAllProfessionals,
  countProfessionals,
  countClients,
  getAllTasks,
  getAdmin,
  updateUserPasswordAndEmail,
  updateAdminAvatar
};
