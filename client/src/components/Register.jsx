import React, { useEffect } from "react";
import { FloatingLabel, Form, Button, Container } from "react-bootstrap";
import Logo from "../assets/codelogo1.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Kayit } from "../axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
    email: "",
    username: "",
    filename: null,
  });

  const [buttonText, setButtonText] = useState("Kaydı tamamla");
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    Kayit(data)
      .then((res) => {
        if (res.status == 200) {
          setButtonText("Kayıt Başarılı Girişe yönlendiriliyorsunuz...");
          setTimeout(() => {
            navigate("/Login");
          }, 1500);
        } else setButtonText("Lütfen tekrar deneyin");
        setTimeout(() => {
          setButtonText("Kaydı tamamla");
        }, 1500);
      })
      .catch((error) => {
        setButtonText(error.response.data.message);
      });
  };
  const fileHandler = (evt) => {
    const f = evt.target.files[0];

    if (f) {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        setPreview(result);
      };
      setFormData({ ...formData, filename: f.name });

      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  return (
    <div style={{ margin: "auto", marginTop: "5vh", width: "40vw" }}>
      <div style={{ height: "20vh", width: "60%", margin: "auto" }}>
        <img
          src={preview ? preview : Logo}
          style={{
            height: "15vh",
            width: "15vh",
            float: "left",
            borderRadius: "50%",
          }}
          alt="Resim"
        ></img>
        <h2
          style={{
            marginLeft: "10vw",
            maxHeight: "200px",
            minWidth: "300px",
            wordBreak: "break-word",
            color: "white",
          }}
        >
          {" "}
          {formData.fullname ? formData.fullname : "Full Name"}
        </h2>
        <h6
          style={{
            marginLeft: "10vw",
            wordBreak: "break-word",
            color: "white",
          }}
        >
          @{formData.username ? formData.username : "Username"}
        </h6>
      </div>
      <Container>
        <Form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <FloatingLabel
            controlId="floatingPassword"
            label="FullName"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              type="text"
              placeholder="FullName"
              name="fullname"
              style={{ borderRadius: "5px" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingUserName"
            label="UserName"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              type="text"
              placeholder="UserName"
              name="username"
              style={{ borderRadius: "5px" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3 mt-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="text"
              name="email"
              placeholder="name@example.com"
              style={{ borderRadius: "5px" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPasswords"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              name="password"
              style={{ borderRadius: "5px" }}
            />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              accept="image/*"
              name="file"
              onChange={fileHandler}
              style={{ borderRadius: "5px" }}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button
              size="lg"
              type="submit"
              onClick={() => {
                setButtonText("İşlem sürüyor...");
              }}
              style={{ backgroundColor: "#45a29e", borderRadius: "5px" }}
            >
              {buttonText}
            </Button>
            <Form.Text className="text-center mt-2">
              Zaten bir hesabın var mı ? <Link to="/Login">Giriş Yap</Link>
            </Form.Text>{" "}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
