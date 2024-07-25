import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=f5d5cb29a1f84eb2b087b4b327cf908f"
      );
      setArticles(result.data.articles);
    };

    fetchData();
  }, []);

  const handleCommentSubmit = async (articleId) => {
    try {
      const response = await axios.post(`/comments/${articleId}`, {
        content: newComment,
      });
      setComments({
        ...comments,
        [articleId]: [...(comments[articleId] || []), response.data],
      });
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const handleReaction = (articleId, emoji) => {
    const currentReactions = reactions[articleId] || {};
    setReactions({
      ...reactions,
      [articleId]: {
        ...currentReactions,
        [emoji]: (currentReactions[emoji] || 0) + 1,
      },
    });
  };

  return (
    <Container>
      <Row>
        {articles.map((article, index) => (
          <Col key={index} sm={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={
                  article.urlToImage ||
                  "https://i.abcnewsfe.com/a/3cb8ba6c-ccdb-48de-99cc-e684e5358708/abcnl__NEW_streamingnow_1664457649883_hpMain_16x9.jpg?w=608"
                }
              />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Button href={article.url} target="_blank" variant="primary">
                  Read More
                </Button>
                <div>
                  <Button onClick={() => handleReaction(index, "👍")}>
                    👍
                  </Button>
                  <Button onClick={() => handleReaction(index, "❤️")}>
                    ❤️
                  </Button>
                  <Button onClick={() => handleReaction(index, "😂")}>
                    😂
                  </Button>
                  <div>
                    {Object.entries(reactions[index] || {}).map(
                      ([emoji, count]) => (
                        <span key={emoji}>
                          {emoji} {count}{" "}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentSubmit(index);
                  }}
                >
                  <Form.Group controlId="commentContent">
                    <Form.Label>Leave a comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-2">
                    Submit
                  </Button>
                </Form>
                <div>
                  {comments[index]?.map((comment, idx) => (
                    <Card key={idx} className="mt-2">
                      <Card.Body>{comment.content}</Card.Body>
                    </Card>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default News;
