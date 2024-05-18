const Register = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl p-6">
          <h2 className="mb-6 text-4xl font-bold text-center text-green-600">EMS</h2>
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="full-name">Full Name</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  id="full-name"
                  type="text"
                  placeholder="Saga Singh"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="phone">Phone number</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  id="phone"
                  type="text"
                  placeholder="7667425XXXX"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="address">Address</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  id="address"
                  type="text"
                  placeholder="Viswas nagar, Delhi"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="aadhaar">Aadhaar card number</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  id="aadhaar"
                  type="text"
                  placeholder="3077 6689 XXXX XXXX"
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    id="send-otp"
                  />
                  <label htmlFor="send-otp" className="ml-2 text-sm text-gray-700">Send OTP</label>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="otp">OTP</label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                id="otp"
                type="text"
                placeholder="XXXXX"
              />
            </div>
            <button
              className="w-full px-4 py-2 mt-6 font-semibold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700">
              Already registered, <a href="/login" className="font-medium text-green-600 hover:underline">Login please!</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default Register
  