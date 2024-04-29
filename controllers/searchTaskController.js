const { task } = require("../database/prisma");

const searchTasks = async (req, res) => {
 
  const searchTitle = req.query.params.searchTitle;
  const searchLocation = req.query.params.searchLocation;

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
