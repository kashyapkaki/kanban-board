import React from "react";
import "./KanbanTask.css";
import { Draggable } from "react-beautiful-dnd";
import useToggle from "../useToggleState";
import KanbanEditForm from "../KanbanEditForm/KanbanEditForm";
import { priorities } from "../KanbanData";

const KanbanTask = (props) => {
  const [isEditing, toggle] = useToggle(false);

  return (
    <Draggable draggableId={`${props.task.id}`} index={props.index}>
      {(provided) => (
        <div
          className="KanbanTask"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <KanbanEditForm
              color={props.color}
              editTask={props.editTask}
              taskId={props.task.id}
              toggle={toggle}
              startText={props.task.text}
              deadline={props.task.deadline}
              priority={props.task.priority}
            />
          ) : (
            <>
              <div className="KanbanTask-assigned">
                <span className="KanbanTask-assigned-img">
                  {props.task.text}
                </span>
              </div>
              <div className="KanbanTask-content">
                Priority:{" "}
                {priorities.filter((x) => x.id == props.task.priority)[0].value}{" "}
                <br />
                Dealine: {props.task.deadline}
              </div>
              <div className="KanbanTask-options">
                <button
                  className="KanbanTask-btn-edit"
                  style={{
                    backgroundColor: `${props.color}`,
                  }}
                  onClick={toggle}
                >
                  Edit
                </button>
                <button
                  className="KanbanTask-btn-delete"
                  style={{
                    backgroundColor: `${props.color}`,
                  }}
                  onClick={() => props.removeTask(props.task.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanTask;
