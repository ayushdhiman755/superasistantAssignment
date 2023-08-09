import React, { useRef } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
export default function ComprehensionQuestionCreation({
  questions,
  setQuestions,
  passage,
  setPassage,
}) {
  const QuestionForm = useRef();
  // const [questions, setQuestions] = useState([
  //   {
  //     Question: "this is the Qiestion",
  //     options: ["option 1", "option2", "Option 3", "option 4"],
  //   },
  //   // {
  //   // Question: "this is the Qiestion",
  //   // options: ["option 1", "option2", "Option 3", "option 4"],
  //   // },
  // ]);

  const addQuestion = () => {
    if (QuestionForm.current.QuestionToAdd.value === "") return;
    let que = {};
    que.Question = QuestionForm.current.QuestionToAdd.value;
    que.options = [
      QuestionForm.current.optionA.value,
      QuestionForm.current.optionB.value,
      QuestionForm.current.optionC.value,
      QuestionForm.current.optionD.value,
    ];
    console.log(que);
    setQuestions([...questions, que]);
    QuestionForm.current.QuestionToAdd.value = "";
    QuestionForm.current.optionA.value = "";
    QuestionForm.current.optionB.value = "";
    QuestionForm.current.optionC.value = "";
    QuestionForm.current.optionD.value = "";
  };
  return (
    <div className="">
      <h1 className="text-xl text-center">Question 3 </h1>
      <div className="flex justify-center my-3">
        <TextareaAutosize
          className="m-auto w-3/4 max-w-full p-2 border-4 outline-double outline-3 outline-offset-2 outline-blue-500  border-indigo-500/50"
          minRows={3}
          placeholder="Write Comprehension Here"
          value={passage}
          onChange={(e) => {
            setPassage(e.target.value)
          }}
        />
      </div>
      Note : Please tick the correct answer before saving the form
      {questions.map((que, i) => (
        <div className="shadow-2xl my-4 p-3 rounded-xl">
          <div>
            <span className="font-semibold">Que {i + 1}. &nbsp;</span>
            <span className="font-medium">{que.Question}</span>
          </div>
          <form className="my-2">
            {que.options.map((op, i) => (
              <div key={op} className="flex content-center">
                <input type="checkbox" value={op} id={op} /> &nbsp;
                <label htmlFor={op}>
                  <span className="font-medium">
                    {String.fromCharCode(97 + i) + ")"}&nbsp;
                  </span>
                  {op}
                </label>
              </div>
            ))}
          </form>
        </div>
      ))}
      <div className="shadow-2xl p-3 rounded-xl static">
        <form className="w-100" ref={QuestionForm}>
          <div className="Question flex">
            Que {questions.length + 1} :&nbsp;{" "}
            <TextareaAutosize
              id="QuestionToAdd"
              className="w-3/4 focus:outline-none focus:ring focus:border-blue-500 rounded px-1"
              placeholder="Click to add new Question"
            />
          </div>
          <div className="flex flex-col">
            <input
              className="my-0.5"
              type="text"
              id="optionA"
              placeholder="Option A"
            />
            <input
              className="my-0.5"
              type="text"
              id="optionB"
              placeholder="Option B"
            />
            <input
              className="my-0.5"
              type="text"
              id="optionC"
              placeholder="Option C"
            />
            <input
              className="my-0.5"
              type="text"
              id="optionD"
              placeholder="Option D"
            />
          </div>
        </form>
        <div className="text-right">
          <button
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-3 rounded-full "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
