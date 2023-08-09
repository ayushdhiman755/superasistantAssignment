import React, { useLayoutEffect, useRef, useState } from "react";
import Stack from "react-bootstrap/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function CategoricalQuestionCreation(props) {
  const [category, setCategory] = useState(["cat1", "cat2"]);
  const [items, setItems] = useState({ item1: "cat1", item2: "cat2" });
  const [itemKey, setItemKey] = useState(["item1", "item2"]);
  const catRef = useRef();
  const itemRef = useRef();
  const removeCat = (tar) => {
    setCategory([...category.filter((val) => val !== tar)]);
  };
  


  const checkSave = (e) => {
    if (e.key === "Enter")
      if (catRef.current.value != "") {
        setCategory([...category, catRef.current.value]);
        catRef.current.value = "";
      }
  };
  const setItemCategory = (e, targetItem) => {
    let currentState = items;
    currentState[targetItem] = e.target.value;
    setItems(currentState);
  };
  const deleteItem = (i) => {
    console.log("deleting ", i);
    let currentItems = items;
    delete currentItems[i];
    console.log(currentItems);
    setItems(currentItems);
    setItemKey(Object.keys(currentItems));
  };

  const addItem = (e) => {
    let key = itemRef.current.value;
    if (e.key === "Enter" && key) {
      let newItems = items;
      newItems[key] = "";
      setItems(newItems);
      setItemKey([...itemKey, key]);
      itemRef.current.value = "";
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={() => {}}>
        <span className="text-xl">Question 1</span>
        <form>
          Que: &nbsp;
          <input
            className="px-1"
            type="text"
            placeholder="Describe Question Here"
          />
          <h4>Categories</h4>
          <Droppable droppableId="Categories">
            {(provided) => (
              <Stack
                className="w-38"
                gap={2}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {category.map((cat, index) => (
                  <Draggable id={index + "id"} index={index}>
                    {(provided) => (
                      <div
                        key={cat}
                        className="flex"
                        index={index}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                      >
                        <div className="w-32 border-solid border-2 border-slate-400">
                          {cat}
                        </div>
                        <CloseIcon
                          className="cursor-pointer"
                          onClick={() => {
                            removeCat(cat);
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                 {provided.placeholder}
                <div className="flex">
                  <input
                    ref={catRef}
                    className=" w-32 border-solid border-2 border-slate-400 "
                    placeholder={"Add Category " + (category.length + 1)}
                    onKeyDown={checkSave}
                  />
                  {/* <DoneIcon className="cursor-pointer" onClick={addCat} /> */}
                </div>
              </Stack>
            )}
          </Droppable>
          <Stack gap={2} className="w-1/3 ">
            <div className="flex justify-between">
              <div className="w-36">Items</div>
              <dv className="w-36">Item-Category</dv>
            </div>
            {itemKey.map((item) => (
              <div key={item} className="flex justify-between">
                <div className="flex ">
                  <div className="w-36 border-solid border-2 border-slate-400">
                    {item}
                  </div>
                  <CloseIcon
                    className="cursor-pointer"
                    onClick={(e) => {
                      deleteItem(item);
                    }}
                  />
                </div>
                <select
                  onChange={(e) => setItemCategory(e, item)}
                  className="w-36 border-solid border-2 border-slate-400"
                >
                  {/* {items[item]} */}
                  <option value="">Select category</option>
                  {category.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex justify-between">
              <input
                ref={itemRef}
                className="w-36  border-solid border-2 border-slate-400"
                placeholder={"Add item " + (Object.keys(items).length + 1)}
                type="text"
                onKeyDown={addItem}
              />
              <select
                disabled
                className="w-36 border-solid border-2 border-slate-200"
              >
                <option value="">Select category</option>
              </select>
            </div>
          </Stack>
        </form>
      </DragDropContext>
    </>
  );
}
