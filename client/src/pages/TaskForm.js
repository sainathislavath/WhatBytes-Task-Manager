import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useTasks } from "../context/TaskContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  dueDate: yup.date().required("Due date is required"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
});

const TaskForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "medium",
    },
  });

  useEffect(() => {
    if (isEdit) {
      const task = tasks.find((t) => t._id === id);
      if (task) {
        setInitialData(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("dueDate", new Date(task.dueDate));
        setValue("priority", task.priority);
      }
    }
  }, [isEdit, id, tasks, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const taskData = {
        ...data,
        dueDate: data.dueDate.toISOString(),
      };

      let result;
      if (isEdit) {
        result = await updateTask(id, taskData);
      } else {
        result = await addTask(taskData);
      }

      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isEdit && !initialData) {
    return (
      <Container
        maxWidth="sm"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          {isEdit ? "Edit Task" : "Create New Task"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Due Date"
              value={new Date()}
              onChange={(newValue) => setValue("dueDate", newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={!!errors.dueDate}
                  helperText={errors.dueDate?.message}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              defaultValue="medium"
              {...register("priority")}
              error={!!errors.priority}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
            {errors.priority && (
              <Typography variant="caption" color="error">
                {errors.priority.message}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? (
                <CircularProgress size={24} />
              ) : isEdit ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskForm;
