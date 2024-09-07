import React from "react";
import "./PostDetails.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
  const location = useLocation();
  const { content, id, updated_at, title, author } = location.state;
  const navigate = useNavigate();

  const data = { content, title, message: "Edit Post", createPost: false,id };

  const handleDelete = async () => {
    await axios.delete(`/api/posts/${id}`);
    navigate("/home");
  };
  return (
    <div id="post-details-container">
      <div id="options">
        <button className="option-button">
          <i className="fa-solid fa-pen-to-square"></i>
          <Link state={data} to={`/${id}`}>
            Edit
          </Link>
        </button>
        <button className="option-button" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>Delete
        </button>
      </div>
      <div id="post-title">
        <h1>{title}</h1>
      </div>
      <span>{updated_at}</span>
      <div id="post-details">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        <span>{author}</span>
      </div>
    </div>
  );
};

export default PostDetails;
