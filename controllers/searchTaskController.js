const { task } = require("../database/prisma");

const searchTasks = async (req, res) => {
  const {searchTitle ,searchLocation} = req.query.params
  const whereClause = {};

  if (searchTitle) {
    whereClause.title = {
      contains: searchTitle
    };
  }

  if (searchLocation) {
    whereClause.location = searchLocation; 
  }

  try {
    const tasks = await task.findMany({
      where: whereClause,
    });
    console.log("tasks :", tasks);
    res.json(tasks);
  } catch (error) {
    console.error("Error searching for tasks:", error);
    res.status(500).send({ message: 'Error retrieving tasks.' });
  }
};

module.exports = {
  searchTasks,
};
