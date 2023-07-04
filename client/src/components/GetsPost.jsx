import React, { useState, useEffect, Fragment } from "react";
import { GetPost } from "../axios";
import { PostListener } from "./PostListener";
export const GetPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    GetPost()
      .then((res) => {
        setPosts(res.data.post);
      })
      .catch((error) => {});
  }, []);

  return (
    <div style={{ marginTop: "8vh" }}>
      {posts.map((post, index) => (
        <PostListener post={post} key={index} />
      ))}
    </div>
  );
};
