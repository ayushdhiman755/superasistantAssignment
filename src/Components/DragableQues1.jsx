import React, { useRef, useState } from "react";
import Stack from "react-bootstrap/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragHandleIcon from "@mui/icons-material/DragHandle";
export default function CategoricalQuestionCreation({items,category,setCategory,setItems ,question,setQuestion}) {
  // const [category, setCategory] = useState(["cat1", "cat2"]);
  // const [items, setItems] = useState({ item1: "cat1", item2: "cat2" });
  const [itemKey, setItemKey] = useState([...Object.keys(items)]);
  const catRef = useRef();
  const itemRef = useRef();
  const removeCat = (tar) => {
    setCategory([...category.filter((val) => val !== tar)]);
  };
  //   const addCat = () => {};
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
  const onDragCategory = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let newcategoryList = category;
    let add = newcategoryList[source.index];
    newcategoryList.splice(source.index, 1);
    newcategoryList.splice(destination.index, 0, add);
    setCategory(newcategoryList);
  };

  const handleDragItem = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let newItemList = itemKey;
    let add = itemKey[source.index];
    newItemList.splice(source.index, 1);
    newItemList.splice(destination.index, 0, add);
    // setItems(newItemList);
    setItemKey(newItemList);
  };
  return (
    <>
      <span className="text-xl">Question 1</span>
      <form>
        <DragDropContext onDragEnd={onDragCategory}>
          Que: &nbsp;
          <input
            className="w-3/4 px-1"
            type="text"
            placeholder="Describe Question Here"
            value={question}
            onChange={(e)=>{setQuestion(e.target.value)}}
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
                  <Draggable
                    id={index + "id"}
                    index={index}
                    key={index + "cat"}
                    draggableId={index + "nthCat"}
                  >
                    {(provided) => (
                      <div
                        key={cat}
                        className="flex"
                        index={index}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <DragHandleIcon />
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
                    className="ml-6 w-32 border-solid border-2 border-slate-400 "
                    placeholder={"Add Category " + (category.length + 1)}
                    onKeyDown={checkSave}
                  />
                </div>
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
        <DragDropContext onDragEnd={handleDragItem}>
          <Droppable droppableId="itemsDropable">
            {(provided) => (
              <Stack
                gap={2}
                className="w-1/3 "
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex justify-between">
                  <div className="w-36">Items</div>
                  <dv className="w-36">Item-Category</dv>
                </div>
                {itemKey.map((item, index) => (
                  <Draggable
                    id={index + "id"}
                    index={index}
                    key={index + "item"}
                    draggableId={index + "nthItem"}
                  >
                    {(provided) => (
                      <div
                        key={item}
                        className="flex justify-between"
                        index={index}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="flex">
                          <DragHandleIcon />
                          <div className="flex ">
                            <div className="w-36 ml-0 border-solid border-2 border-slate-400">
                              {item}
                            </div>
                            <CloseIcon
                              className="cursor-pointer"
                              onClick={(e) => {
                                deleteItem(item);
                              }}
                            />
                          </div>
                        </div>
                        <select
                          onChange={(e) => setItemCategory(e, item)}
                          className="w-36 border-solid border-2 border-slate-400"
                        >
                          <option value="">Select category</option>
                          {category.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <div className="flex justify-between">
                  <input
                    ref={itemRef}
                    className="w-36 ml-6  border-solid border-2 border-slate-400"
                    placeholder={"Add item " + (Object.keys(items).length + 1)}
                    type="text"
                    onKeyDown={addItem}
                  />
                  <select
                    disabled
                    className="w-36 ml-6 border-solid border-2 border-slate-200"
                  >
                    <option value="">Select category</option>
                  </select>
                </div>
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </form>
    </>
  );
}
