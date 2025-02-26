import { useState } from "react";
import { BsImage, BsFillCameraVideoFill } from "react-icons/bs";
import { FaPollH, FaHashtag } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const NewsTypeSelector = () => {
  const newsTypes = [
    { icon: <BsImage />, label: "Image" },
    { icon: <BsFillCameraVideoFill />, label: "Video" },
    { icon: <FaPollH />, label: "Poll" },
    { icon: <FaHashtag />, label: "Hashtag" },
  ];

  return (
    <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-4">
      {newsTypes.map(({ icon, label }, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {icon}
          </div>
          <span className="text-xs dark:text-gray-400 text-gray-600">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

const TextInput = ({ placeholder, maxLength, value, onChange }) => (
  <div>
    <input
      type="text"
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      className="w-full p-3 mb-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-right text-xs dark:text-gray-400 text-gray-600">
      Remaining characters: {maxLength - value.length}
    </p>
  </div>
);

const TextArea = ({ placeholder, maxLength, value, onChange }) => (
  <div>
    <textarea
      placeholder={placeholder}
      maxLength={maxLength}
      rows="3"
      value={value}
      onChange={onChange}
      className="w-full p-3 mb-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
    <p className="text-right text-xs dark:text-gray-400 text-gray-600">
      Remaining characters: {maxLength - value.length}
    </p>
  </div>
);

const RadioGroup = ({ selected, setSelected, options }) => (
  <div className="mb-4">
    <p className="mb-2 text-sm font-semibold dark:text-white text-gray-900">
      Select News Display Level
    </p>
    {options.map((level) => (
      <label key={level} className="flex items-center mb-1">
        <input
          type="radio"
          name="displayLevel"
          value={level}
          checked={selected === level}
          onChange={() => setSelected(level)}
          className="mr-2"
        />
        <span className="text-sm dark:text-gray-400 text-gray-700">
          {level}
        </span>
      </label>
    ))}
  </div>
);

const AddNewsForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Mandal");
  const [hashtags, setHashtags] = useState("");
  const [hashtagsList, setHashtagsList] = useState([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && hashtags.trim()) {
      e.preventDefault();
      setHashtagsList([...hashtagsList, hashtags.trim()]);
      setHashtags("");
    }
  };

  const removeHashtag = (index) => {
    setHashtagsList(hashtagsList.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !description || !category || !acceptedTerms) {
      alert("Please fill all required fields and accept terms.");
      return;
    }
    console.log({ title, description, category, selectedLevel, hashtagsList });
    alert("News Posted Successfully!");
  };

  return (
    <div className="w-full mx-auto p-6 rounded-xl shadow-lg dark:bg-black bg-white transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4 dark:text-white text-gray-900">
        ADD News
      </h2>
      <NewsTypeSelector />
      <TextInput
        placeholder="Title of the News"
        maxLength={100}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        placeholder="Description of the News"
        maxLength={450}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="w-full p-4 mb-4 border border-dashed dark:border-gray-700 text-center rounded-lg bg-gray-50 dark:bg-gray-900 cursor-pointer">
        📤 Select Photo
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 mb-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
      >
        <option value="">Category</option>
        <option value="Politics">Politics</option>
        <option value="Sports">Sports</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <RadioGroup
        selected={selectedLevel}
        setSelected={setSelectedLevel}
        options={["Mandal", "Constituency", "District", "State"]}
      />
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Enter Hashtags"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setHashtags("")}
          className="absolute right-3 top-3 text-gray-500 dark:text-gray-400"
        >
          <IoMdClose />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {hashtagsList.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
          >
            <span>{tag}</span>
            <button onClick={() => removeHashtag(index)} className="ml-2">
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
          className="mr-2"
        />
        <span className="text-sm dark:text-gray-400 text-gray-700">
          Accept{" "}
          <a href="#" className="text-blue-500">
            Terms & Conditions
          </a>
        </span>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        Post
      </button>
    </div>
  );
};

export default AddNewsForm;
