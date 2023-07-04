import React, { useEffect, useRef, useState } from "react";
import "../css/Account.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { follow, GetUserData, GetUserQuestions, unfollow } from "../axios";
import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import AccountListener from "./AccountListener";
import updateProfile from "../assets/updateProfile2.png";
import close from "../assets/close.png";
import finish from "../assets/finish.png";
import Form from "react-bootstrap/Form";
import { updateUsername } from "../axios";
const Account = () => {
  let myUsername = "";
  let token = 0;
  let myId = "";
  try {
    myUsername = JSON.parse(localStorage.getItem("user")).username;
    myId = JSON.parse(localStorage.getItem("user"))._id;
    token = JSON.parse(localStorage.getItem("token"));
  } catch (err) {}
  const [updateAccount, setUpdateAccount] = useState(0);
  const { username } = useParams();
  const [userData, setUserData] = useState();
  const [newUsername, setNewUsername] = useState();
  const [postData, setPostData] = useState([]);
  const [followed, setFollowed] = useState(1);
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  const handleFollow = () => {
    follow(myId, username).then((res) => {
      setFollowed(!followed);

      followRef.current.textContent = followRef.current.textContent - 1 + 2;
    });
  };
  const handleUnfollow = () => {
    unfollow(myId, username).then((res) => {
      setFollowed(!followed);

      followRef.current.textContent -= Number(1);
    });
  };
  const followRef = useRef();
  useEffect(() => {
    GetUserData({ username })
      .then((res) => {
        setUserData(res.data.user);

        if (res.data.user.followers.includes(myId)) {
          setFollowed(0);
        } else {
          setFollowed(1);
        }
      })
      .catch((error) => {});
    GetUserQuestions({ username })
      .then((res) => {
        setPostData(res.data.post);
      })
      .catch((error) => {});

    Prism.highlightAll();
  }, [username]);

  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <div className="Account">
      <div
        style={{
          width: "100%",
          height: "100%",
          color: "#c5c6c7",
          backgroundColor: "#1f2833",
        }}
      >
        {userData && (
          <div
            style={{
              position: "fixed",
              top: "10%",
              left: "0px",
              border: "5px solid #66fcf1",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <img
              src={require(`../../../server/uploads/${userData.photo}`)}
              style={{
                maxHeight: "100px",
                maxWidth: "100px",
                height: "75px",
                width: "auto",
                borderRadius: "50%",
                marginRight: "5px",
                marginBottom: "5px",
              }}
              alt="userProfile"
            />
            {userData.fullname}
            {myUsername == username && updateAccount == 0 && (
              <span>
                <img
                  style={{
                    width: "32px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUpdateAccount(1);
                  }}
                  src={updateProfile}
                  alt="update"
                ></img>
              </span>
            )}
            {updateAccount === 1 && (
              <span style={{ width: "10px" }}>
                <Form.Control
                  type="text"
                  placeholder="yeni kullanıcı adı"
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                  }}
                />
                <img
                  style={{
                    width: "32px",
                    marginLeft: "10px",
                    backgroundColor: "#66fcf1",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (newUsername.length > 0) {
                      updateUsername(username, newUsername, token).then(() => {
                        setUserData({ ...userData, fullname: newUsername });
                        setUpdateAccount(0);
                      });
                    }
                  }}
                  alt="finishUpdate"
                  src={finish}
                ></img>
                <img
                  style={{
                    width: "32px",
                    marginLeft: "10px",
                    backgroundColor: "#45a29e",
                    borderRadius: "50%",
                    float: "right",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUpdateAccount(0);
                  }}
                  alt="closeUpdate"
                  src={close}
                ></img>
              </span>
            )}
            <br></br>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {" "}
              Kayıt Tarihi :<br></br>
              {formatDate(userData.createDate)}
            </span>
            {myUsername != username && followed == 1 && (
              <button className=" button" onClick={handleFollow}>
                Takip et
              </button>
            )}
            {myUsername != username && !followed == 1 && (
              <button className=" button" onClick={handleUnfollow}>
                Takipten Çık
              </button>
            )}
            <div>
              Takipçi Sayısı :{" "}
              <span ref={followRef}>{userData.followers.length}</span>
            </div>
            Takip Edilen:{userData.followings.length}
          </div>
        )}

        <div style={{ width: "100%", height: "100%" }}>
          {postData?.map((item, i) => {
            /*  item.yazi = item.yazi.replaceAll(
              "<pre",
              '<pre><code class="language-clike" style=" white-space: pre-line; "'
            );
            item.yazi = item.yazi.replaceAll("</pre>", "</code></pre>"); */

            return <AccountListener item={item} key={i} username={username} />;
          })}{" "}
        </div>
      </div>
    </div>
  );
};

export default Account;
