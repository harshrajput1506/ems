require("dotenv").config();
const axios = require("axios");
const { prisma } = require("../../config/database");

const sendLoginOtp = async (number) => {
  try {
    const numberWithCode = "+91" + number;
    const url =
      "https://2factor.in/API/V1/" +
      process.env.FACTOR_API_KEY +
      "/SMS/" +
      numberWithCode +
      "/AUTOGEN2/OTP1";

    const response = await axios.get(url);

    // Check for errors in the response itself (e.g., rate limits)
    if (response.status !== 200) {
      throw new Error(`Error from OTP API: ${response.status} - ${response.statusText}`);
    }

    const responseData = response.data;
    
    // Return the response data if it's valid
    if(responseData){
      return responseData;
    }
    else{
      throw new Error("Response not found from Send OTP");
    }
    
  } catch (error) {
    // Handle all errors (Axios errors, API errors, etc.)
    console.log("Error sending OTP:", error.message || error); // Log the error

    // You can rethrow the error to be handled by a higher-level error handler
    // Or, you can return a more specific error message:
    throw new Error("Failed to send OTP. Please try again later."); 
  }
};

const loginByOtp = async (number, otp) => {
    try {
        //Verify OTP
        const isOtpValid = await verifyOtp(number, otp);
        if (!isOtpValid) {
            throw new Error("Invalid OTP")
        }

        // Find User by Phone Number
        const user = await prisma.user.findUnique({
            where: { number },
            include: { aadhar_details: false, kvy: false } // Include related data
        });

        if (!user) {
            throw new Error("User not found")
        }

        //const token = generateToken(user); 
        // Store token in session, cookie, or send in response

        return user

    } catch (error) {
        
        throw error
    }
};

const verifyOtp = async (number, otp) => {
    try {
        //https://2factor.in/API/V1/:api_key/SMS/VERIFY3/:phone_number/:otp_entered_by_user
    const numberWithCode = "+91" + number
    const url = "https://2factor.in/API/V1/" +
    process.env.FACTOR_API_KEY +
    "/SMS/VERIFY3/" +
    numberWithCode +
    "/" + otp;

    const response = await axios.get(url)
    if (response.status !== 200) {
        throw new Error(`Invalid OTP: ${response.status} - ${response.statusText}`);
    }

    const data = response.data
    if(data.Details !== "OTP Matched") {
        throw new Error(data.Details || "Inavlid OTP")
    }

    return true

    } catch (error) {
        throw error
    }

}

module.exports = { sendLoginOtp, loginByOtp };
