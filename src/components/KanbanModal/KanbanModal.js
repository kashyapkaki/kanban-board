import React from "react";
import "./KanbanModal.css";
import useInputState from "../useInputState";
import { v4 as uuidv4 } from "uuid";
import { priorities } from "../KanbanData";

const KanbanModal = (props) => {
  const [text, handleChangeText] = useInputState("");
  const [deadline, setDeadline] = useInputState("");
  const [priority, setPriority] = useInputState(0);

  const stageId = props.columnData;

  const newTask = {
    id: uuidv4(),
    text: text,
    stageId: stageId,
    priority: parseInt(priority),
    deadline: deadline,
  };

  return (
    <div className="KanbanModal">
      <section className="KanbanModal-content">
        <span
          className="KanbanModal-close-btn"
          onClick={props.closeModal}
        ></span>
        <form
          className="KanbanModal-form"
          onSubmit={(e) => {
            e.preventDefault();
            props.addTask(newTask);
          }}
        >
          <div className="KanbanModal-input-container">
            <label htmlFor="task">Task: </label>
            <input
              className="KanbanModal-input"
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
          <button className="KanbanModal-input-submit-btn">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default KanbanModal;
