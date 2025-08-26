import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CompleteIcon,
  RadioButtonUnchecked as PendingIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useTasks } from "../context/TaskContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    tasks,
    loading,
    deleteTask,
    toggleTaskStatus,
    filters,
    setPriorityFilter,
    setStatusFilter,
  } = useTasks();
  const [deleteError, setDeleteError] = useState("");
  const [toggleError, setToggleError] = useState("");

  const handleDelete = async (id) => {
    setDeleteError("");
    const result = await deleteTask(id);
    if (!result.success) {
      setDeleteError(result.message);
    }
  };

  const handleToggleStatus = async (id) => {
    setToggleError("");
    const result = await toggleTaskStatus(id);
    if (!result.success) {
      setToggleError(result.message);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    return status === "completed" ? "success" : "default";
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      {(deleteError || toggleError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {deleteError || toggleError}
        </Alert>
      )}

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filters.priority}
            label="Priority"
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={() => navigate("/tasks/new")}
          sx={{ ml: "auto" }}
        >
          Add New Task
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : tasks.length === 0 ? (
        <Alert severity="info">
          No tasks found. Create a new task to get started!
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: `4px solid ${
                    task.status === "completed" ? "#4caf50" : "#f44336"
                  }`,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Typography variant="h6" component="div">
                      {task.title}
                    </Typography>
                    <Chip
                      label={task.priority}
                      color={getPriorityColor(task.priority)}
                      size="small"
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    {task.description}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <Typography variant="body2">
                      Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                    </Typography>
                    <Chip
                      label={task.status}
                      color={getStatusColor(task.status)}
                      size="small"
                      icon={
                        task.status === "completed" ? (
                          <CompleteIcon />
                        ) : (
                          <PendingIcon />
                        )
                      }
                    />
                  </Box>
                </CardContent>

                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/tasks/${task._id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color={task.status === "completed" ? "warning" : "success"}
                    onClick={() => handleToggleStatus(task._id)}
                  >
                    {task.status === "completed" ? (
                      <PendingIcon />
                    ) : (
                      <CompleteIcon />
                    )}
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(task._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
