import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// Define your form data interface
interface LoginFormOtpData {
  phoneNumber: string;
  otp: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormOtpData>();

  const onSubmit: SubmitHandler<LoginFormOtpData> = (data) => {
    // Handle OTP login logic here
    console.log(data);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-8 w-96">
        <h2 className="text-4xl font-bold mb-12 text-center text-teal-600">EMS</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 space-y-2">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input type="number" {...register("phoneNumber", { required: true })} />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">Phone number is required</p>}
          </div>
          <div className="mb-4 space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input type="password" {...register("otp", { required: true })} />
            {errors.otp && <p className="text-red-500 text-sm mt-1">OTP is required</p>}
          </div>

          <Button type="submit" className="w-full mt-4  bg-teal-500 text-white hover:bg-teal-600">
            Login
          </Button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-700">Not registered, <Link to="/register" className="font-medium text-teal-500 hover:underline">REGISTER</Link> please!</p>
        <Button 
            variant="link"
            className="w-full mt-4 text-teal-500"
            onClick={() => navigate("/admin/login")}
            >
          Login as an ADMIN
        </Button>
      </div>
    </div>
  );
}

export default Login;
