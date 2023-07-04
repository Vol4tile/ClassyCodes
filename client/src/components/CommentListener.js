import React, { useEffect } from "react";
import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
const CommentListener = ({ post }) => {
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  
  post.yorum = post.yorum.replaceAll(
    "<pre",
    '<pre><code class="language-clike" style=" white-space: pre-line; "'
  );
  post.yorum = post.yorum.replaceAll("</pre>", "</code></pre>");

  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        border: "2px solid #66fcf1",
        marginBottom: "5px",
        padding: "15px",
        height: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          <img
            src={require(`../../../server/uploads/${post.paylasanId.photo}`)}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          ></img>{" "}
          {post.paylasanId.fullname}
        </div>
        <div>{formatDate(post.createDate)}</div>
      </div>
      <div style={{ backgroundColor: "black" }}>{parse(post.yorum)}</div>
    </div>
  );
};

export default CommentListener;
