import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import { getStar } from "../axios";
import { deletePost } from "../axios";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { updateQuestion } from "../axios/index";
import "../css/Post.css";
import "../css/CreateQuestion.css";
const AccountListener = ({ item, i, username }) => {
  var kulId;
  const postRef = useRef();
  const updateRef = useRef();
  const formRef = useRef();
  const baslikRef = useRef();
  const yaziRef = useRef();
  let kulUsername = "";
  try {
    kulId = localStorage.getItem("user")._id;
    kulUsername = JSON.parse(localStorage.getItem("user"));
    Prism.highlightAll();
  } catch (err) {}
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  const [star, setStar] = useState([]);

  useEffect(() => {
    setFormData();

    getStar(item._id).then((data) => {
      setStar(data);
    });

    Prism.highlightAll();
  }, []);

  const deleteHandler = async () => {
    try {
      if (
        window.confirm(
          "Bu gönderi silinmek üzere, devam etmek istiyor musunuz?"
        )
      ) {
        const res = deletePost(item._id, kulId).then((data) => {
          if (data.status === 200) {
            postRef.current.remove();
          }
        });
      }
    } catch (err) {}
  };
  const updateHandler = async () => {
    updateRef.current.style.display = "none";
    formRef.current.style.display = "block";
  };
  const [formData, setFormData] = useState({
    baslik: item.baslik,
    yazi: item.yazi,
    id: item._id,
  });
  const [buttonText, setButtonText] = useState("Paylaş");
  const [status, setStatus] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    try {
      setToken(JSON.parse(localStorage.getItem("token")));
      setFormData({
        ...formData,
        postedBy: JSON.parse(localStorage.getItem("user"))._id,
      });
    } catch (err) {}
  }, []);

  function parser(item) {
    item = item.replaceAll(
      "<pre",
      '<pre><code class="language-clike" style=" white-space: pre-line; "'
    );
    item = item.replaceAll("</pre>", "</code></pre>");
    item = parse(item);
    return item;
  }
  function parser2(item) {
    item = item.replaceAll(
      "<pre",
      '<pre><code class="language-clike" style=" white-space: pre-line; "'
    );
    item = item.replaceAll("</pre>", "</code></pre>");
    item = item;
    return item;
  }
  return (
    <div ref={postRef}>
      <div
        ref={updateRef}
        key={i}
        style={{
          position: "relative",
          backgroundColor: "#45a29e",
          width: "60%",
          margin: "0 auto",
          height: "auto",
          marginBottom: "10px",
          border: "3px solid #45a29e",
          borderRadius: "5px",
        }}
      >
        {kulUsername.username != null && kulUsername.username == username && (
          <div
            style={{
              position: "absolute",
              right: "0",
              color: "#3cfdf0",
              display: "flex",
              paddingRight: "5px",
            }}
          >
            <div
              className="deleteButton"
              onClick={updateHandler}
              style={{ paddingRight: "5px" }}
            >
              Düzenle
            </div>
            <div className="deleteButton" onClick={deleteHandler}>
              Sil
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#0b0c10",
          }}
          ref={baslikRef}
        >
          {item.baslik}
        </div>
        <div
          className="postYazi"
          style={{
            color: "#c5c6c7",
            backgroundColor: "#1f2833",
            padding: "10px 10px 0px 10px",
            width: "100%",
            border: "none",
            maxHeight: "800px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          ref={yaziRef}
        >
          {parser(item.yazi)}
        </div>
        {star && star.data && <span>{star.data.length} Kişi beğendi.</span>}

        <div
          style={{
            width: "100%",
            direction: "ltr",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {formatDate(item.start)}{" "}
          <Link className="linkclass" to={"../Question/" + item._id}>
            {" "}
            Yorumları gör
          </Link>
        </div>
      </div>

      {kulUsername && (
        <form
          ref={formRef}
          style={{
            width: "60vw",
            margin: "auto",
            display: "none",
            marginBottom: "50px",
          }}
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            setButtonText("Paylaşılıyor...");

            updateQuestion(formData, token)
              .then((res) => {
                baslikRef.current.innerText = formData.baslik;
                yaziRef.current.innerHTML = parser2(formData.yazi);
                updateRef.current.style.display = "block";
                formRef.current.style.display = "none";
                Prism.highlightAll();
                if (res.status === "200") {
                  setStatus(1);
                  setTimeout(() => {
                    setStatus(null);
                  }, 1500);
                } else {
                  setStatus(1);
                  setTimeout(() => {
                    setStatus(null);
                  }, 1500);
                }
                setButtonText("Paylaş");
              })
              .catch((error) => {
                setButtonText("Paylaş");
                setStatus(0);
                setTimeout(() => {
                  setStatus(null);
                }, 1500);
              });
            Prism.highlightAll();
          }}
        >
          <Form.Control
            value={formData.baslik}
            onChange={(e) =>
              setFormData({ ...formData, baslik: e.target.value })
            }
            size="lg"
            type="text"
            placeholder="Başlık"
            style={{
              margin: "10px 0px 2px 0px",
              borderRadius: "5px",
              fontSize: "15px",
            }}
          />

          <br />
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            style={{
              width: "100%",
              margin: "auto",
              marginBottom: "0px",
              color: "1f2833",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            value={formData.yazi}
            onChange={(e) => {
              setFormData({
                ...formData,
                yazi: e,
              });
            }}
          />
          <Button
            variant="primary"
            className="createQuestionButton"
            onClick={() => {
              updateRef.current.style.display = "block";
              formRef.current.style.display = "none";
            }}
            style={{
              backgroundColor: "#45a29e",
              float: "left",
              marginTop: "0vh",
              width: "15vw",
              borderRadius: "5px",
            }}
          >
            Vazgeç
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="createQuestionButton"
            style={{
              backgroundColor: "#45a29e",
              float: "right",
              marginTop: "0vh",
              width: "15vw",
              borderRadius: "5px",
            }}
          >
            Tamamla
          </Button>
        </form>
      )}
    </div>
  );
};
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
    ["code-block"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block",
];

export default AccountListener;
