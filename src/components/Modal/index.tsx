import React, { useState } from "react";

const Modal = ({
  closeModal,
  images,
  setImages,
  descriptions,
  setDescriptions,
  handleFormSubmit,
}) => {
  const [newDescription, setNewDescription] = useState("");

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const addDescription = () => {
    setDescriptions((prevDescriptions) => [
      ...prevDescriptions,
      newDescription,
    ]);
    setNewDescription(""); // Clear input after adding
  };

  const removeImageAndDescription = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setDescriptions((prevDescriptions) =>
      prevDescriptions.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Upload Images and Descriptions</h2>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <input
          type="text"
          value={newDescription}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
        />
        <button onClick={addDescription}>Add Description</button>

        <div>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: 100 }}
              />
              <p>{descriptions[index]}</p>
              <button onClick={() => removeImageAndDescription(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleFormSubmit}>Generate PDF</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
