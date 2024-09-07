import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./PostContainer.css";
import axios from "axios";
import { format } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader.jsx";

const PostContainer = () => {
  const [data, setData] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("api/posts").then((res) => {
      const posts = res.data.map((post) => {
        const parts = post.content.split("---").map((part) => part.trim());
        const metaDataString = (parts[1]|| "").trim() ;
        const contentString = (parts[2] || "").trim() ;

        const metadata = {};
        metaDataString.split("\n").forEach((line) => {
          const [key, value] = line.split(":").map((str) => str.trim());
          if (key && value) metadata[key] = value;
        });
        return { ...post, metadata, contentString };
      });
      setData(posts);
      setLoading(false);

      if (posts.length <= 2) {
        setHasMore(false);
      }
    });
  }, []);

  const fetchMoreData = () => {
    if (visiblePosts >= data.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setVisiblePosts((prev) => prev + 2);
    }, 1000);
  };

  return (
    <div id="post-container">
      {loading ? (
        <Loader />
      ) : (
        <>
        <InfiniteScroll
          dataLength={visiblePosts}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            <p style={{ textAlign: "center" }}>No more posts to display.</p>
          }
        >
          {data
            .slice(0, visiblePosts)
            .map(({ metadata, id, contentString, updated_at }) => {
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
        </>
      )}
    </div>
  );
};

export default PostContainer;
