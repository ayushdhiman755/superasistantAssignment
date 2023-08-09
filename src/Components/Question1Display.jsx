import React, { useLayoutEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Question1Display({
  ans,
  setAns,
  items,
  setItems,
  question,
  categories,
}) {
  // const question =
  // "Categorize the following items by dropping them into their respective category";
  // const [categories, setCategories] = useState();
  // const [items, setItems] = useState([
  //   "item1",
  //   "item2",
  //   "item3",
  //   "item4",
  //   "item5ffffffff",
  // ]);
  // const [ans, setAns] = useState({});

  useLayoutEffect(() => {
    let newCategoryObj = {};
    // setCategories([
    //   "cat1",
    //   "cat2",
    //   "cat3",
    //   "cat4",
    // ])
    for (let index = 0; index < categories?.length; index++) {
      newCategoryObj[categories[index]] = [];
    }
    setAns(newCategoryObj);
    console.log("ans ", newCategoryObj);
  }, [categories]);

  const handleDrag = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "items") {
        let add = items[source.index];
        let newItems = items;
        console.log("initial", newItems);
        newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, add);
        console.log("final", newItems);
        setItems(newItems);
      } else {
        let itemlist = ans[source.droppableId];
        let add = itemlist[source.index];
        itemlist.splice(source.index, 1);
        itemlist.splice(destination.index, 0, add);
        let newAns = ans;
        newAns[source.droppableId] = itemlist;
        setAns(newAns);
      }
    } else {
      if (source.droppableId === "items") {
        let add = items[source.index];
        let newItems = items;
        newItems.splice(source.index, 1);
        setItems(newItems);
        let itemlist = ans[destination.droppableId];
        itemlist.splice(destination.index, 0, add);
        let newAns = ans;
        newAns[source.droppableId] = itemlist;
        setAns(newAns);
      } else if (destination.droppableId === "items") {
        return;
      } else {
        let sourceList = ans[source.droppableId];
        let destinationList = ans[destination.droppableId];
        let add = sourceList[source.index];
        sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, add);
        let newAns = ans;
        newAns[source.droppableId] = sourceList;
        newAns[destination.droppableId] = destinationList;
        setAns(newAns);
      }
    }
  };

  return (
    <div>
      <div className="text-justify mx-2 my-3">
        <span className="font-semibold">Que 1: </span>
        <span className="font-medium">&nbsp;{question}</span>
      </div>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="items">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className=" p-2 min-w-full border-solid border-2 border-indigo-600 rounded-4 max-w-full m-auto"
            >
              {items?.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={index + "item"}
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
                      {item}
                    </span>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="flex justify-between mt-4">
          {categories?.map((cate) => (
            <Droppable droppableId={cate}>
              {(provided) => (
                <div
                  className="flex flex-col justify-center py-2  shadow-inner w-100 mx-2 bg-gray-200"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="text-center">{cate}</div>
                  {ans[cate]?.map((item, index) => (
                    <Draggable
                      key={index + "item"}
                      draggableId={cate + index + "nthitem"}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="text-center mx-auto my-1 w-2/5 px-2 shadow-md rounded bg-gray-400 mx-1"
                          index={index}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
