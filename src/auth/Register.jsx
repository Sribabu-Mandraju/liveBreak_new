import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

function Signup() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    countryCode: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value, country) => {
    setFormData({
      ...formData,
      phone: value.slice(country.dialCode.length), // Extract only the number
      countryCode: `+${country.dialCode}`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      country_code: formData.countryCode,
      device_uuid: null,
      email: formData.email,
      fcm_meenews_token: "",
      hash_code: "",
      mobile_num: formData.phone,
      onesignal_id: "",
      password: formData.password,
      referral_code: "",
      skip: false,
      type: "meenews",
      version: "new",
    };

    try {
      const response = await fetch(`${BASE_URL}/common/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Signup successful! Redirecting to OTP verification...");

        navigate(`/OTPVerification?mobile_num=${formData.phone}&email=${formData.email}&password=${formData.password}`);
      } else {
        toast.error(data.message || "Signup failed! Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-blue-200 dark:from-gray-900 dark:to-blue-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-2">Create your account</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Join our community of developers
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone Number
            </label>
            <PhoneInput
              country={"us"}
              value={formData.countryCode + formData.phone}
              onChange={handlePhoneChange}
              inputProps={{ id: "phone", name: "phone", required: true }}
              containerClass="!w-full"
              inputClass="!w-full !bg-gray-100 dark:!bg-gray-700 !text-gray-900 dark:!text-white !border !border-gray-300 dark:!border-gray-600 !rounded-lg !py-2 !px-4 focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition !duration-200"
              buttonClass="!bg-gray-100 dark:!bg-gray-700 !border !border-gray-300 dark:!border-gray-600 !rounded-l-lg !transition !duration-200 hover:!bg-gray-200 dark:hover:!bg-gray-600"
              dropdownClass="!bg-gray-100 dark:!bg-gray-800 !text-gray-900 dark:!text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create your password"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
              I agree to the{" "}
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Continue
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
