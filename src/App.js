import React, { useState } from "react";

import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

import ResultMovie from "./resultMovie";
import NominationMovie from "./nominationMovie";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ error: null, data: null });
  const [nominations, setNominations] = useState([]);

  const updateSearch = () => {
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&i=tt3896198&apikey=914d4fd7`)
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
  };

  const moveToResults = (id) => {
    const updatedNominations = nominations.filter((movie) => {
      return movie.imdbID !== id;
    });
    setNominations(updatedNominations);
  };

  const isDisabled = (id) => {
    const movie = nominations.find((nomination) => nomination.imdbID === id);
    return movie ? true : false;
  };

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
          <Alert variant="danger">You Have 5 or More Nominations</Alert>
        </div>
      ) : (
        <></>
      )}
      <div className="main-card">
        <Col style={{ margin: "auto", width: "80%" }}>
          <h1 className="title">THE SHOPPIES</h1>
          <Row>
            <Card className="search-card">
              <Form style={{ marginTop: "3%", marginLeft: "5%" }}>
                <h3 className="search-title">Search</h3>
                <Row style={{}}>
                  <Form.Control
                    type="text"
                    placeholder="Search Movie"
                    id="search-bar"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <Button onClick={updateSearch} className="search-button">
                    Search
                  </Button>
                </Row>
              </Form>
            </Card>
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <Col style={{ paddingLeft: "0.25%" }}>
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
            <Col style={{ paddingRight: ".25%" }}>
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
