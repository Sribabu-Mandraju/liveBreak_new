import React, { useState, useEffect } from "react";

export default function Referral() {
  const [referralData, setReferralData] = useState({
    referral_code: "",
    referrals: [],
    totalReferrals: 0
  });
  const [loading, setLoading] = useState(true);

  const bonusStructure = [
    { installations: 50, amount: "₹150" },
    { installations: 100, amount: "₹300" },
    { installations: 250, amount: "₹750" },
    { installations: 500, amount: "₹1,500" },
    { installations: 1000, amount: "₹3,000" },
    { installations: 2500, amount: "₹7,500" },
    { installations: 5000, amount: "₹12,000" },
    { installations: 10000, amount: "₹30,000" },
  ];

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const response = await fetch("https://api.meebuddy.com/app/v4/user/myreferrals", {
          method: "POST",
          headers: {
            "x-meebuddy-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOiI1ZmZkZTk4MmZkYjEzNTM2YjdjZDMwYzkifSwiY2VudGVyX2RhdGEiOnsidmlsbGFnZV9pZCI6IjVmZmRlOTM5NTI4YmViMzUyYWZiYmQ5MCIsImlkIjoiNWZmZGU5MmI2NTYzZmQzNGM0NjdlZGU0IiwiZGVsaXZlcnlfY29zdCI6MTB9LCJpYXQiOjE3NDEzNTQxNjYsImV4cCI6MTc3Mjg5MDE2Nn0.iJMwCBRjNl_wh5hNuyCj8xGC6aQdSDGEG8sL--AkXTw",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ version: "new" }),
        });

        const data = await response.json();
        if (data.code === 200) {
          setReferralData({
            referral_code: data.data.referral_code,
            referrals: data.data.Referrals,
            totalReferrals: data.data.Referrals.length
          });
        }
      } catch (error) {
        console.error("Error fetching referral data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* Personal Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#1189F6] bg-opacity-90 dark:bg-opacity-80 p-3 sm:p-4">
            <h2 className="text-white text-base sm:text-lg font-semibold">
              Personal Details
            </h2>
          </div>
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
              <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Your Referral Code
              </span>
              <span className="font-mono text-[#1189F6] dark:text-[#1189F6] font-semibold text-lg">
                {referralData.referral_code}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
              <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Total Joined from your Referral
              </span>
              <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                {referralData.totalReferrals}
              </span>
            </div>
            <button className="w-full bg-[#1189F6] bg-opacity-90 hover:bg-opacity-100 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out text-sm sm:text-base">
              Invite
            </button>
          </div>
        </div>

        {/* Referral List Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Your Referral List
          </h2>
          <div className="overflow-x-auto">
            {referralData.referrals.map((referral, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <span className="text-gray-600 dark:text-gray-300 min-w-[20px]">
                    {index + 1}.
                  </span>
                  <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
                    {referral.mobile_num}
                  </span>
                </div>
                <span className="text-gray-800 dark:text-gray-200 pl-7 sm:pl-0">
                  {referral.name}
                </span>
                <span className="ml-7 sm:ml-auto bg-[#1189F6] bg-opacity-10 dark:bg-opacity-20 text-[#1189F6] dark:text-[#1189F6] text-xs px-2 py-1 rounded-full">
                  {referral.first_order === 0 ? "IN PROGRESS" : "VALID"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Structure Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
            Referral Bonus Structure
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {bonusStructure.map((tier, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:border-[#1189F6] hover:border-opacity-30 border border-transparent transition-colors duration-200"
              >
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {tier.installations} Installations:
                </span>
                <span className="font-semibold text-[#1189F6] dark:text-[#1189F6] text-sm sm:text-base">
                  {tier.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
            Instructions for the referral program:
          </h2>
          <ul className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <p>
                User should signup and use your referral code at the time of
                signup.
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <p>
                There are three statuses:{" "}
                <span className="text-[#1189F6] dark:text-[#1189F6]">
                  in progress
                </span>
                ,{" "}
                <span className="text-green-500 dark:text-green-400">
                  Valid
                </span>
                , and{" "}
                <span className="text-red-500 dark:text-red-400">
                  Not valid
                </span>
                .
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <p>
                Initially, in progress, at the time of payment, we will display
                Valid or not status. Not valid will be like same device ID
                signup multiple users.
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2">4.</span>
              <p>Payment will be done each tier.</p>
            </li>
            <li className="flex items-start">
              <span className="mr-2">5.</span>
              <p>
                Once you're done with installations, reach out to our contact us
                number, or we will reach you.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}