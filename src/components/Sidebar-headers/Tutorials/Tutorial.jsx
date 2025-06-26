import React, { useState, useCallback, useEffect } from "react";
import "./Tutorials.css";
import { FaCamera } from "react-icons/fa";
import HomePage from "../../Home/HomePage";
import * as API from "../../../api";
import * as Entity from "../../../entity";
import Modal from "../Modal";
import Logo from "../../../assets/logo.png";
import TutorialRender from "./Tutorial.Content";

// const CATEGORY_OPTIONS = ["Organic", "Recycle", "Waste Disposal", "Others"];

function TutorialCard({tutorial = (new Entity.Document).toObject(), onCardClick}) {
  // console.log(tutorial)
  return (
    <div key={tutorial.id} className="tutorial-card">
      <img
        src={tutorial.imageUrl !== undefined ? tutorial.imageUrl : Logo}
        style={{objectFit: 'scale-down'}}
        alt={tutorial.name}
        className="card-image"
      />
      <h3 className="card-title">{tutorial.name}</h3>
      <p className="card-description">{tutorial.description.length <= 45 ? tutorial.description : tutorial.description.slice(0, 41)}...</p>

      <button className="see-more" onClick={() => onCardClick(tutorial)}>
        See More
      </button>

      {/* {showFile[tutorial.id] && tutorial.uploadedFile && (
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
      )} */}
    </div>
  )
}

function Tutorial() {
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [searchProcessing, setSearchProcessing] = useState(false)
  const [CATEGORY_OPTIONS, setCategories] = useState([])

  const [tutorials, setTutorials] = useState([]);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  
  const [proposalCats, setProposalCats] = useState([])
  const [newTutorial, setNewTutorial] = useState({
    title: "",
    description: "",
    imageUrl: "",
    uploadedFile: null,
    uploadedFileType: "",
  });

  const toggleSearchCategory = useCallback((choice) => {
    setSearchCategories((prev) =>
      prev.includes(choice)
        ? prev.filter((c) => c !== choice)
        : [...prev, choice]
    );
  }, []);

  const handleSearch = useCallback(() => {
    setSearchProcessing(true)
    API.Document.search(searchText, searchCategories).then(setTutorials).catch().finally(() => setSearchProcessing(false))
  }, [searchText, searchCategories])

  const onTutorialCardClick = useCallback( (tutorial = (new Entity.Document).toObject()) => {
    API.Document.content(tutorial.id).then(setSelectedTutorial).then(() => setIsTutorialOpen(true))
  }, [] )

  const toggleProposalCategory = useCallback((choice) => {
    setProposalCats((prev) =>
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

  useEffect(() => {
    API.Categories.read().then(setCategories)
  }, [])

  return (
    <div className="Tutorial">
      {/* Sidebar */}
      <HomePage />
      <>
      <aside className="left-panel">
        <section>
          <h1>Search Tutorial</h1>
          <input type="text" onChange={ evt => { const { value } = evt.target; setSearchText(value)}} value={searchText} placeholder="Search" />
          <div className="suggestion">
            {CATEGORY_OPTIONS.map((cat, index) => (
              <div
                key={index}
                className={`choice ${
                  searchCategories.includes(cat.id) ? "selected" : ""
                }`}
                onClick={() => toggleSearchCategory(cat.id)}
              >
                {cat.name}
              </div>
            ))}
          </div>
          <button className="find" onClick={handleSearch}>
            { searchProcessing ? "Searching..." : "Search" }
          </button>
        </section>

        <hr className="divider" />

        {/* Add Tutorial Form */}
        <section className="Add-tutorial">
          <form className="Tuto-form" onSubmit={handleSubmit}>
            <h2>Add Tutorial</h2>
            <div className="suggestion">
              {CATEGORY_OPTIONS.map((cat, index) => (
                <div
                  key={index}
                  className={`choice ${
                    proposalCats.includes(cat.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleProposalCategory(cat.id)}
                >
                  {cat.name}
                </div>
              ))}
            </div>
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
        {tutorials.map((tutorial, index) => (<TutorialCard tutorial={tutorial} key={index} onCardClick={onTutorialCardClick}/>))}
      </main>
      </>
      <Modal isOpen={isTutorialOpen} onClose={() => { setIsTutorialOpen(false); setSelectedTutorial(null) }}>
        <TutorialRender content={selectedTutorial}/>
      </Modal>
    </div>
  );
};

export default Tutorial;
