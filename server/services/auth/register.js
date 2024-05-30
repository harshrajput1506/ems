const { prisma } = require("../../config/database");
const { verifyAadharOtp } = require("./sandbox");

const registerUser = async (body) => {
  try {
    const { otp, reference_id } = body;

    const aadharResponse = await verifyAadharOtp(otp, reference_id);
    console.log(aadharResponse);
    if (aadharResponse.status != "VALID" || aadharResponse != undefined) {
      // OTP NOT VERIFIED
      throw new Error(aadharResponse.message || "Aadhar Not Verified");
    }
    const aadharDetails = {
      full_address: data.full_address,
      name: data.name,
      care_of: data.care_of,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      email_hash: data.email_hash,
      mobile_hash: data.mobile_hash,
    };

    const newUser = await createUserWithAadharDetails(body, aadharDetails);
    if (!newUser) {
      throw new Error("Created user not found, something went wrong");
    }

    return newUser;
  } catch (error) {
    throw error;
  }
};

async function createUserWithAadharDetails(body, aadharData) {
  try {
    const { name, phone_number, aadhar_number, address } = body;
    const newUser = await prisma.user.create({
      data: {
        name: name,
        number: phone_number,
        aadhar_number: aadhar_number,
        address: address,
        aadhar_details: {
          create: {
            aadhar_number: aadhar_number,
            full_address: aadharData.full_address,
            name: aadharData.name,
            care_of: aadharData.care_of,
            date_of_birth: aadharData.date_of_birth,
            gender: aadharData.gender,
            email_hash: aadharData.email_hash,
            mobile_hash: aadharData.mobile_hash,
          },
        },
      },
    });

    console.log("User created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "P2002") {
      throw new Error("User with this number or Aadhaar number already exists");
    } else {
      throw error; // Rethrow the error for further handling
    }
  }
}

// Example Usage
// const userData = {
//   name: "John Doe",
//   number: "9876543210",
//   aadhar_number: 123456789012,
//   address: "123 Main Street",
// };

// const aadharData = {
//   aadhar_number: "123456789012",
//   full_address: "456 Elm Street, Cityville",
//   name: "John Doe",
//   care_of: "Self",
//   date_of_birth: "1990-01-15",
//   gender: "Male",
//   email_hash: "hashed_email@example.com",
//   mobile_hash: "hashed_mobile_number",
// };

module.exports = { registerUser };
