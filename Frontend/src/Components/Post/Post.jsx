import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown support
import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({ id, title, content,author, updated_at }) => {
  // const now = new Date();
  // format(now, "MMMM d, yyyy h:mm:ss a")
  const data = { id, title, content, updated_at,author };

  return (
    <div id="post">
      <div>
        <h1 style={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {title}
        </h1>
        <span>{updated_at}</span>
      </div>
      <div id="info">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
      <span>{author}</span>
      <Link id="post-link" state={data} to={`/posts/${id}`}>
        Read More
      </Link>
    </div>
  );
};

export default Post;
