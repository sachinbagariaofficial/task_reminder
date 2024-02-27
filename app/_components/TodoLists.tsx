

"use client"

import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  deleteTask,
  editTask,
  taskCompleted,
} from "@/lib/features/tasks/tasksSlice";
import moment from "moment";

interface RootState {
  taskManager: {
    inProgress: TaskType[];
    completed: TaskType[];
  };
}

interface TaskType {
  id: string | number;
  task?: string;
  endTime?: string; // Change endTime type to string
  status?: number;
}

const TodoLists = ({
  taskInput,
  timeInput,
  editCurrentTask,
  eidtTaskID,
}: {
  taskInput: string;
  timeInput: any;
  editCurrentTask: any;
  eidtTaskID: string;
}) => {
  const task = useSelector((state: RootState) => state.taskManager);
  const dispatch = useDispatch();

  const delTask = (task_id: number, task_status: number) => {
    dispatch(
      deleteTask({
        id: task_id,
        status: task_status,
      })
    );
  };

  const statusChange = (id: number) => {
    dispatch(
      taskCompleted({
        id: id,
        status: 1,
      })
    );
  };

  return (
    <div>
      <div className="todos">
        <ul className="todo-list">
          <li className={styles.status_OnGoing}>On Progress</li>
          {!task?.inProgress.length ? (
            <li className="text-white justify-center"> There is no task </li>
          ) : (
            task?.inProgress?.map((data: any) => {
              const endTime = moment(data.endTime);
              const currentTime = moment();
              const duration = moment.duration(endTime.diff(currentTime));
              const remainingHours = Math.floor(duration.asHours());
              const remainingMinutes = Math.floor(duration.asMinutes()) % 60;
              return (
                <li
                  className={eidtTaskID == data.id ? "opacity-45 li" : "li"}
                  key={data.id}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onClick={(e) => statusChange(data.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inlineCheckbox1"
                  ></label>
                  <span className="todo-text">{data.task}</span>
                  <span className="todo-text">{remainingHours} hours {remainingMinutes} minutes</span> 
                  <span
                    className="span-button"
                    onClick={(e) => editCurrentTask(data.id, data.task)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#fff"
                      className="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </span>
                  <span
                    className="span-button"
                    onClick={(e) => delTask(data.id, 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#ff3636"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </span>
                </li>
              );
            })
          )}

          <li className={styles.status_Completed}>Completed</li>
          {!task?.completed.length ? (
            <li className="text-white justify-center"> There is no task </li>
          ) : (
            task?.completed?.map((data:any) => {
              return (
                <li className="li" key={data.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="option1"
                    checked
                    readOnly
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inlineCheckbox1"
                  ></label>
                  <span className="todo-text">{data.task}</span>
                  <span
                    className="span-button"
                    onClick={(e) => delTask(data.id, 0)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#ff3636"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoLists;
