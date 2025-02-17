import React from "react";

const FileInputTest = () => {
  const handleImageChange = (e) => {
    console.log("File input changed"); // Debugging
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file); // Debugging
    }
  };

  return (
    <div>
      <input
        type="file"
        id="testFileInput"
        accept="image/*"
        style={{ opacity: 0, position: 'absolute', width: '1px', height: '1px' }} // Debugging
        onChange={handleImageChange}
      />
      <label htmlFor="testFileInput" style={{ cursor: 'pointer', zIndex: 10 }}>
        <button
          type="button"
          className="bg-white rounded-full shadow-md hover:bg-gray-50 p-2"
          aria-label="Change profile picture"
        >
          Click Me
        </button>
      </label>
    </div>
  );
};

export default FileInputTest;