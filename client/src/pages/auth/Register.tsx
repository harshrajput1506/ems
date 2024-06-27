import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

interface RegistrationFormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  aadhaarCardNumber: string;
  otp: string;
  sendOTP: boolean;
}

function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const [sendOTP] = useState(false);

  useEffect(() => {
    // Update the "otp" field's disabled state whenever sendOTP changes
    setValue("otp", "", { shouldValidate: true, shouldDirty: true }); // Clear and re-validate OTP field
  }, [sendOTP, setValue]);

  //const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
  //setSendOTP(e.target.checked);
  //};

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log(data);
    // Perform registration logic (e.g., send OTP, validate, register user)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-teal-600">
          EMS
        </h2>

        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full">
            <div className="mb-4 space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input {...register("fullName", { required: true })} />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  Full Name is required
                </p>
              )}
            </div>

            <div className="mb-4 space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input
                type="number"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  Phone number is required
                </p>
              )}
            </div>
            <div className="mb-4 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input {...register("address", { required: true })} />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">Address is required</p>
              )}
            </div>
            <div>
              <div className="mb-4 space-y-2">
                <Label htmlFor="aadhaarCardNumber">Adhaar card number</Label>
                <Input {...register("aadhaarCardNumber", { required: true })} />
                {errors.aadhaarCardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    Adhaar card number is required
                  </p>
                )}
              </div>

              <div className="flex items-center mb-4">
                <Checkbox
                  {...register("sendOTP")}
                  id="sendOTP"
                  className=" accent-teal-500"
                  // Update sendOTP on change
                />
                <Label htmlFor="sendOTP" className="ml-2">
                  Send OTP
                </Label>
              </div>
            </div>
          </div>

          <div className="mb-4 space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input type="text" {...register("otp")} disabled={!sendOTP} />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-teal-500 text-white hover:bg-teal-600"
          >
            Register
          </Button>
        </form>

        <p
          className="text-center mt-6 text-sm text-gray-700"
          // Assuming you have a /login route
        >
          Already registered,{" "}
          <Link
            to="/login"
            className="font-medium text-teal-500 hover:underline"
          >
            LOGIN
          </Link>{" "}
          please!
        </p>
      </div>
    </div>
  );
}

export default Register;
