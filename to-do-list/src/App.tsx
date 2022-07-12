import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { Input } from "antd";
import { Button } from "antd";
import { ITask } from "./Interfaces";
import TodoTask from "./Components/TodoTask";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDate(event.target.value);
    }
  };
  const addTask = (): void => {
    const newTask = { taskName: task, date: date };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDate("");
  };
  return (
    <div className="App">
      <div className="header">
        <Input
          type="text"
          placeholder="Basic usage"
          name="task"
          value={task}
          onChange={handleChange}
        />
        <Input
          type="date"
          placeholder="Basic usage"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <Button onClick={addTask} type="primary" block>
          {" "}
          Primary{" "}
        </Button>
      </div>
      <div className="todoList">
       {todoList.map((task: ITask, key: number) => {
        return <TodoTask key={key} task={task} />;
      })}
      </div>
    </div>
  );
};
export default App;
