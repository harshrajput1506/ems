const {
  test,
  regsiter,
  sendAadharOtp,
  loginOtp,
  loginVerifyOtp,
  loginAsAdmin,
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
  deleteElection,
} = require("../controllers/election.controller");
const {
  userVote,
  getUserByUserId,
  checkUserVerification,
  userVoterVerification,
} = require("../controllers/user.controller");
const { verifyJwt } = require("../middlewares/jwt");
const {
  updateElectionByStatus,
} = require("../services/election/election.services");
const router = require("express").Router();

router.get("/test", test);
router.post("/auth/regsiter", regsiter);
router.post("/auth/aadharOtp", sendAadharOtp);
router.post("/auth/loginOtp", loginOtp);
router.post("/auth/login", loginVerifyOtp);
router.post("/auth/admin/login", loginAsAdmin);

router.post("/admin/election", verifyJwt, createElection);
router.post("/admin/candidate", verifyJwt, addCandidate);
router.delete("/admin/candidate", verifyJwt, deleteCandidate);
router.patch("/admin/election/:id", verifyJwt, updateElection);
router.get("/election/candidate", getCandidates);
router.get("/elections", getElections);
router.get("/election/:id", getElectionById);
router.post("/admin/election/publish", verifyJwt, publishElectionResult);
router.patch(
  "/admin/election/publish/:id/:status",
  verifyJwt,
  updateElectionByStatus,
);

router.post("/user/vote", verifyJwt, userVote);
router.get("/user/:id", verifyJwt, getUserByUserId);
router.get("/user/kyv/isVerify", verifyJwt, checkUserVerification);
router.post("/user/kyv/verify", verifyJwt, userVoterVerification);
router.delete("/admin/election/:id", verifyJwt, deleteElection);

module.exports = router;
