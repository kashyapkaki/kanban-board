import React from "react";
import { priorities } from "../KanbanData";
import useInputState from "../useInputState";
import "./KanbanEditForm.css";

const KanbanEditForm = (props) => {
  const [text, handleChangeText] = useInputState(props.startText);
  const [deadline, setDeadline] = useInputState(props.deadline);
  const [priority, setPriority] = useInputState(props.priority);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.editTask(props.taskId, text, deadline, priority);
        props.toggle();
      }}
      className="KanbanEditForm"
    >
      <div className="KanbanEditForm-input-container">
        <label htmlFor="task">Task: </label>
        <input
          className="KanbanEditForm-input"
          type="text"
          name="task"
          id="task"
          value={text}
          onChange={handleChangeText}
          required
        ></input>
      </div>
      <div className="KanbanModal-input-container">
        <label htmlFor="priority">Priority: </label>
        <select name="priority" onChange={setPriority}>
          {priorities.map((obj) => (
            <option key={obj.id} value={obj.id}>
              {obj.value}
            </option>
          ))}
        </select>
      </div>
      <div className="KanbanModal-input-container">
        <label htmlFor="deadline">Deadline: </label>
        <input
          className="KanbanModal-input"
          type="date"
          name="deadline"
          id="deadline"
          value={deadline}
          onChange={setDeadline}
        ></input>
      </div>
      <button
        className="KanbanEditForm-btn"
        style={{ backgroundColor: `${props.color}` }}
      >
        Save
      </button>
    </form>
  );
};

export default KanbanEditForm;
