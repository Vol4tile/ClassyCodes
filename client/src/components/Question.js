import React, { useEffect, useState } from "react";
import "../css/Account.css";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { GetComment, GetQuestion } from "../axios";
import parse from "html-react-parser";
import Prism from "prismjs";
import { Button } from "react-bootstrap";
import "prismjs/themes/prism-tomorrow.css";
import CommentListener from "./CommentListener";
import { useRef } from "react";
import { getStar, toggleStar } from "../axios";
import { AddComment } from "../axios";
import starLogo from "../assets/starLogo.png";
const Question = () => {
  const { questionId } = useParams();
  const [formData, setFormData] = useState({
    id: questionId,
    yorum: "",
  });
  var kullaniciId;
  var fullname;
  var photo;
  const [buttonText, setButtonText] = useState("Yorum yap");
  if (JSON.parse(localStorage.getItem("user"))) {
    kullaniciId = JSON.parse(localStorage.getItem("user")).username;
    fullname = JSON.parse(localStorage.getItem("user")).fullname;
    photo = JSON.parse(localStorage.getItem("user")).photo;
  }
  let sayac = 0;
  var token = JSON.parse(localStorage.getItem("token"));
  const [commentData, setCommentData] = useState([]);
  const [postData, setPostData] = useState();
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  const [star, setStar] = useState([]);

  const begeniYazisi = useRef();
  const begeniSayisi = useRef();
  const begeniText = useRef();

  useEffect(() => {
    getStar(questionId)
      .then((data) => {
        setStar(data);
      })
      .catch();
    Prism.highlightAll();
  }, [questionId]);
  useEffect(() => {
    setFormData({ ...formData, token: token });
    GetQuestion({ questionId })
      .then((res) => {
        res.data.yazi = res.data.yazi.replaceAll(
          "<pre",
          '<pre><code class="language-clike" style=" white-space: pre-line; "'
        );
        res.data.yazi = res.data.yazi.replaceAll("</pre>", "</code></pre>");
        setPostData(res.data);
      })
      .catch((error) => {});
    GetComment({ questionId }).then((res) => {
      setCommentData(res.data.yorumlar);
    });

    Prism.highlightAll();
  }, [questionId]);

  useEffect(() => {
    Prism.highlightAll();
  }, [postData]);
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <div className="Account">
        <div
          style={{
            width: "100%",
            height: "100%",
            color: "#c5c6c7",
            backgroundColor: "#1f2833",
          }}
        >
          {postData && (
            <div
              style={{
                position: "fixed",
                top: "10%",
                left: "0px",
                border: "3px solid #66fcf1",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <img
                src={require(`../../../server/uploads/${postData.postedBy.photo}`)}
                alt="ProfilePhoto"
                style={{
                  maxHeight: "100px",
                  maxWidth: "100px",
                  height: "75px",
                  width: "auto",
                  borderRadius: "50%",
                }}
              />
              <span></span>
              {postData.postedBy.fullname}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <div>
                  {" "}
                  Kayıt Tarihi :{formatDate(postData.postedBy.createDate)}
                </div>
              </span>
            </div>
          )}

          <div style={{ width: "100%", height: "100%" }}>
            {postData && (
              <div>
                <div
                  style={{
                    backgroundColor: "#45a29e",
                    width: "60%",
                    margin: "0 auto",
                    height: "auto",
                    marginBottom: "10px",
                    border: "3px solid #45a29e",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#0b0c10",
                    }}
                  >
                    {postData.baslik}
                  </div>
                  <div
                    style={{
                      color: "#c5c6c7",
                      backgroundColor: "#1f2833",
                      padding: "10px 10px 0px 10px",
                      width: "100%",
                      border: "none",
                      maxHeight: "5000px",
                    }}
                  >
                    {parse(postData.yazi)}
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <img
                        src={starLogo}
                        className="begeniLogo"
                        style={{ height: "50px", width: "50px" }}
                        ref={begeniYazisi}
                        onClick={(e) => {
                          e.target.style.transition = "500ms";
                          setTimeout(() => {
                            e.target.style.height = "70px";
                            e.target.style.width = "70px";
                          }, 0);

                          setTimeout(() => {
                            e.target.style.height = "50px";
                            e.target.style.width = "50px";
                          }, 500);
                          if (begeniText.current != undefined) {
                            if (begeniText.current.innerText == "Beğendin") {
                              begeniText.current.innerText =
                                "Beğeni geri alındı";
                              begeniSayisi.current.innerText -= 1;
                            } else if (begeniText.current.innerText == "") {
                              begeniText.current.innerText = "Beğendin";
                              var sayi = begeniSayisi.current.innerText;
                              begeniSayisi.current.innerText =
                                parseInt(sayi) + 1;
                            } else if (
                              begeniText.current.innerText ==
                              "Beğeni geri alındı"
                            ) {
                              begeniText.current.innerText = "Beğendin";
                              var sayi = begeniSayisi.current.innerText;
                              begeniSayisi.current.innerText =
                                parseInt(sayi) + 1;
                            }
                          }

                          toggleStar(questionId, token).then(() => {});
                        }}
                      ></img>
                      {star && star.data != undefined && (
                        <span ref={begeniSayisi}>{star.data.length}</span>
                      )}
                      {star &&
                        star.data != undefined &&
                        kullaniciId &&
                        star.data.map((data) => {
                          if (
                            data.starBy.username === kullaniciId &&
                            sayac == 0
                          ) {
                            sayac++;
                          }
                        })}
                      {sayac > 0 ? (
                        <span ref={begeniText} style={{ marginLeft: "10px" }}>
                          Beğendin
                        </span>
                      ) : (
                        <span
                          ref={begeniText}
                          style={{ marginLeft: "10px" }}
                        ></span>
                      )}
                    </div>
                    {formatDate(postData.start)}{" "}
                  </div>
                </div>
                <div
                  className="yorumEkle"
                  style={{ width: "60%", height: "auto", margin: "auto" }}
                >
                  <ReactQuill
                    theme="snow"
                    placeholder="Bir şeyler yaz..."
                    modules={modules}
                    formats={formats}
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginBottom: "0px",
                      color: "#1f2833",
                      backgroundColor: "#c5c6c7",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => {
                      setFormData({ ...formData, yorum: e });
                    }}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="createQuestionButton"
                    style={{
                      backgroundColor: "#45a29e",
                      float: "right",
                      marginTop: "2px",
                      width: "15vw",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      setButtonText("Yorum gönderiliyor.");
                      AddComment(formData, token).then((res) => {
                        if (res.status == 200) {
                          setButtonText("Yorum gönderildi");
                          var yorum = {
                            createDate: Date.now(),
                            paylasanId: {
                              fullname,
                              photo,
                            },
                            yorum: formData.yorum,
                          };
                          Prism.highlightAll();

                          setCommentData((current) => [...current, yorum]);
                          setInterval(() => {
                            setButtonText("Yorum yap");
                          }, 2500);
                        }
                      });
                    }}
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>
            )}{" "}
            <div
              className="yorumlar"
              style={{
                width: "60%",
                backgroundColor: "",
                margin: "auto",
                marginTop: "50px",
              }}
            >
              {commentData &&
                commentData.map((post, index) => (
                  <CommentListener post={post} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;

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
