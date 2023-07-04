import React from "react";
import { Card } from "react-bootstrap";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
export const PostListener = ({ post }) => {
  const yol = "uploads/" + post.resim;

  return (
    <>
      <Card className="container" style={{ padding: "50px" }}>
        <Card.Img
          style={{ maxHeight: "70vh", width: "auto" }}
          variant="top"
          src={yol}
        />
        <Card.Body>
          <Card.Title>{post.baslik}</Card.Title>
          <Card.Text>{post.aciklama}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </>
  );
};
