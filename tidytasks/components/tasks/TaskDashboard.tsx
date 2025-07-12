"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  keyframes,
} from "@mui/material";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// 🧪 Mock Task Data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design System",
    description: "this is a test description",
    completion_status: "To Do",
    due_date: "today",
    priority: "high",
  },
  {
    id: "2",
    title: "API Integration",
    description: "this is a test description",
    completion_status: "In Progress",
    due_date: "today",
    priority: "medium",
  },
  {
    id: "2",
    title: "Fix Bugs",
    description: "this is a test description",
    completion_status: "In Review",
    due_date: "today",
    priority: "low",
  },
  {
    id: "4",
    title: "Launch Prep",
    description: "this is a test description",
    completion_status: "Done",
    due_date: "today",
    priority: "high",
  },
];

const columns: string[] = ["To Do", "In Progress", "In Review", "Done"];

const TaskDashboard = () => {
  const user = "Ronaldo";
  const [priorityFilter, setPriorityFilter] = useState("All");

  const getFilteredTasks = (status: string) => {
    return mockTasks.filter(
      (task) =>
        task.completion_status === status &&
        (priorityFilter === "All" || task.priority === priorityFilter)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100%",
        backgroundColor: "#dcfbdb",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          backgroundColor: "#dcfce7",
          p: 2,
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {user}&apos;s Tasks
        </Typography>

        <Typography variant="body2" mt={1}>
          Dashboard
        </Typography>
        <Typography variant="body2" mt={1}>
          Tasks
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Tasks
          </Typography>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* 🔽 Priority Filter */}
            <FormControl size="small" sx={{ width: 150 }}>
              <InputLabel id="priority-filter-label">Priority</InputLabel>
              <Select
                labelId="priority-filter-label"
                value={priorityFilter}
                label="Priority"
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{
                color: "white",
                border: "outline",
                px: 2,
                borderColor: "black",
                fontFamily: "Inter, sans-serif",
                background:
                  "linear-gradient(-45deg, #AFF8C8, #0F2830, #AFF8C8, #0F2830)",
                backgroundSize: "400% 400%",
                ":hover": {
                  boxShadow: "0 2px 2px #1D5527",
                  transform: "scale(1.05)",
                },
                animation: `${gradientAnimation} 5s linear infinite`,
              }}
            >
              + Create Task
            </Button>
          </Box>
        </Box>

        {/* Task Columns */}
        <Grid container spacing={2}>
          {columns.map((title) => (
            <Grid key={title}>
              <Paper
                elevation={3}
                sx={{ p: 2, minHeight: 500, backgroundColor: "#eaffea" }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={
                    title === "To Do"
                      ? "primary"
                      : title === "In Progress"
                      ? "warning.main"
                      : title === "In Review"
                      ? "error.main"
                      : "success.main"
                  }
                  mb={2}
                >
                  {title}
                </Typography>
                <TaskCard tasks={getFilteredTasks(title)} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TaskDashboard;
