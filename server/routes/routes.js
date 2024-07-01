const {
  test,
  regsiter,
  sendAadharOtp,
  loginOtp,
  loginVerifyOtp,
} = require("../controllers/auth.controller");
const {
  createElection,
  addCandidate,
  deleteCandidate,
  updateElection,
  getElections,
  getElectionById,
  getCandidates,
  publishElectionResult,
} = require("../controllers/election.controller");
const { userVote, getUserByUserId, checkUserVerification, userVoterVerification } = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/test", test);
router.post("/auth/regsiter", regsiter);
router.post("/auth/aadharOtp", sendAadharOtp);
router.post("/auth/loginOtp", loginOtp);
router.post("/auth/login", loginVerifyOtp);


router.post("/admin/election", createElection);
router.post("/admin/candidate", addCandidate);
router.delete("/admin/candidate", deleteCandidate);
router.patch("/admin/election/:id", updateElection);
router.get("/election/candidate", getCandidates);
router.get("/elections", getElections);
router.get("/election/:id", getElectionById);
router.post("/admin/election/publish", publishElectionResult)


router.post("/user/vote", userVote)
router.get("/user:id", getUserByUserId)
router.get("/user/kyv/isVerify", checkUserVerification)
router.post("/user/kyv/verify", userVoterVerification)

module.exports = router;

