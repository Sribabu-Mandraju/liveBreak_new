import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      country_code: formData.phone.slice(0, formData.phone.length - 10),
      device_uuid: null,
      email: formData.email,
      fcm_meenews_token: "",
      hash_code: "",
      mobile_num: formData.phone.slice(-10),
      onesignal_id: "",
      password: formData.password,
      referral_code: "",
      skip: false,
      type: "meenews",
      version: "new",
    };

    console.log("Payload:", payload);
    // Make API call here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-2">Create your account</h2>
        <p className="text-sm text-gray-400 mb-6">
          Join our community of developers
        </p>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone Number
            </label>
            <PhoneInput
              country={"us"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                id: "phone",
                name: "phone",
                required: true,
              }}
              containerClass="!w-full"
              inputClass="!w-full !bg-gray-700 !text-white !border !border-gray-600 !rounded-lg !py-2 !px-4 focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition !duration-200"
              buttonClass="!bg-gray-700 !border !border-gray-600 !rounded-l-lg !transition !duration-200 hover:!bg-gray-600"
              dropdownClass="!bg-gray-800 !text-white"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create your password"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Continue
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
