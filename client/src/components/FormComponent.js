import React, { useEffect } from "react";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../actions/userData/user";

const FormComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Giriş Yap");
  const [status, setStatus] = useState();
  const userDataError = useSelector((state) => state.users.errorHandler);
  const userDataSucces = useSelector((state) => state.users.succes);
  const navi = useNavigate();
  useEffect(() => {
    if (userDataSucces) {
      setButtonText("Giriş Yapıldı");
      setTimeout(() => {
        navi("/");
      }, 1500);
    }
  }, [userDataSucces]);
  useEffect(() => {
    if (userDataError) {
      setButtonText("Giriş Başarısız");
      setTimeout(() => {
        setButtonText("Giriş Yap");
      }, 1500);
    }
  }, [userDataError]);
  return (
    <>
      <Container
        style={{
          marginTop: "18vh",
          backgroundColor: "white",
          width: "40vw",
          paddingBottom: "5vh",
          borderRadius: "10px",
        }}
      >
        <div style={{ width: "40vw", margin: "auto", paddingTop: "10px" }}>
          KSG
        </div>
        {userDataError && (
          <div style={{ color: "red", marginTop: "10px" }}>
            İşlem Başarısız Lütfen Tekrar deneyin
          </div>
        )}
        {userDataSucces && (
          <div style={{ color: "green" }}>
            İşlem Başarılı Anasayfaya yönlendiriliyorsunuz{" "}
          </div>
        )}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(getUserData(formData));
          }}
          style={{ paddingTop: "50px" }}
        >
          <FloatingLabel
            controlId="floatingInputs"
            label="Kullanıcı Adı"
            className="mb-3 mt-3"
          >
            <Form.Control
              minLength="5"
              maxLength="40"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              type="text"
              placeholder="Username"
              style={{ borderRadius: "10px" }}
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
              style={{ borderRadius: "10px" }}
              minLength="5"
              maxLength="40"
            />
          </FloatingLabel>
          <div className="d-grid gap-2">
            <Button
              size="lg"
              type="submit"
              style={{ backgroundColor: "#45a29e", borderRadius: "5px" }}
              onClick={() => {
                if (formData.username.length > 7 && formData.password.length)
                  setButtonText("Giriş Yapılıyor...");
              }}
            >
              {buttonText}
            </Button>
            <Form.Text className="text-center mt-2">
              Bir hesabın yok mu ? <Link to="/Kaydol">Kayıt ol</Link>{" "}
            </Form.Text>{" "}
          </div>
        </Form>
      </Container>
    </>
  );
};

export default FormComponent;
