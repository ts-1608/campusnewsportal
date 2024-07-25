import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const PublishArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      await axios.post(
        "/articles",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Article published successfully");
    } catch (error) {
      console.error("Error publishing article", error);
    }
  };

  return (
    <Container>
      <h1>Publish Article</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PublishArticle;
