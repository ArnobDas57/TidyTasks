"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import TaskCard from "./TaskCard";
import { Task, TaskCompletionStatus } from "@/types/task";

const TaskDashboard = () => {
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const completion_status: TaskCompletionStatus[] = [
    "To Do",
    "In Progress",
    "In Review",
    "Done",
  ];

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else if (data && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        setTasks([]);
      }
    } catch (error: unknown) {
      setTasks([]);
      setErrorMsg(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.completion_status === status);
  };

  return (
    <div className="flex min-h-screen bg-green-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-200 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">User&apos;s Tasks</h2>
        <nav className="space-y-2">
          <p className="text-sm">Dashboard</p>
          <p className="text-sm">Tasks</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <div className="flex items-center gap-4">
            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Urgent">Low</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <Button className="bg-gradient-to-r from-green-400 to-emerald-800 text-white px-4 py-2 rounded-md shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110 active:scale-95 animate-pulse">
              + Create Task
            </Button>
          </div>
        </div>

        {/* Task Columns */}
        <div className="flex justify-center gap-4">
          {completion_status.map((title) => (
            <div
              key={title}
              className="bg-yellow-100 rounded-md shadow p-4 w-64 min-h-[500px]"
            >
              <div className="bg-green-200 rounded-md shadow w-50">
                <h2
                  className={`text-lg font-bold mb-4 text-center ${
                    title === "To Do"
                      ? "text-blue-600"
                      : title === "In Progress"
                      ? "text-yellow-600"
                      : title === "In Review"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {title}
                </h2>
              </div>

              {/* Map TaskCards here if needed */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TaskDashboard;
