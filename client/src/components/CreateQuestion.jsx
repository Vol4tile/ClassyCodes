import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { CreateQuestioner } from "../axios/index";
import "../css/Post.css";

import "prismjs/themes/prism-tomorrow.css";
import "../css/CreateQuestion.css";
const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    baslik: "",
    yazi: "Birşey yaz",
    postedBy: "",
  });
  const [buttonText, setButtonText] = useState("Paylaş");
  const [status, setStatus] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    setFormData({
      ...formData,
      postedBy: JSON.parse(localStorage.getItem("user"))._id,
    });
  }, []);
  return (
    <div style={{ marginTop: "10vh" }} className="createQuestion">
      <br />

      {status === 1 && (
        <div style={{ color: "#66fcf1", margin: "0 auto", width: "200px" }}>
          {" "}
          İşlem Başarılı{" "}
        </div>
      )}
      {status === 0 && (
        <div style={{ color: "red", margin: "0 auto", width: "200px" }}>
          İşlem Başarısız.
        </div>
      )}
      <br />
      <form
        style={{ width: "70vw", marginLeft: "15vw" }}
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          setButtonText("Paylaşılıyor...");

          CreateQuestioner(formData, token)
            .then((res) => {
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
        }}
      >
        <Form.Control
          onChange={(e) => setFormData({ ...formData, baslik: e.target.value })}
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
          onChange={(e) => {
            setFormData({
              ...formData,
              yazi: e,
            });
          }}
        />

        <Button
          variant="primary"
          type="submit"
          className="createQuestionButton"
          style={{
            backgroundColor: "#45a29e",
            float: "right",
            marginTop: "1vh",
            width: "15vw",
            borderRadius: "5px",
          }}
        >
          {buttonText}
        </Button>
      </form>
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

export default CreateQuestion;
