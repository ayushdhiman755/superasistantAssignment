import React, { useLayoutEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Question1Display from "./Question1Display";
import FIllInBlanksSolution from "./FIllInBlanksSolution";
import ComprehensionDisplay from "./ComprehensionDisplay";
import axios from "axios";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

export default function SolutionQuestionTabs() {
  let { id: QuestionId } = useParams();
  const [q1Items, q1SetItems] = useState();
  const [q1ans, q1setAns] = useState({});
  const [q2blanks, q2setBlanks] = useState();
  const [q2sentence, q2setSentence] = useState();
  const [q2ans, q2SetAns] = useState();

  const [allQuestions, setAllQuestions] = useState();

  useLayoutEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "getQuestion/" + QuestionId)
      .then((data) => {
        console.log(data.data);
        setAllQuestions(data.data);
        q1SetItems(data.data.Question1.items);
        q2setBlanks(data.data.Question2.blank);
        q2setSentence(data.data.Question2.sentence);
        // console
        let sent = data.data.Question2.sentence;
        let list = sent?.split(new RegExp("_{2,}"));
        q2setSentence(list);
        let newAns = [];
        q2blanks?.map((b, i) => {
          newAns[i] = ["Blank" + i];
        });
        q2SetAns(newAns);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [QuestionId]);
  const questions = [
    {
      Question: "this is the Qiestion",
      options: ["option 1", "option2", "Option 3", "option 4"],
    },
    {
      Question: "this is the Qiestion",
      options: ["option 1", "option2", "Option 3", "option 4"],
    },
  ];
  return (
    // <></>
    <div id="MAIN">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={1}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Que 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Que 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Que 3</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Question1Display
                  ans={q1ans}
                  setAns={q1setAns}
                  items={q1Items}
                  setItems={q1SetItems}
                  question={allQuestions?.Question1.question}
                  categories={allQuestions?.Question1.categories}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <FIllInBlanksSolution
                  blanks={q2blanks}
                  setBlanks={q2setBlanks}
                  sentence={q2sentence}
                  setSentence={q2setSentence}
                  ans={q2ans}
                  SetAns={q2SetAns}
                  Question={allQuestions?.Question2}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <ComprehensionDisplay
                  passage={allQuestions?.Question3?.passage}
                  title={allQuestions?.Question3?.title}
                  questions={allQuestions?.Question3?.questions}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <div className="flex justify-center mt-5">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            document.getElementById("MAIN").innerHTML = `<h1>THANK YOU</h1>`;
          }}
        >
          Submitt
        </Button>
      </div>
    </div>
  );
}
