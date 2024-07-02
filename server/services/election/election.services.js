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
    // Check if the election exists
    const election = await prisma.elections.findUnique({
      where: { id: data.electionId },
    });

    if (!election) {
      throw new Error("Election not found");
    }

    // Create a new candidate
    const newCandidate = await prisma.candidates.create({
      data: {
        name: data.name,
        age: data.age,
        political_party: data.political_party,
        consistuency: data.constituency, // Corrected property name
        election: {
          connect: {
            id: parseInt(data.electionId),
          },
        },
      },
    });

    return newCandidate;
  } catch (error) {
    console.error("Error adding new candidate:", error);
    throw error;
  }
};
const updateElectionAllData = async (electionId, data) => {
  console.log("Election ID:", electionId);
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
      where: { id: parseInt(electionId) },
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
      where: { id: parseInt(electionId) },
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
      where: { id: parseInt(electionId) },
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
        age: parseInt(data.age),
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

const deleteCandidateByCriteria = async (name, party, age, constituency) => {
  try {
    const deletedCandidate = await prisma.candidates.deleteMany({
      where: {
        name,
        political_party: party,
        age: parseInt(age, 10), // Assuming age is stored as a number in your database
        consistuency: constituency, // Corrected property name
      },
    });

    console.log("Candidate deleted:", deletedCandidate);
    return deletedCandidate;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error;
  }
};
const publishElection = async (electionId) => {
  try {
    // Delete the candidate
    const updateElection = await prisma.elections.update({
      where: { id: parseInt(electionId) },
      data: {
        result_status: "Published",
      },
    });

    console.log("Election published:", updateElection);
    return updateElection;
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

const getAllElections = async () => {
  console.log("Getting all elections");
  try {
    const elections = await prisma.Elections.findMany({
      include: {
        candidates: false,
      },
    });
    return elections;
  } catch (error) {
    throw error;
  }
};

const getElectionByIdService = async (electionId) => {
  console.log("Geting all elections");
  try {
    const elections = await prisma.elections.findMany({
      where: {
        id: parseInt(electionId),
      },
      include: {
        candidates: true,
      },
    });
    return elections;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewElection,
  addNewCandidate,
  updateCandidate,
  updateElectionAllData,
  updateElectionByStatus,
  deleteElection,
  getCandidatesByConsistuency,
  getAllElections,
  getElectionByIdService,
  publishElection,
  deleteCandidateByCriteria,
};
