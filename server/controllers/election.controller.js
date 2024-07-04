const {
  createNewElection,
  addNewCandidate,
  getCandidatesByConsistuency,
  deleteCandidateByCriteria,
  getAllElections,
  deleteElectionById,
  updateElectionAllData,
  getElectionByIdService,
  publishElection,
} = require("../services/election/election.services");

const createElection = (req, res) => {
  createNewElection(req.body)
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          status: "0",
          message: "Election can not be create, something went wrong",
        });
      }

      return res.status(201).json({
        status: "1",
        message: "New Election Created",
        data: response,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        status: "0",
        message: "Internal server error",
      });
    });
};

const addCandidate = (req, res) => {
  addNewCandidate(req.body)
    .then((candidate) => {
      if (!candidate) {
        return res.status(401).json({
          status: "0",
          message: "Candidate can not be created, something went wrong",
        });
      }

      return res.status(200).json({
        status: "1",
        message: "New candidate added",
        data: candidate,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        status: "0",
        message: "Internal server error",
      });
    });
};

const getCandidates = (req, res) => {
  getCandidatesByConsistuency(req.body.consistuency)
    .then((candidates) => {
      if (!candidates) {
        return res.status(401).json({
          status: "0",
          message: "No candidate found",
        });
      }

      return res.status(200).json({
        status: "1",
        message: "Candidates list",
        data: candidates,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        status: "0",
        message: "Internal server error",
      });
    });
};

const getElections = (req, res) => {
  getAllElections()
    .then((elections) => {
      if (!elections.length) {
        return res.status(401).json({
          status: "0",
          message: "No election found",
        });
      }
      return res.status(200).json({
        status: "1",
        message: "Elections list",
        data: elections,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        status: "0",
        message: "Internal server error",
      });
    });
};

const deleteCandidate = async (req, res) => {
  const { name, party, age, constituency } = req.body;

  try {
    const deletedCandidate = await deleteCandidateByCriteria(
      name,
      party,
      age,
      constituency,
    );

    if (!deletedCandidate) {
      return res.status(404).json({
        status: "0",
        message: "No candidate found with the provided criteria",
      });
    }

    return res.status(200).json({
      status: "1",
      message: "Candidate Deleted",
    });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return res.status(500).json({
      status: "0",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateElection = async (req, res) => {
  const electionId = req.params.id;
  const electionData = {
    title: req.body.title,
    status: req.body.status,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
  };

  try {
    const updatedElection = await updateElectionAllData(
      electionId,
      electionData,
    );
    res.status(200).json({
      status: "success",
      message: "Election updated successfully",
      data: updatedElection,
    });
  } catch (error) {
    console.error("Error updating election:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update election. Please try again later.",
      error: error.message,
    });
  }
};
const publishElectionResult = (req, res) => {
  const electionId = req.body.id;
  publishElection(electionId)
    .then((election) => {
      if (!election) {
        return res.status(401).json({
          status: "0",
          message: "No election found",
        });
      }

      return res.status(200).json({
        status: "1",
        message: "Election result published",
        data: election,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        status: "0",
        message: "Internal server error",
      });
    });
};

const getElectionById = (req, res) => {
  const electionId = req.params.id;
  getElectionByIdService(electionId)
    .then((election) => {
      if (!election) {
        return res.status(401).json({
          status: "0",
          message: "No election found",
        });
      }

      return res.status(200).json({
        status: "1",
        message: "Election Data",
        data: election,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        status: "0",
        message: "Internal server error",
        error: error,
      });
    });
};

const deleteElection = (req, res) => {
  const electionId = req.params.id;
  deleteElectionById(electionId)
    .then((election) => {
      if (!election) {
        return res.status(401).json({
          status: "0",
          message: "No election found",
        });
      }
      return res.status(200).json({
        status: "1",
        message: "Election Deleted",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        status: "0",
        message: "Internal server error",
        error: error,
      });
    });
};

module.exports = {
  createElection,
  addCandidate,
  getCandidates,
  deleteCandidate,
  updateElection,
  getElections,
  getElectionById,
  publishElectionResult,
  deleteElection,
};
