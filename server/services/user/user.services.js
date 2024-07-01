const { prisma } = require("../../config/database");
const { use } = require("../../routes/routes");

const userVoteByElectionId = async (data) => {
  try {
    const { userId, electionId, candidateId, consituency } = data;
    const userKYV = await prisma.kYV.findUnique({
      where:{
        userId:userId
      }
    });
    if(!userKYV) {
        throw new Error("Voter Verification not completed")
    }
    if(userKYV.constituent_assembly!=consituency){
        throw new Error("User cannot vote")
    }
    const candidate = await prisma.candidates.findUnique({
        where: { id: candidateId },
    });
    if(!candidate) {
        throw new Error("Invalid Candidate Id")
    }
    const updatedCandidate = await prisma.candidates.update({
        where: { id: candidateId },
        data: { votes: candidate.votes + 1 },
    });
    return updatedCandidate
    
  } catch (error) {
    throw error
  }
};

const getUser = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where:{uid:userId},
        })
        return user
    } catch (error) {
        throw error
    }
}


module.exports={
    userVoteByElectionId,getUser
}
