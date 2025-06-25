import React, { useState, useCallback } from "react";
import "./Tutorials.css";
import { FaCamera } from "react-icons/fa";
import HomePage from "../../Home/HomePage";

const CATEGORY_OPTIONS = ["Organic", "Recycle", "Waste Disposal", "Others"];

const Tutorial = () => {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [showFile, setShowFile] = useState({});
  const [newTutorial, setNewTutorial] = useState({
    title: "",
    description: "",
    imageUrl: "",
    uploadedFile: null,
    uploadedFileType: "",
  });

  const toggleChoice = useCallback((choice) => {
    setSelectedChoices((prev) =>
      prev.includes(choice)
        ? prev.filter((c) => c !== choice)
        : [...prev, choice]
    );
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewTutorial((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setNewTutorial((prev) => ({
      ...prev,
      imageUrl,
    }));
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type.includes("video")
      ? "video"
      : file.type.includes("text")
      ? "text"
      : file.type.includes("pdf")
      ? "pdf"
      : "other";

    setNewTutorial((prev) => ({
      ...prev,
      uploadedFile: file,
      uploadedFileType: type,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, imageUrl } = newTutorial;
    if (!title || !description || !imageUrl) {
      alert("Please fill in all required fields.");
      return;
    }

    setTutorials((prev) => [...prev, { ...newTutorial, id: Date.now() }]);

    setNewTutorial({
      title: "",
      description: "",
      imageUrl: "",
      uploadedFile: null,
      uploadedFileType: "",
    });

    e.target.reset();
  };

  const toggleSeeMore = (id) => {
    setShowFile((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="Tutorial">
      {/* Sidebar */}
      <HomePage />
      <aside className="left-panel">
        <section>
          <h1>Search Tutorial</h1>
          <input type="text" placeholder="Input category" />
          <div className="suggestion">
            {CATEGORY_OPTIONS.map((name) => (
              <div
                key={name}
                className={`choice ${
                  selectedChoices.includes(name) ? "selected" : ""
                }`}
                onClick={() => toggleChoice(name)}
              >
                {name}
              </div>
            ))}
          </div>
          <button className="find" onClick={() => console.log(selectedChoices)}>
            Find
          </button>
        </section>

        <hr className="divider" />

        {/* Add Tutorial Form */}
        <section className="Add-tutorial">
          <form className="Tuto-form" onSubmit={handleSubmit}>
            <h2>Add Tutorial</h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              className="Title"
              value={newTutorial.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="description"
              value={newTutorial.description}
              onChange={handleInputChange}
            />

            {/* Image Upload */}
            <label className="file-upload-label upload-image-label">
              <input
                id="article-image-upload"
                type="file"
                className="file-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button
                type="button"
                className="file upload-image-button"
                onClick={() =>
                  document.getElementById("article-image-upload").click()
                }
              >
                <FaCamera style={{ marginRight: 8 }} /> Upload Image
              </button>
            </label>
            {newTutorial.imageUrl && (
              <p className="uploaded-image-name">Image uploaded</p>
            )}

            {/* File Upload */}
            <label className="file-upload-label">
              <input
                id="file-upload"
                type="file"
                className="file-input"
                accept="video/*, text/*, application/pdf"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                className="file"
                onClick={() => document.getElementById("file-upload").click()}
              >
                Upload File
              </button>
            </label>
            {newTutorial.uploadedFile && (
              <p className="uploaded-file-name">
                {newTutorial.uploadedFile.name}
              </p>
            )}

            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </section>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="tutorial-card">
            {tutorial.imageUrl && (
              <img
                src={tutorial.imageUrl}
                alt={tutorial.title}
                className="card-image"
              />
            )}
            <h3 className="card-title">{tutorial.title}</h3>
            <p className="card-description">{tutorial.description}</p>

            <button
              className="see-more"
              onClick={() => toggleSeeMore(tutorial.id)}
            >
              {showFile[tutorial.id] ? "Hide File" : "See More"}
            </button>

            {showFile[tutorial.id] && tutorial.uploadedFile && (
              <div className="uploaded-content">
                {tutorial.uploadedFileType === "video" && (
                  <video controls width="100%">
                    <source
                      src={URL.createObjectURL(tutorial.uploadedFile)}
                      type={tutorial.uploadedFile.type}
                    />
                  </video>
                )}
                {(tutorial.uploadedFileType === "text" ||
                  tutorial.uploadedFileType === "pdf") && (
                  <iframe
                    src={URL.createObjectURL(tutorial.uploadedFile)}
                    width="100%"
                    height="300"
                    title="Tutorial File"
                  ></iframe>
                )}
                {tutorial.uploadedFileType === "other" && (
                  <p>Cannot preview: {tutorial.uploadedFile.name}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Tutorial;
