import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Question1Display from "./Question1Display";
import FIllInBlanksSolution from "./FIllInBlanksSolution";
import ComprehensionDisplay from "./ComprehensionDisplay";

export default function SolutionQuestionTabs() {
  const questions=[
    {
      Question: "this is the Qiestion",
      options: ["option 1", "option2", "Option 3", "option 4"],
    },
    {
    Question: "this is the Qiestion",
    options: ["option 1", "option2", "Option 3", "option 4"],
    },
  ]
  return (
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
              <Question1Display/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <FIllInBlanksSolution blanks={["blank1","blank2","blank3"]} sentence={"________this is a _____ sentence with _____ fill _____"}/>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <ComprehensionDisplay title={"comprehension"} questions={questions}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
