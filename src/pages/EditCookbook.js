import React from "react";
import "../styles/CreateCookbook.css";
import Button from "../components/Button";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookbook } from "../CookbookContext";
const EditCookbook = () => {
  const { cookbooks, editCookbook } = useCookbook();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { cookbookId } = useParams();
  const cookbookToEdit = cookbooks.find((cookbook) => cookbook._id === cookbookId);
  const navigate = useNavigate();

  const onEditCookbook = (e) => {
    e.preventDefault();

    if (title && description) {
      editCookbook(cookbookId, { ...cookbookToEdit, title, description });
    } else if (title) {
      editCookbook(cookbookId, { ...cookbookToEdit, title });
    } else if (description) {
      editCookbook(cookbookId, { ...cookbookToEdit, description });
    }

    setTitle("");
    setDescription("");

    navigate(-1);
  };
  return (
    <div>
      <div className="add-title-container">
        <h1 className="title">Edit Cookbook</h1>
      </div>
      <div className="input-container">
        <div>
          <label>Title:</label>
          <input
            type="text"
            placeholder={`${cookbookToEdit.title}`}
            id="title-input"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            placeholder={`${cookbookToEdit.description}`}
            id="title-input"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
      </div>
      <div id="save-button">
        <Button text="Save Changes" onClick={onEditCookbook} />
      </div>
      <div id="cancel-button-container">
        <Button id="cancel-button" text="Cancel" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default EditCookbook;
