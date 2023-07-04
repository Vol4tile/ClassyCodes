import React from "react";
import { FloatingLabel, Form, Button, Container } from "react-bootstrap";
import { Kayit } from "../axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  return (
    <>
      <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            Kayit(formData)
              .then((res) => {})
              .catch((error) => {});
          }}
        >
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3 mt-3"
          >
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              placeholder="name@example.com"
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
            />
          </FloatingLabel>
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
            />
          </FloatingLabel>
          <div className="d-grid gap-2">
            <Button variant="success" size="lg" type="submit">
              Block level button
            </Button>
            <Form.Text className="text-center mt-2">
              Zaten bir hesabın var mı ? <Link to="/">Giriş Yap</Link>
            </Form.Text>{" "}
          </div>
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
