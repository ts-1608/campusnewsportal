import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import axios from "axios";

const DeleteArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const result = await axios.get("/articles");
      setArticles(result.data);
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/articles/${id}`);
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  return (
    <Container>
      <h1>Delete Articles</h1>
      <ListGroup>
        {articles.map((article) => (
          <ListGroup.Item key={article._id}>
            {article.title}
            <Button
              variant="danger"
              className="float-right"
              onClick={() => handleDelete(article._id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default DeleteArticle;
