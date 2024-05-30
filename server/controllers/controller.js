const { registerUser } = require("../services/auth/register");
const { generateOtp } = require("../services/auth/sandbox");

const test = (req, res) => {
    res.status(200).json({
        status:"Success",
        message:"API Works Fine"
    })
}

const regsiter = (req, res) => {
    const body = req.body
    registerUser(body).then( user => {
        if(!user){
            return res.status(404).json({
                status:"0",
                message:"Created user not found, something went wrong"
            })
        }

        return res.status(200).json({
            status:"0",
            message:"User Registered",
            data: user
        })
    }).catch( error => {
        console.log(error)
        return res.status(401).json({
            status:"0",
            message:error.message,
        })
    })
}

const sendAadharOtp = (req, res) => {
  const {aadhaar_number} = req.body;
  generateOtp(aadhaar_number).then( response => {

    if(response){
        console.log(response)
        const data = response.data
        const msg = data.message
        if(data.reference_id) {
            return res.status(200).json({
                status:"1",
                message:msg,
                data: {
                    reference_id:data.reference_id
                }
            })
        } 

        return res.status(200).json({
            status:"0",
            message:msg
        }) 
    }

  }).catch( error => {
    return res.status(401).json({
        status:"0",
        message:error.message || "Invalid response, something went wrong"
    })
  })
};

module.exports = {test, regsiter, sendAadharOtp}