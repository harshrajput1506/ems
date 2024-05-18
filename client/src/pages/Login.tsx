const Login = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm p-6 ">
          <h2 className="mb-6 text-4xl font-bold text-center text-green-600">EMS</h2>
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="phone">Phone number</label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                id="phone"
                type="text"
                placeholder="7667425XXXX"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="otp">OTP</label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                id="otp"
                type="password"
                placeholder="******"
              />
            </div>
            <button
              className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="text-center my-10">
            <p className="text-sm text-gray-700">
              Not registered, <a href="/register" className="font-medium text-green-600 hover:underline">REGISTER</a> please!
            </p>
            <p className="mt-4 text-sm font-medium text-green-600 hover:underline">
              <a href="#">Login as an ADMIN</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default Login