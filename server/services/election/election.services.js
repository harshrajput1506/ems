const { prisma } = require("../../config/database");

const createNewElection = async (data) => {
  console.log(data);
  try {
    const newElection = await prisma.elections.create({
      data: {
        title: data.title,
        startdate: data.startdate,
        enddate: data.enddate,
      },
    });
    return newElection;
  } catch (error) {
    throw error;
  }
};

const addNewCandidate = async (data) => {
  try {
    const election = await prisma.elections.findUnique({
      where: { id: data.electionId },
    });
    if (!election) {
      throw new Error("Election not found");
    }

    const newCandidate = await prisma.candidates.create({
      data: {
        name: data.name,
        age: data.age,
        political_party: data.political_party,
        consistuency: data.consistuency,
        election: {
          connect: {
            id: data.electionId,
          },
        },
      },
    });

    return newCandidate;
  } catch (error) {
    throw error;
  }
};

const updateElectionAllData = async (data) => {
  try {
    // Update the election
    const electionId = data.electionId;
    const updateData = {
      title: data.title,
      status: data.status,
      startdate: data.startdate,
      enddate: data.enddate,
    };
    const updatedElection = await prisma.elections.update({
      where: { id: electionId },
      data: updateData,
    });

    console.log("Election updated:", updatedElection);
    return updatedElection;
  } catch (error) {
    throw error;
  }
};

const updateElectionByStatus = async (data) => {
  try {
    // Update the election by status
    const electionId = data.electionId;
    const updatedElection = await prisma.elections.update({
      where: { id: electionId },
      data: {
        status: data.status,
      },
    });

    console.log("Election updated:", updatedElection);
    return updatedElection;
  } catch (error) {
    throw error;
  }
};

const deleteElection = async (electionId) => {
  try {
    const deletedElection = await prisma.elections.delete({
      where: { id: electionId },
    });
    return deletedElection;
  } catch (error) {
    throw error;
  }
};

const updateCandidate = async (data) => {
  try {
    // Update the candidate
    const updatedCandidate = await prisma.candidates.update({
      where: { id: data.candidateId },
      data: {
        name: data.name,
        age: data.age,
        political_party: data.political_party,
        consistuency: data.consistuency,
      },
    });

    console.log("Candidate updated:", updatedCandidate);
    return updatedCandidate;
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw error;
  }
};

const deleteCandidateById = async (candidateId) => {
  try {
    // Delete the candidate
    const deletedCandidate = await prisma.candidates.delete({
      where: { id: candidateId },
    });

    console.log("Candidate deleted:", deletedCandidate);
    return deletedCandidate;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error;
  }
};

const getCandidatesByConsistuency = async (consistuencyName) => {
  try {
    const candidates = await prisma.candidates.findMany({
      where: {
        consistuency: consistuencyName,
      },
    });
    return candidates;
  } catch (error) {
    throw error;
  }
};

const getElections = async () => {
  try {
    const candidates = await prisma.elections.findMany();
    return candidates;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewElection,
  addNewCandidate,
  updateCandidate,
  deleteCandidateById,
  updateElectionAllData,
  updateElectionByStatus,
  deleteElection,
  getCandidatesByConsistuency,
};
