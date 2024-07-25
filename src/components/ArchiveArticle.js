import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import axios from "axios";

const ArchiveArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const result = await axios.get("/articles");
      setArticles(result.data);
    };

    fetchArticles();
  }, []);

  const handleArchive = async (id) => {
    try {
      await axios.patch(`/articles/${id}`, { archived: true });
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error("Error archiving article", error);
    }
  };

  return (
    <Container>
      <h1>Archive Articles</h1>
      <ListGroup>
        {articles.map((article) => (
          <ListGroup.Item key={article._id}>
            {article.title}
            <Button
              variant="secondary"
              className="float-right"
              onClick={() => handleArchive(article._id)}
            >
              Archive
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ArchiveArticle;
