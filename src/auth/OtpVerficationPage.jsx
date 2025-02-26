import { useState, useEffect } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function OTPVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [searchParams] = useSearchParams();

  // Extract query parameters from the URL
  const mobileNum = searchParams.get("mobile_num") || "";
  const email = searchParams.get("email") || "";
  const password = searchParams.get("password") || "";

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle backspace key for OTP input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle OTP Verification API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");

    if (enteredOTP.length < 6) {
      toast.error("Please enter the full 6-digit OTP!");
      return;
    }

    const payload = {
      app_version: "",
      mobile_num: mobileNum,
      onesignal_id: "",
      otp: enteredOTP,
      password: password,
      txn_id: "undefined",
      type: "meenews",
      version: "new",
    };

    try {
      const response = await axios.post(
        "https://api.meebuddy.com/app/v4/common/verify",
        payload
      );

      if (response.data.status === "success") {
        toast.success("OTP verified successfully! 🎉");
      } else {
        toast.error(response.data.message || "OTP verification failed!");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-blue-200 dark:from-gray-900 dark:to-blue-900 text-gray-900 dark:text-white">
      <div className="w-[96%] max-w-md p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold mb-2">Enter OTP</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          We have sent a 6-digit code to your phone:{" "}
          <strong>{mobileNum}</strong>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Didn't receive the code?{" "}
          <a
            href="#"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            Resend
          </a>
        </p>
      </div>
    </div>
  );
}

export default OTPVerification;
