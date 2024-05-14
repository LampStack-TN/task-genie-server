const { User, Task, service, user } = require("../database/prisma.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { upload } = require("../helper/helperFunction.js");
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
    const result = await user.findMany({
      where: {
        role: 'professional'  
      },
      include: {
        profile: true, 
        services: true, 
      }
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);

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

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (body.password) {
    // hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
  }

  if (file) {
    try {
      const cloudinaryResult = await upload(file.buffer);
      body.avatar = cloudinaryResult;
    } catch (error) {
      console.error(" uploading avatar failds:", error);
      return res.status(500).json({ error: "Failed to upload avatar" });
    }
  }

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

const getAllServices = async (req, res) => {
  try {
    const services = await service.findMany({
      include: {
        professional: true,
        skills: true,
        hirings: {
          include: {
            client: true,
          },
        },
      },
    });
    const enhancedServices = services.map((service) => ({
      ...service,
      hiringCount: service.hirings.length,
      hirings: service.hirings.map((hiring) => ({
        ...hiring,
        clientName: hiring.client ? hiring.client.fullName : "",
      })),
    }));

    res.status(200).json(enhancedServices);
  } catch (error) {
    console.log(error);
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findUnique({
      where: { id: parseInt(id) },
      include: {
        client: {
          select: { fullName: true },
        },
        applications: {
          include: {
            applicant: {
              select: { fullName: true },
            },
          },
        },
        favouriteTasks: true,
      },
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const formattedTask = {
      ...task,
      applications: task.applications.map((app) => ({
        ...app,
        applicantName: app.applicant.fullName,
      })),
    };

    res.status(200).json(formattedTask);
  } catch (error) {
    console.error("Error retrieving task:", error);
    res.status(500).send({ error: "Failed to retrieve task details" });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const services = await service.findUnique({
      where: { id: parseInt(id) },
      include: {
        professional: true,
        skills: true,
        hirings: {
          include: {
            client: true,
          },
        },
      },
    });
    if (!services) {
      return res.status(404).json({ message: "Service not found" });
    }
    const enhancedService = {
      ...services,
      hiringCount: services.hirings.length,
      hirings: services.hirings.map((hiring) => ({
        ...hiring,
        clientName: hiring.client ? hiring.client.fullName : "",
      })),
    };

    res.status(200).json(enhancedService);
  } catch (error) {
    console.error("Error retrieving service:", error);
    res.status(500).send({ error: "Failed to retrieve service details" });
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

    // perform the upload process
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
  updateAdmin,
  getAllServices,
  getTaskById,
  getServiceById,
  updateAdminAvatar,
  updateUserPasswordAndEmail

};
