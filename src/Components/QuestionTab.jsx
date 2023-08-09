import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import SaveIcon from "@mui/icons-material/Save";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import CategoricalQuestionCreation from "./CategoricalQuestionCreation";
import FillInBlankQuestionCreation from "./FillInBlankQuestionCreation";
import ComprehensionQuestionCreation from "./ComprehensionQuestionCreation";
import DragableQues1 from "./DragableQues1";
import axios from "axios";
import { useState } from "react";
import { Button, colors } from "@mui/material";
function QuestionsTab() {
  const [q1Des, q1Setdesc] = useState();
  const [q1Items, q1SetItems] = useState([]);
  const [q1category, q1Setcategory] = useState([]);
  const [q2Question, q2SetQuestion] = useState();
  const [q2Content, q2SetContent] = useState();
  const [q2Blanks, q2SetBlanks] = useState();
  const [q3Questions, q3SetQuestion] = useState([]);
  const [q3Passage, q3SetPAssage] = useState();
  const Save = () => {
    if (
      !q1Des ||
      q1Des === "" ||
      !q1Items ||
      q1Items === "" ||
      !q1category ||
      q1category === "" ||
      !q2Question ||
      q2Question == "" ||
      !q2Content ||
      q2Content === "" ||
      !q2Blanks ||
      q2Blanks==="" ||
      !q3Questions ||
      q3Questions==="" ||
      !q3Passage ||
      q3Passage==="" ||
      q1Items === [] ||
      q3Questions == [] ||
      q1category === []
    )
      alert("provide all question properly");
    else {
      let body = {};
      body["Question1"] = {
        question: q1Des,
        categories: q1category,
        items: q1Items,
      };
      let question2Statement = q2Content.replace(/(<([^>]+)>)/gi, "");
      body["Question2"] = {
        Questionstatement: question2Statement,
        sentence: q2Question,
        blank: q2Blanks,
      };
      // console.log(body.Question2)
      body["Question3"] = {
        passage: q3Passage,
        questions: q3Questions,
      };
      console.log(body);
      axios
        .post(process.env.REACT_APP_SERVER_URL + "addQuestion", body)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
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
                {/* <CategoricalQuestionCreation/> */}
                <DragableQues1
                  question={q1Des}
                  setQuestion={q1Setdesc}
                  items={q1Items}
                  setItems={q1SetItems}
                  category={q1category}
                  setCategory={q1Setcategory}
                ></DragableQues1>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <FillInBlankQuestionCreation
                  content={q2Content}
                  setContent={q2SetContent}
                  blanks={q2Blanks}
                  setBlanks={q2SetBlanks}
                  question={q2Question}
                  setQuestion={q2SetQuestion}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <ComprehensionQuestionCreation
                  questions={q3Questions}
                  setQuestions={q3SetQuestion}
                  passage={q3Passage}
                  setPassage={q3SetPAssage}
                ></ComprehensionQuestionCreation>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <div className="flex justify-center mt-5">
        <Button
          endIcon={<SaveIcon />}
          variant="contained"
          color="success"
          onClick={Save}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default QuestionsTab;
