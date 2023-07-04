import React, { useEffect, useState } from "react";
import { getStaredPost } from "../axios";

import "../css/MyStars.css";
import StaredPostListener from "./StaredPostListener";
const MyStars = () => {
  let id;
  const [myStaredPosts, setMyStaredPosts] = useState([]);
  useEffect(() => {
    id = JSON.parse(localStorage.getItem("user"))._id;
    getStaredPost(id)
      .then((res) => {
        setMyStaredPosts(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="myStars">
      {myStaredPosts?.map((item, i) => {
        if (item.paylasimId) {
          return <StaredPostListener post={item.paylasimId} key={i} />;
        }
        return null;
      })}
    </div>
  );
};

export default MyStars;
