import React, { useState } from 'react';
import './Tutorials.css';
import { FaCamera } from 'react-icons/fa';

const Tutorial = () => {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [newTutorial, setNewTutorial] = useState({
    title: '',
    description: '',
    imageUrl: '',
    uploadedFile: null,
    uploadedFileType: '',
  });
  const [showFile, setShowFile] = useState({});

  const suggestion = [
    { id: 1, name: 'Organic' },
    { id: 2, name: 'Recycle' },
    { id: 3, name: 'Waste Disposal' },
    { id: 4, name: 'Others' },
  ];

  const handleChoiceClick = (choiceName) => {
    setSelectedChoices((prevSelectedChoices) => {
      if (prevSelectedChoices.includes(choiceName)) {
        return prevSelectedChoices.filter((name) => name !== choiceName);
      } else {
        return [...prevSelectedChoices, choiceName];
      }
    });
  };

  const handleFindClick = () => {
    console.log('Selected Categories:', selectedChoices);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTutorial((prevTutorial) => ({
      ...prevTutorial,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTutorial((prevTutorial) => ({
        ...prevTutorial,
        uploadedFile: file,
        uploadedFileType: file.type.includes('video') ? 'video' : file.type.includes('text') ? 'text' : file.type.includes('pdf') ? 'pdf' : 'other',
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewTutorial((prevTutorial) => ({
        ...prevTutorial,
        imageUrl: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTutorial.title && newTutorial.description && newTutorial.imageUrl) {
      setTutorials((prevTutorials) => [...prevTutorials, { ...newTutorial, id: Date.now() }]);
      setNewTutorial({
        title: '',
        description: '',
        imageUrl: '',
        uploadedFile: null,
        uploadedFileType: '',
      });
      e.target.reset();
    } else {
      alert('Please fill in all tutorial details (Title, Description, and upload an Article Image).');
    }
  };

  const handleSeeMoreClick = (id) => {
    setShowFile((prevShowFile) => ({
      ...prevShowFile,
      [id]: !prevShowFile[id],
    }));
  };

  return (
    <>
      <div className="Tutorial">
        <aside className="left-panel">
          <section className="">
            <h1>Search Tutorial</h1>
            <input type="text" placeholder="Input category" />
            <div className="suggestion">
              {suggestion.map((suggest) => (
                <div
                  className={`choice ${selectedChoices.includes(suggest.name) ? 'selected' : ''}`}
                  key={suggest.id}
                  onClick={() => handleChoiceClick(suggest.name)}
                >
                  {suggest.name}
                </div>
              ))}
            </div>
            <button className="find" onClick={handleFindClick}>
              Find
            </button>
          </section>
          <hr className="divider" />
          <section className="Add-tutorial">
            <form onSubmit={handleSubmit} className="Tuto-form">
              <h2>Add Tutorial</h2>
              <input
                type="text"
                placeholder="Title"
                className="Title"
                name="title"
                value={newTutorial.title}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="description"
                placeholder="Description"
                name="description"
                value={newTutorial.description}
                onChange={handleInputChange}
              />

              <label htmlFor="article-image-upload" className="file-upload-label upload-image-label">
                <input
                  id="article-image-upload"
                  type="file"
                  className="file-input"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <button type="button" className="file upload-image-button" onClick={() => document.getElementById('article-image-upload').click()}>
                  <FaCamera style={{ marginRight: '8px' }} /> Upload Image
                </button>
              </label>
              {newTutorial.imageUrl && (
                <p className="uploaded-image-name">Selected: Image uploaded</p>
              )}

              <label htmlFor="file-upload" className="file-upload-label">
                <input
                  id="file-upload"
                  type="file"
                  className="file-input"
                  onChange={handleFileUpload}
                  accept="video/*, text/*, application/pdf"
                />
                <button type="button" className="file" onClick={() => document.getElementById('file-upload').click()}>
                  Upload File
                </button>
              </label>
              {newTutorial.uploadedFile && (
                <p className="uploaded-file-name">Selected: {newTutorial.uploadedFile.name}</p>
              )}

              <button className="submit" type="submit">
                Submit
              </button>
            </form>
          </section>
        </aside>

        <main className="main-content">
          
          {tutorials.map((tutorial) => (
            <div className="tutorial-card" key={tutorial.id}>
              {tutorial.imageUrl && (
                <img src={tutorial.imageUrl} alt={tutorial.title} className="card-image" />
              )}
              <h3 className="card-title">
                <b>{tutorial.title}</b>
              </h3>
              <p className="card-description">{tutorial.description}</p>
              <button className="see-more" onClick={() => handleSeeMoreClick(tutorial.id)}>
                {showFile[tutorial.id] ? 'Hide File' : 'See More'}
              </button>
              {showFile[tutorial.id] && tutorial.uploadedFile && (
                <div className="uploaded-content">
                  {tutorial.uploadedFileType === 'video' && (
                    <video controls width="100%">
                      <source src={URL.createObjectURL(tutorial.uploadedFile)} type={tutorial.uploadedFile.type} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {(tutorial.uploadedFileType === 'text' || tutorial.uploadedFileType === 'pdf') && (
                    <iframe
                      src={URL.createObjectURL(tutorial.uploadedFile)}
                      width="100%"
                      height="300px"
                      title="Uploaded File"
                    ></iframe>
                  )}
                  {tutorial.uploadedFileType === 'other' && (
                    <p>File type not directly displayable: {tutorial.uploadedFile.name}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Tutorial;