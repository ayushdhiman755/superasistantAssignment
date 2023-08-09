import DragDropTest from "./Components/DragDropTest";
import QuestionsTab from "./Components/QuestionTab";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import SolutionQuestionTabs from "./Components/SolutionQuestionTabs";

function App() {
  let {id}=useParams()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<QuestionsTab />} />
          <Route
            path="/Solution/:id"
            exact
            element={
              <SolutionQuestionTabs  />
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <QuestionsTab /> */}
      {/* <DragDropTest/> */}
    </>
  );
}

export default App;
