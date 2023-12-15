import React from "react";
import "../styles/CreateCookbook.css";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookbook } from "../CookbookContext";
const AddCookbook = () => {
  const { addCookbook } = useCookbook();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const onCreate = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please add a title");
      return;
    }
    addCookbook({ title, description });

    navigate(-1);
  };

  return (
    <div>
      <div className="add-title-container">
        <h1 className="title">Create Cookbook</h1>
      </div>
      <div className="input-container">
        <div>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Title"
            id="title-input"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            placeholder="Description"
            id="title-input"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
      </div>
      <div id="save-button">
        <Button text="Create Cookbook" onClick={onCreate} />
      </div>
      <div id="cancel-button-container">
        <Button
          id="cancel-button"
          text="Cancel"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
};

export default AddCookbook;
