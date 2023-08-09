import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function DragDropTest() {
  const [list, setList] = useState([
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
  ]);
  return (
    <DragDropContext
      onDragEnd={() => {
        console.log("dragend");
      }}
    >
      head
      <Droppable droppableId="items">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            hello
            {list.map((item, index) => (
              
                <Draggable
                  key={index + "item"}
                  draggableId={index + "nthitem"}
                  index={index}
                >

                  {(provided) => (
                    <div
                      index={index}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div>{item}</div>
                    </div>
                  )}
                </Draggable>
            ))}
            {/* {provided.placeholder} */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
