import DragHandleIcon from "@mui/icons-material/DragHandle";
import React, { useMemo, useRef} from "react";
import JoditEditor from "jodit-react";
import CloseIcon from "@mui/icons-material/Close";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
export default function FillInBlankQuestionCreation({
  content,
  setContent,
  blanks,
  setBlanks,
  question,
  setQuestion,
}) {
  const config = useMemo(
    () => ({
      buttons: ["underline", "|", "font"],
      readonly: false,
      toolbarAdaptive: false,
    }),
    []
  );
  // const [question, setQuestion] = useState();
  // const [content, setContent] = useState(
    // "This is goint to be an example question"
  // );
  // const [blanks, setBlanks] = useState([]);
  const removeBlank = (word) => {
    console.log(`__${word}__`);
    // let pattern1=new RegExp(`<u>${word}</u>`,"g")
    let pattern2 = new RegExp(`<u>\\s*${word}\\s*</u>`, "g");
    // console.log("pattern1 ",pattern1)
    console.log("search ", content.search(pattern2));
    let newContent = content?.replaceAll(pattern2, ` ${word} `);
    // newContent=newContent?.replaceAll(pattern1,word)
    setContent(newContent);
    update(newContent);
    setBlanks([...blanks.filter((b) => b !== word)]);
  };
  // const output=useRef(null)
  const editor = useRef(null);
  const update = (newcontent) => {
    let previewText = newcontent.replace(/(<([^>]+)>)/gi, "");
    previewText = previewText.replaceAll("&nbsp;", "");
    let startmatched = [...newcontent?.matchAll(new RegExp("<u>", "g"))];
    let endmatched = [...newcontent?.matchAll(new RegExp("</u>", "g"))];
    let words = [];
    startmatched?.map((match, i) => {
      let startIndex = match.index + 3;
      let endindex = endmatched[i].index;
      words.push(newcontent.slice(startIndex, endindex).trim());
    });
    setBlanks(words);
    words.map((word) => {
      let dash = "_".repeat(word.length);
      previewText = previewText.replaceAll(word, dash);
    });

    setQuestion(previewText);
  };

  const handleBlankDrag = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let newBlankList = blanks;
    let add = blanks[source.index];
    newBlankList.splice(source.index, 1);
    newBlankList.splice(destination.index, 0, add);
    setBlanks(newBlankList);
  };
  return (
    <div>
      <h1 className="text-xl">Question 2 </h1>
      <div>
        <span className="text-lg font-semibold">Preview :</span>&nbsp;{question}
      </div>
      <JoditEditor
        config={config}
        ref={editor}
        value={content}
        // tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => {
          setContent(newContent);
          update(newContent);
        }} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          update(newContent);
          setContent(newContent);
        }} // preferred to use only this option to update the content for performance reasons
      />
      {/* <div>{content}</div> */}
      <div className="font-semibold my-2 mx-4">Options :</div>
      <DragDropContext onDragEnd={handleBlankDrag}>
        <Droppable droppableId="blankDroppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blanks?.map((word, index) => (
                <Draggable
                  id={index + "id"}
                  index={index}
                  key={index + "Blank"}
                  draggableId={index + "nthBlank"}
                >
                  {(provided) => (
                    <div
                      key={word}
                      className="flex items-center"
                      index={index}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <DragHandleIcon />
                      <div className="w-1/12 my-1 overflow-auto min-w-fit border-solid border-2 border-slate-400 px-1">
                        {word}
                      </div>
                      <CloseIcon
                        className="cursor-pointer"
                        onClick={() => {
                          removeBlank(word);
                        }}
                        style={{ fontSize: "large" }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
