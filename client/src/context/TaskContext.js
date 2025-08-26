import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ priority: "", status: "" });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.priority) params.priority = filters.priority;
      if (filters.status) params.status = filters.status;

      const response = await axios.get(
        "http://localhost:5000/api/tasks",
        { params }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        taskData
      );
      setTasks([response.data, ...tasks]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add task",
      };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        taskData
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update task",
      };
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete task",
      };
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${id}/toggle`
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update task status",
      };
    }
  };

  const setPriorityFilter = (priority) => {
    setFilters({ ...filters, priority });
  };

  const setStatusFilter = (status) => {
    setFilters({ ...filters, status });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        setPriorityFilter,
        setStatusFilter,
        filters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
