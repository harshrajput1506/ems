const { prisma } = require("../../config/database");

const createNewElection = async (data) => {
  try {
    const newElection = await prisma.elections.create({
      data: {
        title: data.title,
        startdate: data.startdate,
        enddate: data.enddate,
      },
    });
    return newElection
  } catch (error) {
    throw error
  }
};

const addNewCandidate = (data) => {

}

module.exports = {createNewElection}
