export default function ContactUs() {
  return (
    <div className=" bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
      {/* Header */}

      {/* Contact Card */}
      <div className="mt-10 w-[90%] max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Advertising Inquiries
        </h3>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-8">
          Connect with us to discuss advertising opportunities
        </p>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-4">
              <span className="text-2xl bg-white dark:bg-gray-600 p-3 rounded-full shadow-sm">
                📞
              </span>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  6304917180
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-4">
              <span className="text-2xl bg-white dark:bg-gray-600 p-3 rounded-full shadow-sm">
                📧
              </span>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  info@meenews.co
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <p className="font-medium text-gray-800 dark:text-white mb-2">
            Local Coverage
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Reach out to our local reporters for regional advertising
          </p>
        </div>
      </div>
    </div>
  );
}
