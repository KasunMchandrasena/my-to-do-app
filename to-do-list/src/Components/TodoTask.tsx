import React from "react";
import { ITask } from "../Interfaces";
import { Space, Table, Tag } from "antd";

const { Column, ColumnGroup } = Table;

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}
const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        
        <span>{task.taskName}</span>
        <span>{task.date}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.taskName);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoTask;
