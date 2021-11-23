import React, { useEffect, useState, Suspense } from "react";
import { columnsRawData } from "../KanbanData";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import "./Kanban.css";
import { DragDropContext } from "react-beautiful-dnd";

const KanbanModal = React.lazy(() => import("../KanbanModal/KanbanModal"));

const Kanban = (props) => {
  const [columns, setColumns] = useState(
    JSON.parse(window.localStorage.getItem("columns")) || columnsRawData
  );
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      console.log("no destination");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("index and destination the same");
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      const swapTask = newTaskIds[source.index];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, swapTask);

      const newColumnsState = columns.map((c) => {
        if (c.id === start.id) {
          c.taskIds = newTaskIds;
          return c;
        } else return c;
      });

      const newColumnsState2 = [...newColumnsState];
      setColumns(newColumnsState2);
    } else {
      if (finish.taskIds.length < finish.limit) {
        const startTaskIds = Array.from(start.taskIds);
        const [item] = startTaskIds.splice(source.index, 1);

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, item);

        const newColumnsState = columns.map((c) => {
          if (c.id === start.id) {
            c.taskIds = startTaskIds;
            return c;
          } else if (c.id === finish.id) {
            c.taskIds = finishTaskIds;
            return c;
          } else return c;
        });
        const newColumnsState2 = [...newColumnsState];
        setColumns(newColumnsState2);
      } else return;
    }
  };

  const openModal = (data) => {
    const columnId = data.id;
    setModal(columnId);
  };

  const closeModal = () => {
    setModal(false);
  };

  const addTask = (newTask) => {
    setModal(false);
    const updatedColumns = columns.map((column) => {
      if (
        column.id === newTask.stageId &&
        column.taskIds.length < column.limit
      ) {
        column.taskIds.push(newTask);
        return column;
      } else return column;
    });
    setColumns(updatedColumns);
  };

  const removeTask = (taskId) => {
    const updatedColumns = columns
      .map((column) => {
        return Object.assign({}, column, {
          taskIds: column.taskIds.filter((task) => task.id !== taskId),
        });
      })
      .filter((column) => column.taskIds.length >= 0);
    setColumns(updatedColumns);
  };

  const editTask = (taskId, newText, newDeadline, newPriority) => {
    const updatedColumns = columns.map((column) => {
      return Object.assign({}, column, {
        taskIds: column.taskIds.map((task) => {
          if (task.id === taskId) {
            task.text = newText;
            task.priority = parseInt(newPriority);
            task.deadline = newDeadline;
            return task;
          }
          return task;
        }),
      });
    });
    setColumns(updatedColumns);
  };

  useEffect(() => {
    window.localStorage.setItem("columns", JSON.stringify(columns));
    setUsername(JSON.parse(window.localStorage.getItem("formdata"))[0].name);
  }, [columns]);

  return (
    <>
      <div className="container">
        <h1>Hello, {props.location.user ? props.location.user : username}</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="Kanban">
            {modal && (
              <Suspense fallback={<div>Loading...</div>}>
                <KanbanModal
                  closeModal={closeModal}
                  addTask={addTask}
                  columnData={modal}
                />
              </Suspense>
            )}
            <div className="Kanban-columns-container">
              {columns.map((c) => {
                return (
                  <KanbanColumn
                    columnData={c}
                    key={c.name}
                    openModal={openModal}
                    removeTask={removeTask}
                    editTask={editTask}
                  />
                );
              })}
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default Kanban;
