require("dotenv").config();
const axios = require("axios");

const accessToken = async () => {
  try {
    const options = {
      method: "POST",
      url: "https://api.sandbox.co.in/authenticate",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.SANDBOX_API_KEY,
        "x-api-secret": process.env.SANDBOX_SECRET_KEY,
        "x-api-version": process.env.SANDBOX_API_VERSION,
      },
    };

    const response = await axios.request(options);

    const token = response.data.access_token;
    return token;
  } catch (error) {
    throw error
  }
};

const generateOtp = async (aadharNumber) => {
  try {
    const token = await accessToken();
    console.log("token : " + token)
    if (!token) {
      throw new Error("Access token is undefined")
    }
    const options = {
      method: "POST",
      url: "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp",
      headers: {
        accept: "application/json",
        authorization: token,
        "x-api-key": process.env.SANDBOX_API_KEY,
        "x-api-version": process.env.SANDBOX_API_VERSION,
        "content-type": "application/json",
      },
      data: {
        "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.request",
        aadhaar_number: aadharNumber,
        consent: "y",
        reason: "For Register",
      },
    };

    const response = await axios.request(options);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

const verifyAadharOtp = async (otp, reference_id) => {
  try {
    const token = await accessToken();
    if (!token) {
      throw new Error("Access token is undefined")
    }
    const options = {
      method: "POST",
      url: "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify",
      headers: {
        accept: "application/json",
        authorization: token,
        "x-api-key": process.env.SANDBOX_API_KEY,
        "x-api-version": process.env.SANDBOX_API_VERSION,
        "content-type": "application/json",
      },
      data: {
        "@entity": "in.co.sandbox.kyc.aadhaar.okyc.request",
        reference_id: reference_id,
        otp: otp,
      },
    };

    const response = await axios.request(options)
    return response.data


  } catch (error) {
    throw error
  }
};

module.exports = { accessToken, generateOtp, verifyAadharOtp };
