import Image from "next/image";
import { useAuth } from "../context/AuthContext";

/* eslint-disable jsx-a11y/alt-text */
export default function Comment({ comment, deleteComment }) {
  const { user, userPhoto, text, userId, id } = comment;
  const { user: userData } = useAuth();
  if (!userData) return <h1>loading user data...</h1>;
  return (
    <div className="border p-2">
      {/* <Image width={40} height={40} src={userPhoto} alt="user avatar" /> */}
      <div>
        <p>{user}</p>
        <p>{text}</p>
        {userId === userData.uid && (
          <button
            className="fa fa-trash"
            onClick={() => deleteComment(id)}
          ></button>
        )}
      </div>
    </div>
  );
}
