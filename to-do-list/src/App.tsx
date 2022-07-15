import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { Input } from "antd";
import {  Button, Form,  Select } from "antd";
import { ITask } from "./Interfaces";
import TodoTask from "./Components/TodoTask";
import { Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
import { Space, Table, Tag } from 'antd';
import { PageHeader } from 'antd';
import { Layout } from 'antd';
import { Image } from 'antd';
import img1 from './images/preview-928x522.jpg';
import { Alert } from 'antd';

const { Option } = Select;
const { Column, ColumnGroup } = Table;



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};








const App: FC = () => {




  

  const [form] = Form.useForm();
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };


  const onGenderChange = (value: string) => {
    switch (value) {
      case 'Personal':
        form.setFieldsValue({ task: 'Personal!' });
        return;
      case 'Office':
        form.setFieldsValue({ task: 'Office!' });
        return;

    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'Personal',
    });
  };






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
    const newTask = { taskName: task, date: date  };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDate("");
  };


    const completeTask = ( taskNameToDelete: string): void =>{
      setTodoList(todoList.filter((task)=> {
        return task.taskName != taskNameToDelete
      
    }))
  };
  return (
    <div className="App">
   


      <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="MY -TO - DO - APPLICATION"
    subTitle=""
  />
  <br></br>
  
      <div className="header">
     
 <div className="headers">
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}> 
     
        
      <Form.Item name="personal" label="Type" rules={[{ required: true }]}>
        <Select
          placeholder="Select type"
          onChange={onGenderChange}
          allowClear
        >
          
          <Option value="Personal">Personal</Option>
          <Option value="Office">Office</Option>
       
        </Select>
        </Form.Item>
      <Form.Item name="task" label="To do Task" rules={[{ required: true }]}>
      <Input
      
          type="text"
          placeholder="Basic usage"
          name="task"
          value={task}
          onChange={handleChange} />
      </Form.Item>
      <Form.Item name="date" label="Deadline" rules={[{ required: true }]}>

        <Input
        
          type="date"
          placeholder="Basic usage"
          name="date"
          value={date}
       
          onChange={handleChange}
        />
        </Form.Item>
        
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('personal') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button onClick={addTask}>
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset} >
      
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
        </Form.Item>
        </Form>
        </div>
        
        <br></br>
     
        
      </div>
    
      <div className="todoList">
  
      <h1>YOU HAVE TO DO --------- </h1>
     

       {todoList.map((task: ITask, key: number) => {
        return <TodoTask key={key} task={task} completeTask={completeTask} />;
      })}
      
      </div>
    
    </div>
    
  );
};

export default App;
