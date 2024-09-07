import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./PostEditor.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const mdParser = new MarkdownIt();

const PostEditor = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const [content, setContent] = useState(location.state.content);
  const [title, setTitle] = useState(location.state.title);
  const [author, setAuthor] = useState("TPO");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.length || !author.length || !content.length) {
      return;
    }
    const mdData = `
          ---
          title: ${title}
          Author: ${author}
          ---
          ${content}
          `;
    const csrfToken = await axios
      .get("api/csrf-token")
      .then((res) => res.data.csrf_token);
    let response = {};
    if (location.state.createPost) {
      response = await axios.post("api/posts", {
        content: mdData,
        _token: csrfToken,
      });
    } else {
      response = await axios.put(`api/posts/${location.state.id}`, {
        content: mdData,
        _token: csrfToken,
      });
      navigate(`/home`)
    }

    if (response.data.success === "true") {
      setTitle("");
      setAuthor("TPO");
      setContent("");
    } 
  };

  return (
    <form method="" id="form" onSubmit={handleSubmit}>
      <h1>{location.state.message}</h1>
      <div className="input-div">
        <label>Post Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-div">
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="input-div">
        <label>Content</label>
        <MdEditor
          value={content}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setContent(text)}
        />
      </div>
      <button type="submit">{location.state.message}</button>
    </form>
  );
};

export default PostEditor;
