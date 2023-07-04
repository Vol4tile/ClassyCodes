import React, { useEffect, useRef } from "react";

import QuestionListener2 from "./QuestionListener2";
import { useSelector } from "react-redux";

import Prism from "prismjs";
import { Link } from "react-router-dom";
const Questions = () => {
  const kodRef = useRef();
  const sonucRef = useRef();
  const tutorials = useSelector((state) => state.tutorials);

  let cookie;
  try {
    cookie = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
  }

  useEffect(() => {
    async function write() {
      try {
        kodRef.current.textContent = " ";
        sonucRef.current.textContent = " ";
        let dizim = `
          <div style="color:#27c9be">
          Hoşgeldiniz...
          </div>
          <br/>
          <div style="color:#27c9be">
          Kolay kullanım avantajıyla
          <br/>
          online derleyicimizi deneyebilirsin.
          </div>        
        `;
        for (var i = 0; i < dizim.length; i++) {
          kodRef.current.textContent += dizim.slice(i, i + 1);
          Prism.highlightAll();
          await new Promise((r) => setTimeout(r, 40));
        }
        let sonuc = ` Hoşgeldiniz...

        Kolay kullanım avantajıyla 

        online derleyicimizi deneyebilirsin.
        `;
        sonucRef.current.innerText = sonuc;
        await new Promise((r) => setTimeout(r, 5000));
        write();
      } catch (err) {}
    }
    write();
  }, []);

  return (
    <div
      style={{
        paddingTop: "0vh",
        margin: "0px",
        padding: "0px",
        color: "white",
      }}
    >
      {!cookie && (
        <div
          style={{
            width: "100%",
            height: "92vh",
            backgroundColor: "#0b0c10",
            paddingTop: "100px",
          }}
        >
          <div
            style={{
              margin: " auto",
              width: "700px",
              display: "flex",
              alignItems: "center",
            }}
          >
            ClassyCodes bir geliştirici paylaşım topluluğudur.
          </div>
          <br />
          <div
            style={{
              margin: "auto",
              width: "700px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              Eğer HTML,CSS veya JavaScript kodlarını derlemek istiyorsan{" "}
              <Link to="Editor" style={{ width: "150px" }}>
                Online Editör
              </Link>
              'ümüze bir göz atabilirsin.{" "}
            </div>
          </div>
          <br />
          <div
            style={{
              margin: "auto",
              width: "700px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Soru sormak, yorum yapmak veya kodlarını başkalarıyla paylaşmak için
            &#160; <Link to="Login"> Giriş Yap</Link>{" "}
          </div>
          <br />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "1100px",
              margin: "auto",
            }}
          >
            <div
              style={{ width: "500px", height: "300px", textAlign: "center" }}
            >
              <div>Kod</div>
              <pre
                style={{
                  height: "300px",
                  width: "500px",
                  backgroundColor: "#1F2833",
                  textAlign: "left",
                  paddingLeft: "15px",
                  fontSize: "15px",
                  marginTop: "0",
                  overflow: "hidden",
                }}
              >
                <code
                  className=" language-html "
                  style={{ height: "300px", margin: "0", padding: "0" }}
                  ref={kodRef}
                ></code>
              </pre>
            </div>
            <div
              style={{
                width: "500px",
                height: "300px",
                textAlign: "center",
              }}
            >
              <div>Çıktı</div>
              <div
                ref={sonucRef}
                style={{
                  height: "300px",
                  width: "500px",
                  backgroundColor: "#1F2833",
                  color: "#27c9be",
                  paddingTop: "60px",
                }}
              ></div>
            </div>
          </div>
          <br />

          <div
            style={{
              margin: "auto",
              width: "700px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Hala aramıza katılmadın mı ? &#160; <Link to="Kaydol"> Kaydol</Link>{" "}
          </div>
        </div>
      )}
      {tutorials.map((post, index) => (
        <QuestionListener2 post={post} key={index} />
      ))}
    </div>
  );
};

export default Questions;
