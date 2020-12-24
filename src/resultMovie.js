import React from "react";

import { Row, Col, Button } from "react-bootstrap";

import "./App.css";

function resultMovie(props) {
  return (
    <div style={{ width: "90%", margin: "auto", paddingBottom: "1%" }}>
      <Row style={{ margin: "auto" }}>
        <Col>
          <p style={{ textAlign: "left" }}>
            {props.movie.Title} ({props.movie.Year})
          </p>
        </Col>
        <Col md="auto">
          <Button
            onClick={() => props.moveToNomination(props.movie.imdbID)}
            disabled={props.disabled(props.movie.imdbID)}
            className="nominate-remove-btn"
          >
            Nominate
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default resultMovie;
