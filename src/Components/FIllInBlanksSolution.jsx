import React, { useLayoutEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function FIllInBlanksSolution({
  blanks,
  setBlanks,
  sentence,
  setSentence,
  ans,
  Question,
  SetAns,
}) {
  // const [blanks, setBlanks] = useState(Question?.blank);
  // const [sentence, setSentence] = useState(Question?.sentence);
  // const [ans, SetAns] = useState();

  const BlankComponent = ({ ind, sentence }) => {
    return (
      <Droppable droppableId={"blank" + ind}>
        {(provided) => (
          <span
            style={{
              minWidth: "5rem",
              display: "inline-block",
              minHeight: "1.9em",
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-1 text-center border-solid border-2 border-indigo-600 rounded-4 max-w-full m-auto"
          >
            {ans[ind]?.map((blank, index) => (
              <Draggable
                key={index + " " + ind}
                draggableId={index + "item" + ind}
                index={index}
              >
                {(provided) => (
                  <span
                    index={index}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="px-2 shadow-md rounded bg-gray-400 mx-1"
                  >
                    {blank}
                  </span>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </span>
        )}
      </Droppable>
    );
  };
  // useLayoutEffect(() => {
  //   let sent = sentence;
  //   // let startIndex = [...sent.matchAll(new RegExp("_{2,}", "g"))];
  //   // startIndex.map((val, index) => {
  //   //   sent = sent.replace(new RegExp("_{2,}"), "<BlankComponent ind={index}/>");
  //   //   //   console.log(val.index, sent);
  //   // });
  //   let list = sent?.split(new RegExp("_{2,}"));
  //   setSentence(list);
  //   console.log(sentence);
  //   // console.log("ind",startIndex)
  //   let newAns = [];
  //   blanks?.map((b, i) => {
  //     newAns[i] = ["Blank" + i];
  //   });

  //   SetAns(newAns);
  // }, [Question]);

  // useEffect(() => {
  //   document.getElementById("SENTENCE").innerHTML = sentence;
  // }, [sentence]);

  const handleDrag = (result) => {
    const { source, destination } = result;
    console.log("source ", source);
    console.log("destination  ", destination);
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    if (source.droppableId === "blanks") {
      let newBlanks = blanks;
      let add = newBlanks[source.index];
      newBlanks.splice(source.index, 1);
      setBlanks(newBlanks);
      let blankNo = destination.droppableId.replace("blank", "");
      let newAns = ans;
      if (newAns[blankNo]) newAns[blankNo].splice(destination.index, 0, add);
      else newAns[blankNo] = [add];
      SetAns(newAns);
    } else if (destination.droppableId === "blanks") {
      let newBlanks = blanks;
      let newAns = ans;
      let blankNo = source.droppableId.replace("blank", "");
      let add = newAns[blankNo][source.index];
      newAns[blankNo].splice(source.index, 1);
      newBlanks.splice(destination.index, 0, add);
      setBlanks(newBlanks);
      SetAns(newAns);
    } else {
      let sourceBlankNo = source.droppableId.replace("blank", "");
      let destinationBlankNo = destination.droppableId.replace("blank", "");
      let newAns = ans;

      let add = newAns[sourceBlankNo][source.index];
      newAns[sourceBlankNo].splice(source.index, 1);
      if (newAns[destinationBlankNo])
        newAns[destinationBlankNo].splice(destination.index, 0, add);
      else {
        newAns[destinationBlankNo] = [add];
      }
      SetAns(newAns);
    }
  };
  return (
    <div>
      <div className="text-justify mx-2 my-3">
        <span className="font-semibold">Que 2: </span>
        <span className="font-medium">&nbsp;{Question?.question}</span>
      </div>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="blanks">
          {(provided) => (
            <span
              ref={provided.innerRef}
              {...provided.droppableProps}
              className=" p-2 min-w-full border-solid border-2 border-indigo-600 rounded-4 max-w-full m-auto"
            >
              {blanks?.map((blank, index) => (
                <Draggable
                  key={index}
                  draggableId={index + "blank"}
                  index={index}
                >
                  {(provided) => (
                    <span
                      index={index}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="px-2 shadow-md rounded bg-gray-400 mx-1"
                    >
                      {blank}
                    </span>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </span>
          )}
        </Droppable>
        <div className="mt-4 ml-4" id="SENTENCE"></div>
        <div className="mt-4 ml-4 flex w-full items-center">
          {sentence?.map((word, index) => (
            <span className="flex items-center">
              <span className="m-auto mx-1">{word}</span>
              {index === sentence?.length - 1 ? (
                ""
              ) : (
                <BlankComponent ind={index} sentence={sentence} />
              )}
            </span>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

{
  /* <Droppable droppableId={"blank" + ind}>
  {(provided) => (
    <span
      ref={provided.innerRef}
      {...provided.droppableProps}
      className=" p-2  border-solid border-2 border-indigo-600 rounded-4 max-w-full m-auto"
    >
      {ans[ind]?.map((blank, index) => (
        <Draggable
          key={index + " " + ind}
          draggableId={index + "item" + ind}
          index={index}
        >
          {(provided) => (
            <span
              index={index}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="px-2 shadow-md rounded bg-gray-400 mx-1"
            >
              {blank}
            </span>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </span>
  )}
</Droppable>; */
}
