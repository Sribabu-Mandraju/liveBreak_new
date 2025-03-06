import React from "react";

export default function Referral() {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Personal Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#1189F6] bg-opacity-90 dark:bg-opacity-80 p-4">
            <h2 className="text-white text-lg font-semibold">
              Personal Details
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Your Referral Code
              </span>
              <span className="font-mono text-[#1189F6] dark:text-[#1189F6] font-semibold">
                MB6CNSQ
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Total Joined from your Referral
              </span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                1
              </span>
            </div>
            <button className="w-full bg-[#1189F6] bg-opacity-90 hover:bg-opacity-100 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
              Invite
            </button>
          </div>
        </div>

        {/* Referral List Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Your Referral List
          </h2>
          <div className="overflow-x-auto">
            <div className="flex items-center space-x-4 py-2 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-600 dark:text-gray-300">1.</span>
              <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
                800211213
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                Gurram Rajasekhar
              </span>
              <span className="ml-auto bg-[#1189F6] bg-opacity-10 dark:bg-opacity-20 text-[#1189F6] dark:text-[#1189F6] text-xs px-2 py-1 rounded-full">
                IN PROGRESS
              </span>
            </div>
          </div>
        </div>

        {/* Bonus Structure Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Referral Bonus Structure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonusStructure.map((tier, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:border-[#1189F6] hover:border-opacity-30 border border-transparent transition-colors duration-200"
              >
                <span className="text-gray-600 dark:text-gray-300">
                  {tier.installations} Installations:
                </span>
                <span className="font-semibold text-[#1189F6] dark:text-[#1189F6]">
                  {tier.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Instructions for the referral program:
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
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
