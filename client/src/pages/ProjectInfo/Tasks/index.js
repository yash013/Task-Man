import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTasksByProject, DeleteTask } from "../../../apicalls/tasks";
import { SetLoading } from "../../../redux/loadersSlice";
import { message, Table, Button } from "antd";
import TaskForm from "./TaskForm";
import { getDateFormat } from "../../../utils/helpers";

function Tasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getTasks = useCallback(async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetTasksByProject(projectId);
      dispatch(SetLoading(false));
      if (response.success) {
        setTasks(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  }, [dispatch, projectId]);

  const onDelete = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteTask(id);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        getTasks();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    if (selectedTask) {
      setShowTaskForm(true);
    }
  }, [selectedTask]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-4">
            <i
              className="ri-delete-bin-line"
              onClick={() => onDelete(record._id)}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedTask(record);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="default"
          onClick={() => {
            setSelectedTask(null);
            setShowTaskForm(true);
          }}
        >
          Add Task
        </Button>
      </div>
      <Table columns={columns} dataSource={tasks} className="mt-4" />
      {showTaskForm && (
        <TaskForm
          show={showTaskForm}
          setShow={setShowTaskForm}
          reloadData={getTasks}
          task={selectedTask}
        />
      )}
    </div>
  );
}

export default Tasks;