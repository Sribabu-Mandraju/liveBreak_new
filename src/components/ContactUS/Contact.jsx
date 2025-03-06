import React from 'react'
import { useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const Contact = () => {
    const [reportType, setReportType] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Report Type:", reportType);
      console.log("Message:", message);
    };
  
    return (
        <div className="relative w-full  md:max-w-7xl mx-auto container min-h-screen flex gap-4 dark:text-[#1189F6]">
      <div className="flex flex-col items-center bg-white  dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
      <div className="max-w-lg mx-auto p-4">
        <div className="bg-blue-500 text-white dark:bg-gray-800 p-6 text-center rounded-xl relative">
          <h2 className="text-2xl font-semibold">Contact information</h2>
          <p className="text-sm mt-1 mb-4">Say something for better services</p>
          <div className="space-y-2 flex  flex-col w-full">
            <div className="flex flex-col items-center justify-center gap-2">
              <FaPhone />
              <span>6309717180</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <FaEnvelope />
              <span>info@meannews.co</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <FaMapMarkerAlt />
              <span>Mangalagiri</span>
            </div>
          </div>
          <div className="flex gap-12 justify-center text-2xl mt-4">
            <FaInstagram className="cursor-pointer " />
            <FaFacebookF className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaLinkedinIn className="cursor-pointer" />
          </div>
          {/* <div className="absolute bottom-0 right-0 bg-purple-300 w-24 h-24 rounded-tl-full"></div> */}
        </div>
  
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <select
            className="w-full p-2 dark:border-none border dark:bg-gray-800 rounded-md outline-none"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="" disabled>Please select type of report</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
            <option value="feedback">Feedback</option>
            <option value="messagetooffice">Message to office</option>
            <option value="others">Others</option>
          </select>
  
          <textarea
            className="w-full dark:border-none border dark:bg-gray-800 p-2  rounded-md outline-none"
            placeholder="Enter more information here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
  
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
      </div>
      </div>
    );
}

export default Contact