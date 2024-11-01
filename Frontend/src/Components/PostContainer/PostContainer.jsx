import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./PostContainer.css";
import axios from "axios";
import { format } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader.jsx";

const PostContainer = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMore = async () => {
    setLoading(true);
    axios
      .get(`api/posts?page=${page}`)
      .then((res) => {
        console.log(res);
        const posts = res.data.data.map((post) => {
          const parts = post.content.split("---").map((part) => part.trim());
          const metaDataString = (parts[1] || "").trim();
          const contentString = (parts[2] || "").trim();

          const metadata = {};
          metaDataString.split("\n").forEach((line) => {
            const [key, value] = line.split(":").map((str) => str.trim());
            if (key && value) metadata[key] = value;
          });
          return { ...post, metadata, contentString };
        });
        console.log(posts);
        setData((prev) => [...prev, ...posts]);
        setHasMore(page < res.data.last_page);
        setPage((prev) => prev + 1);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <div id="post-container">
      <h1>Welcome 😊</h1>
      
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
              <p style={{ textAlign: "center" }}>No more posts to display.</p>
            }
          >
            {data.map(({ metadata, id, contentString, updated_at }) => {
              return (
                <Post
                  key={id}
                  id={id}
                  title={metadata.title}
                  author={metadata.Author}
                  content={contentString}
                  updated_at={format(updated_at, "MMMM d, yyyy h:mm:ss a")}
                />
              );
            })}
          </InfiniteScroll>
        
    </div>
  );
};

export default PostContainer;
