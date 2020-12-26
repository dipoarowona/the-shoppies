import React, { useState, useEffect } from "react";

import ls from "local-storage";

import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

import ResultMovie from "./resultMovie";
import NominationMovie from "./nominationMovie";

import "./App.css";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ error: null, data: null });
  const [nominations, setNominations] = useState([]);

  const updateSearch = (event) => {
    event.preventDefault();
    fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&i=tt3896198&apikey=914d4fd7`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Error) {
          setResults({ error: data.Error });
        } else {
          setResults({ error: null, data: data.Search });
        }
      });
  };

  const moveToNomination = (id) => {
    const newNomination = results.data.find((movie) => movie.imdbID === id);
    setNominations(nominations.concat(newNomination));
    ls.set("nominations", nominations.concat(newNomination));
  };

  const moveToResults = (id) => {
    const updatedNominations = nominations.filter((movie) => {
      return movie.imdbID !== id;
    });
    setNominations(updatedNominations);
    ls.set("nominations", updatedNominations);
  };

  const isDisabled = (id) => {
    const movie = nominations.find((nomination) => nomination.imdbID === id);
    return movie ? true : false;
  };

  useEffect(() => {
    if (ls.get("nominations") !== [] && ls.get("nominations") !== null) {
      setNominations(ls.get("nominations"));
    }
  }, []);

  return (
    <div className="App">
      {nominations.length >= 5 ? (
        <div
          style={{
            width: "60%",
            margin: "auto",
            textAlign: "center",
            marginTop: "1%",
          }}
        >
          <Alert id="alert" variant="danger">
            You Have 5 or More Nominations
          </Alert>
        </div>
      ) : (
        <></>
      )}
      <div className="main-card">
        <Col style={{ margin: "auto", width: "80%" }}>
          <h1 className="title">THE SHOPPIES</h1>
          <Row>
            <Card className="search-card">
              <Form
                onSubmit={updateSearch}
                style={{ marginTop: "3%", marginLeft: "5%" }}
              >
                <h3 className="search-title">Search</h3>
                <Row>
                  <Col style={{ paddingLeft: "0px" }} md={10} sm={11}>
                    <Form.Control
                      type="text"
                      placeholder="Search Movie"
                      id="search-bar"
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                  </Col>
                  <Col style={{ paddingLeft: "0px" }}>
                    <Button type="submit" className="search-button">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <Col
              md
              sm={12}
              style={{ paddingLeft: "0.5%", paddingRight: "0.5%" }}
            >
              <Card className="results-card">
                <Row>
                  <h3 className="results-nominations-heading">
                    Results for "{searchTerm}"
                  </h3>
                </Row>
                <Row>
                  {!results.error && !results.data ? (
                    <></>
                  ) : results.error ? (
                    <div style={{ width: "90%", margin: "auto" }}>
                      <Row style={{ margin: "auto" }}>
                        <Col>
                          <p style={{ textAlign: "left", color: "#f82929" }}>
                            {results.error}
                          </p>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    results.data.map((movie) => {
                      return (
                        <ResultMovie
                          key={movie.imdbID}
                          movie={movie}
                          moveToNomination={moveToNomination}
                          disabled={isDisabled}
                        />
                      );
                    })
                  )}
                </Row>
              </Card>
            </Col>
            <Col
              md
              sm={12}
              style={{ paddingLeft: "0.5%", paddingRight: "0.5%" }}
            >
              <Card className="nominations-card">
                <Row>
                  <h3 className="results-nominations-heading">Nominations</h3>
                </Row>
                <Row>
                  {!nominations ? (
                    <h1>hi</h1>
                  ) : (
                    nominations.map((movie) => {
                      return (
                        <NominationMovie
                          key={movie.imdbID}
                          movie={movie}
                          moveToResults={moveToResults}
                        />
                      );
                    })
                  )}
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default App;
