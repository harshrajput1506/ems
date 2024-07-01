const { prisma } = require("../../config/database")

const verifyVoterId = async (data) => {
    try {
        const {voterId, userId} = data

        // Use APIs to check verification

        // Testing
        if(voterId != "ABCD"){
            throw new Error("Voter id is not valid")
        }

        const voterData = {
            name:John,
            consistuency_assembly:"Dwarka",
            voter_card_number:"ABCD",
            address:"address"
        }

        const user = await prisma.user.findUnique({
            where:{uid:parseInt(userId)}
        })

        if(!user){
            throw new Error("User not found")
        }

        const userKYV = await prisma.kYV.create({
            data:{
                voter_card_number:voterData.voter_card_number,
                address:voterData.address,
                constituent_assembly:voterData.consistuency_assembly,
                userId:parseInt(userId)
            }
        })

        return userKYV

    } catch (error) {
        throw error
    }
}

const checkUserKYV = async (userId) => {
    try {
        const userKYV = await  prisma.kYV.findUnique({
            where:{userId:parseInt(userId)}
        })
        return userKYV
    } catch (error) {
        throw error
    }
}

module.exports = {verifyVoterId, checkUserKYV}