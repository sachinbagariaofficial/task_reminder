"use client"

import React, { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import TodoLists from "./_components/TodoLists";
import { addTask, deleteTask, editTask } from "@/lib/features/tasks/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";

export default function Home() {
  const [taskInput, setTaskInput] = useState<string>("");
  const [eidtTaskID, setEditTaskID] = useState<string>("");
  const [dateTimeValue, setDateTimeValue] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTaskInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskInput(e.target.value);
    },
    []
  );

  const handleDateTimeChange = useCallback((date: Date) => {
    setDateTimeValue(date);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (eidtTaskID) {
        dispatch(
          editTask({
            id: eidtTaskID,
            task: taskInput,
            endTime:dateTimeValue
          })
        );
        setTaskInput("");
        setEditTaskID("");
        setDateTimeValue(new Date())
      } else {
        dispatch(
          addTask({
            id: uuidv4(),
            task: taskInput,
            endTime: moment(dateTimeValue).toISOString(),
            status: 1,
          })
        );
        setTaskInput("");
        setDateTimeValue(new Date())
      }
    },
    [dispatch, taskInput, eidtTaskID, dateTimeValue]
  );

  const editCurrentTask = (task_id: string, taskValue: string) => {
    setEditTaskID(task_id);
    setTaskInput(taskValue);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const minDate = moment().toDate(); // Current date
  const maxDate = moment().add(1, "months").toDate(); // 1 month from now

  return (
    <div>
      <div>
        <h1 className="text-center mt-6 text-3xl font-mono">
          Task Manager And Reminder
        </h1>
      </div>
      <div className="todo-app">
        <form className="input-section" onSubmit={handleSubmit}>
          <input
            id="todoInput"
            type="text"
            placeholder="Add item..."
            name="task"
            value={taskInput}
            onChange={handleTaskInputChange}
            ref={inputRef}
          />
          <div>
          <label htmlFor="cars">Choose a date and time:</label>
          <Datetime
            value={dateTimeValue}
            onChange={handleDateTimeChange}
            dateFormat="DD/MMM/YYYY"
            timeFormat="HH:mm"
            minDate={minDate}
            maxDate={maxDate}
          />
          </div>
         
          <button id="addBtn" type="submit" className="add">
            {eidtTaskID ? "Update" : "Add"}
          </button>
        </form>
        <TodoLists
          taskInput={taskInput}
          timeInput={dateTimeValue}
          editCurrentTask={editCurrentTask}
          eidtTaskID={eidtTaskID}
        />
      </div>
    </div>
  );
}
