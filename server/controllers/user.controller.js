const { checkUserKYV, verifyVoterId } = require("../services/user/kyv");
const { userVoteByElectionId, getUser } = require("../services/user/user.services");

const userVote = (req, res) => {
  userVoteByElectionId(req.body)
    .then((updateCandidate) => {
        if (!updateCandidate) {
            return res.status(401).json({
              status: "0",
              message: "No election found",
            });
          }
    
          return res.status(200).json({
            status: "1",
            message: "Voted",
          });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        status: "0",
        message: "Internal server error",
        error: error.message,
      });
    });
};

const getUserByUserId = (req, res) => {
    getUser(req.param.id)
      .then((user) => {
          if (!user) {
              return res.status(401).json({
                status: "0",
                message: "No election found",
              });
            }
      
            return res.status(200).json({
              status: "1",
              message: "User Details",
              data:user
            });
      })
      .catch((error) => {
        console.log(error);
        res.status(501).json({
          status: "0",
          message: "Internal server error",
          error: error.message,
        });
      });
  };

  const checkUserVerification = (req, res) => {
    checkUserKYV(req.param.id)
      .then((userKYV) => {
          if (!userKYV) {
              return res.status(401).json({
                status: "0",
                message: "User KVY is not done",
              });
            }
            return res.status(200).json({
              status: "1",
              message: "User KYV Details",
              data:userKYV
            });
      })
      .catch((error) => {
        console.log(error);
        res.status(501).json({
          status: "0",
          message: "Internal server error",
          error: error.message,
        });
      });
  };

  const userVoterVerification = (req, res) => {
    verifyVoterId(req.body)
      .then((userKYV) => {
          if (!userKYV) {
              return res.status(401).json({
                status: "0",
                message: "User KVY not verified",
              });
            }
            return res.status(200).json({
              status: "1",
              message: "User KYV Verified",
              data:userKYV
            });
      })
      .catch((error) => {
        console.log(error);
        res.status(501).json({
          status: "0",
          message: "Internal server error",
          error: error.message,
        });
      });
  };


module.exports = {
    userVote,getUserByUserId, checkUserVerification, userVoterVerification
}
