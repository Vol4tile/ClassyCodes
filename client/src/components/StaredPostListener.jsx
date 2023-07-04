import React from "react";

import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { getStar, toggleStar } from "../axios";
import starLogo from "../assets/starLogo.png";

import { useState } from "react";
const StaredPostListener = ({ post, i }) => {
  post.yazi = post.yazi.replaceAll(
    "<pre",
    '<pre><code class="language-clike" style=" white-space: pre-line; "'
  );
  post.yazi = post.yazi.replaceAll("</pre>", "</code></pre>");

  const [star, setStar] = useState([]);

  var token;
  if (JSON.parse(localStorage.getItem("token"))) {
    token = JSON.parse(localStorage.getItem("token"));
  }

  var kullaniciId;
  if (JSON.parse(localStorage.getItem("user"))) {
    kullaniciId = JSON.parse(localStorage.getItem("user")).username;
  }
  const begeniYazisi = useRef();
  const begeniSayisi = useRef();
  const begeniText = useRef();
  if (begeniText.current != undefined) {
  }

  useEffect(() => {
    getStar(post._id)
      .then((data) => {
        setStar(data);
      })
      .catch();
    Prism.highlightAll();
  }, []);
  let sayac = 0;
  useEffect(() => {
    Prism.highlightAll();
  }, [star]);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };

    return new Date(string).toLocaleDateString([], options);
  }

  function formatHours(string) {
    var hours = string.slice(11, 16);
    var convert = hours.slice(0, 2);
    convert = parseInt(convert);
    convert += 3;
    var time = hours.slice(2, 5);
    var sonuc = convert + time;

    return sonuc;
  }
  return (
    <>
      <div
        key={i}
        style={{
          backgroundColor: "#45a29e",
          width: "100%",
          margin: "0 auto",
          height: "auto",
          marginTop: "10px",

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
          {post.baslik}
        </div>
        <div>
          <div
            className="postYazi"
            style={{
              color: "#c5c6c7",
              backgroundColor: "#1f2833",
              padding: "10px 5px 1px 5px",
              width: "100%",
              border: "none",
              maxHeight: "800px",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {parse(post.yazi)}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div>
              {formatDate(post.start)} {formatHours(post.start)}
            </div>
          </div>
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
            <div>
              {" "}
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
                      begeniText.current.innerText = "Beğeni geri alındı";
                      begeniSayisi.current.innerText -= 1;
                    } else if (begeniText.current.innerText == "") {
                      begeniText.current.innerText = "Beğendin";
                      var sayi = begeniSayisi.current.innerText;
                      begeniSayisi.current.innerText = parseInt(sayi) + 1;
                    } else if (
                      begeniText.current.innerText == "Beğeni geri alındı"
                    ) {
                      begeniText.current.innerText = "Beğendin";
                      sayi = begeniSayisi.current.innerText;
                      begeniSayisi.current.innerText = parseInt(sayi) + 1;
                    }
                  }

                  toggleStar(post._id, token).then(() => {});
                }}
              ></img>
              {star && star.data != undefined && (
                <span ref={begeniSayisi}>{star.data.length}</span>
              )}
              {star &&
                star.data != undefined &&
                kullaniciId &&
                star.data.map((data) => {
                  if (data.starBy.username === kullaniciId && sayac == 0) {
                    sayac++;
                  }
                })}
              {sayac > 0 ? (
                <span ref={begeniText} style={{ marginLeft: "10px" }}>
                  Beğendin
                </span>
              ) : (
                <span ref={begeniText} style={{ marginLeft: "10px" }}></span>
              )}
            </div>
          </div>
          <div>
            {" "}
            <Link className="linkclass" to={"../Question/" + post._id}>
              {" "}
              Yorumları gör
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaredPostListener;
