import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";
import { fetchUser } from "../store/userSlice";
import { Link} from "react-router-dom";
import { IoMdSkipForward } from "react-icons/io";
function Signin() {
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      country_code: "",
      device_uuid: null,
      email: formData.email, // Hardcoded email for now
      fcm_meenews_token: "",
      hash_code: "",
      mobile_num: formData.phone.slice(-10), // Extract last 10 digits
      onesignal_id: "",
      password: formData.password,
      referral_code: "",
      skip: false,
      type: "meenews",
      version: "new",
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/common/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.token;
      if (token) {
        console.log("Setting token:", token);
        dispatch(setToken(token));
      } else {
        console.log("No token received");
      }

      if (response.data && response.status == 201) {
        await dispatch(fetchUser())
        toast.success("Login successful!");
        console.log("Response:", response.data);
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Sign in to continue
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Mobile Number
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
              inputClass="!w-full !bg-gray-100 dark:!bg-gray-800 !text-gray-900 dark:!text-white !border !border-gray-300 dark:!border-gray-600 !rounded-lg !py-2 !px-4 focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition !duration-200"
              buttonClass="!bg-gray-100 dark:!bg-gray-800 !border !border-gray-300 dark:!border-gray-600 !rounded-l-lg !transition !duration-200 hover:!bg-gray-200 dark:hover:!bg-gray-700"
              dropdownClass="!bg-gray-100 dark:!bg-gray-800 !text-gray-900 dark:!text-white"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to='/signup'
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <div className="flex justify-end px-4">
         <Link to='/location'><div className="flex flex-row items-center gap-1 text-blue-500 dark:text-blue-400 hover:underline"> Skip <IoMdSkipForward/></div></Link>

        </div>
      </div>
    </div>
  );
}

export default Signin;
