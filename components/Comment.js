import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

/* eslint-disable jsx-a11y/alt-text */
export default function Comment({
  comment,
  deleteComment,
  handleEditChange,
  handleSetEditCommentId,
  handleEditSubmit,
}) {
  const { user, userPhoto, text, userId, id } = comment;
  const { user: userData } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);

  function toggleEditMode() {
    if (editMode) {
      setEditMode((prev) => !prev);
      return;
    }
    setEditMode((prev) => !prev);
    handleSetEditCommentId(id);
  }

  function saveChanges() {
    handleEditSubmit();
    setEditMode((prev) => !prev);
  }

  if (!userData) return <h1>loading user data...</h1>;
  return (
    <div className="border p-2">
      {/* <Image width={40} height={40} src={userPhoto} alt="user avatar" /> */}
      <div>
        {!editMode && (
          <div>
            <p>{user}</p>
            <p>{text}</p>
          </div>
        )}
        {editMode && (
          <div>
            <p>{user}</p>
            <textarea
              onChange={(e) => handleEditChange(e.target.value)}
              className="w-full border p-2"
            >
              {text}
            </textarea>
            <Button
              text="Save changes"
              type="primary"
              size="sm"
              onClick={saveChanges}
            />
          </div>
        )}
        {userId === userData.uid && (
          <div className="flex space-x-4 pt-2">
            <button
              className="fa fa-trash"
              onClick={() => deleteComment(id)}
            ></button>
            <button className="fa fa-edit" onClick={toggleEditMode}></button>
          </div>
        )}
      </div>
    </div>
  );
}
