import React from "react";

export default function ComprehensionDisplay({passage, questions, title }) {
  return (
    <div>
      <div className="text-justify mx-2 my-3">
        <span className="font-semibold">Que 3: </span>
        <span className="font-medium">
          &nbsp;select Appropreate options after reading the passage
        </span>
      </div>
      <div className="text-justify shadow-lg p-2 rounded-3">
        <div className="text-center text-xl font-bold">
          {title ? title : "Passage"}
        </div>
       {passage}
      </div>
      <div className="">
        <div className="flex justify-center my-3 font-medium">
          Note : Tick the corrent answer (one or more)
        </div>
        {questions?.map((que, i) => (
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
      </div>
    </div>
  );
}
