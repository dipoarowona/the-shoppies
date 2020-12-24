import React from "react";

import { Row, Button, Col } from "react-bootstrap";

import "./app.css";

function nominationMovie(props) {
  return (
    <div style={{ width: "90%" }}>
      <Row style={{ margin: "auto" }}>
        <Col>
          <p style={{ textAlign: "left" }}>
            {props.movie.Title} ({props.movie.Year})
          </p>
        </Col>
        <Col md="auto">
          <Button
            onClick={() => props.moveToResults(props.movie.imdbID)}
            style={{ margin: "auto" }}
          >
            Remove
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default nominationMovie;
