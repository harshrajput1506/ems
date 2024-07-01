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
} = require("../controllers/election.controller");
const {
  getCandidatesByConsistuency,
} = require("../services/election/election.services");

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
router.get("/election/candidate", getCandidatesByConsistuency);
router.get("/admin/elections", getElections);

module.exports = router;

