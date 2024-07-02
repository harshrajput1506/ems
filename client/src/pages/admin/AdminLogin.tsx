//import { Button, Input, Label } from "@shadcn/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/admin/login",
        data,
      );
      if (response.data.status === "1") {
        const { token } = response.data;
        localStorage.setItem(
          "user",
          JSON.stringify({ email: data.email, token }),
        );
        navigate("/admin/dashboard"); // Redirect to admin dashboard on successful login
      } else {
        console.error("Admin login failed:", response.data.message);
        // Handle error messages or display to the user
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      // Handle network errors or other exceptions
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="p-8 w-96">
        <h2 className="text-4xl font-bold mb-12 text-center text-teal-600">
          EMS
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 space-y-2">
            <Label htmlFor="email">Email id</Label>
            <Input type="email" {...register("email", { required: true })} />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>
          <div className="mb-4 space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full mt-4  bg-teal-500 text-white hover:bg-teal-600"
          >
            Login as ADMIN
          </Button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          or sign up in with
        </div>
        <Button
          variant="link"
          className="w-full mt-4 text-teal-500"
          onClick={() => navigate("/user/login")}
        >
          Login as a Voter
        </Button>
      </div>
    </div>
  );
}

export default AdminLogin;

interface LoginFormData {
  email: string;
  password: string;
}
