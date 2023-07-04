import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CreatePost } from "../axios";
import "../css/Post.css";
const Post = () => {
  const [formData, setFormData] = useState({
    baslik: "",
    aciklama: "",
    file: "",
  });

  return (
    <div style={{ marginTop: "10vh" }}>
      <Form
        encType="multipart/form-data"
        className="container"
        onSubmit={(e) => {
          e.preventDefault();
          const poster = new FormData();
          poster.append("baslik", formData.baslik);
          poster.append("aciklama", formData.aciklama);
          poster.append("file", formData.file);
          CreatePost(poster)
            .then((res) => {})
            .catch((error) => {});
        }}
      >
        <Form.Control
          onChange={(e) => setFormData({ ...formData, baslik: e.target.value })}
          size="lg"
          type="text"
          placeholder="Başlık"
          style={{ margin: "10px 0px 10px 0px" }}
        />

        <Form.Control
          as="textarea"
          placeholder="Bir yorum bırak..."
          style={{ height: "200px", resize: "none", marginBottom: "10px" }}
          onChange={(e) =>
            setFormData({ ...formData, aciklama: e.target.value })
          }
        />

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Post;
