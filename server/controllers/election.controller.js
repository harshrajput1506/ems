const { createNewElection } = require("../services/election/election.services")

const createElection = (req, res) => {
    createNewElection(req.body).then( response => {
        if(!response){
            return res.status(404).json({
                status:"0",
                message:"Election data not found, something went wrong"
            })
        }

        return res.status(201).json({
            status:"0",
            message:"New Election Created",
            data: response
        })

    }).catch( error => {
        console.log(error)
        res.status(501).json({
            status:'0',
            message:"Internal server error"
        })
    })
}

module.exports = {createElection}