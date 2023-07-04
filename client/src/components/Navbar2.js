import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
import "../css/Navbar.css";
import Logo from "../assets/search.svg";
import Loading from "../assets/refresh.png";
import { useDispatch } from "react-redux";
import { Logout } from "../actions/userData/user";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { SearchUser } from "../axios";
const Navbars = () => {
  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
  }

  const [searchData, setSearchData] = useState({ search: "" });
  const [username, setUserName] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [visibility, setVisibility] = useState(0);
  const [loadingGif, setLoadingGif] = useState(0);
  const [searchComplateData, setSearchComplateData] = useState([]);
  const [temp, setTemp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logoutClick = () => {
    dispatch(Logout());
    navigate("/Login");
  };

  useEffect(() => {}, [temp]);

  const searchHandler = (e) => {
    setSearchData({ ...searchData, search: e.target.value });
    setSearchComplateData([]);
    setLoadingGif(1);
  };
  useEffect(() => {
    function fonksiyon() {
      if (visibility && localStorage.getItem("search") != undefined) {
        var x = JSON.parse(localStorage.getItem("search"));
        setSearchComplateData(x);
      }
    }
    fonksiyon();
  }, [visibility]);
  useEffect(() => {
    if (searchData.search.length < 1) {
      setLoadingGif(0);
    }

    if (searchData.search.length >= 1) {
      var node = mySearchLogo.current;
      node.classList.remove("rotating");
      SearchUser(searchData)
        .then((res) => {
          setLoadingGif(0);

          setSearchComplateData(res.data.user);

          localStorage.setItem("search", JSON.stringify(res.data.user));

          node.classList.remove("rotating");
          node.classList.add("rotating");
        })
        .catch((err) => {});
    } else {
      if (!visibility) {
        setSearchComplateData([]);
      }
    }
  }, [searchData]);
  useEffect(() => {
    if (userData) {
      setUserName(userData.username);

      setProfilePhoto(userData.photo);
    }
  }, [userData]);
  const myRef = useRef();
  const mySearchLogo = useRef();
  const searchText = useRef();
  const loadingRef = useRef();

  const handleClickOutside = (e) => {
    if (
      e.target != null &&
      myRef.current != null &&
      !myRef.current.contains(e.target) &&
      searchText.current != null &&
      !searchText.current.contains(e.target) &&
      mySearchLogo.current != null &&
      !mySearchLogo.current.contains(e.target)
    ) {
      setVisibility(false);
      mySearchLogo.current.style.transform = `rotate(0deg)`;
      setTemp(searchData.search);
      setSearchData({ ...searchData, search: "" });
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="ustTaraf">
      <div className="companyName" style={{ width: "35vw" }}>
        <NavLink to="/">KSG</NavLink>
      </div>
      <div
        className="searchBar"
        onClick={() => {
          setVisibility(1);
          if (temp.length > 0) {
            setSearchData({ ...searchData, search: temp });
          }
          mySearchLogo.current.style.transition = `100ms`;
          mySearchLogo.current.style.transform = `rotate(190deg)`;
        }}
        style={{ width: "30vw", height: "auto" }}
      >
        <div className="search" onFocus={() => {}}>
          <form style={{ position: "relative" }}>
            <input
              type="text"
              placeholder=" Ara..."
              name="search"
              onChange={searchHandler}
              autoComplete="off"
              value={searchData.search}
              ref={searchText}
              style={{ width: "30vw", maxWidth: "400px", paddingRight: "45px" }}
            ></input>
            <img
              style={{
                position: "absolute",
                height: "25px",
                width: "25px",
                right: "10px",
              }}
              alt="SearchLogo"
              src={Logo}
              ref={mySearchLogo}
            />
          </form>
          <div>
            {visibility === 1 ? (
              <div
                style={{
                  zIndex: "99",
                  position: "absolute",
                  top: "4vh",
                  left: "-4vw",
                  backgroundColor: "black",
                  width: "33vw",
                  color: "white",
                  minHeight: "400px",
                  maxHeight: "800px",

                  height: "auto",
                  borderRadius: "5px",
                  visibility: "auto",
                  wordW: "break-word",
                  overflowX: "auto",
                }}
                ref={myRef}
              >
                {loadingGif === 1 && searchComplateData && (
                  <img
                    style={{
                      height: "30px",
                      width: "30px",
                      position: "relative",
                      top: "175px",
                    }}
                    ref={loadingRef}
                    className="rotate spinner"
                    src={Loading}
                    alt="loading"
                  ></img>
                )}
                {searchComplateData.map((data, key) => {
                  return (
                    <Link key={key} to={"Account/" + data.username}>
                      <div style={{ border: "1px solid #1c1c1c" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {data.photo && (
                            <img
                              style={{
                                maxHeight: "64px",
                                maxWidth: "64px",
                                borderRadius: "50%",
                              }}
                              src={require(`../../../server/uploads/${data.photo}`)}
                              alt="ProfilePhoto"
                            ></img>
                          )}
                          <div style={{ display: "block" }}>
                            <div> {data.fullname}</div>@{data.username}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "33vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>{userData && <NavLink to="/CreateQuestion">Paylaş</NavLink>}</div>
        <div style={{ marginLeft: "7px" }}>
          <NavLink to="/Editor"> Editor</NavLink>
        </div>

        {userData != null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
            }}
          >
            <ul style={{ height: "8vh" }}>
              <li
                style={{
                  width: "200px",
                  height: "70%",
                  cursor: "pointer",
                  marginTop: "2.4vh",
                }}
              >
                {" "}
                {username}
                {profilePhoto && (
                  <img
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",
                      borderRadius: "50%",
                      marginLeft: "10px",
                    }}
                    src={require(`../../../server/uploads/${profilePhoto}`)}
                    alt="ProfilePhoto"
                  ></img>
                )}
                <ul>
                  <li style={{ position: "relative", top: "-5px" }}>
                    <NavLink
                      className="text-decoration-none dropMenu"
                      to={"/Account/" + username}
                    >
                      Hesabım{" "}
                    </NavLink>
                  </li>
                  <li style={{ position: "relative", top: "-5px" }}>
                    <NavLink
                      className="text-decoration-none dropMenu"
                      to={"/MyStars"}
                    >
                      Beğenilerim{" "}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )}
        {!userData && (
          <NavLink className="text-decoration-none" to="/Login">
            <Button style={{ backgroundColor: "#66fcf1", color: "#45a29e" }}>
              Giriş Yap
            </Button>
          </NavLink>
        )}
        {userData != null && (
          <Button
            style={{ backgroundColor: "#45a29e", color: "#66fcf1" }}
            onClick={logoutClick}
          >
            Çıkış Yap
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbars;
