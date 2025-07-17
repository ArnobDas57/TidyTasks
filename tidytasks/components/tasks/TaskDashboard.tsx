"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import TaskCard from "./TaskCard";
import { Task, TaskCompletionStatus, TaskPriority } from "@/types/task";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import CreateTaskModal from "./CreateTaskModal";
import { Alert, AlertTitle } from "../ui/alert";
import { supabase } from "@/utils/supabase/client";

const TaskDashboard = () => {
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "All">(
    "All"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  const completion_status: TaskCompletionStatus[] = [
    "To Do",
    "In Progress",
    "In Review",
    "Done",
  ];

  // user and task fetching
  useEffect(() => {
    fetchUser();
    getTasks();
  }, []);

  const fetchUser = async (): Promise<void> => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      if (user) {
        const name = user.user_metadata?.username || user.email;
        setUsername(name);
      }
    } catch (err) {
      console.error("Unexpected error fetching user:", err);
    }
  };

  const getTasks = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/tasks", { method: "GET" });

      const data = await res.json();
      console.log("✅ API Response from /api/tasks:", data);

      if (res.ok && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        setErrorMsg("Failed to load tasks.");
        setTasks([]);
      }
    } catch (error: unknown) {
      console.error("❌ Error fetching tasks:", error);
      setTasks([]);
      setErrorMsg(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTasksByPriority = (priorityFilter: string) => {
    if (priorityFilter === "All") return tasks;
    return tasks.filter((task) => task.priority === priorityFilter);
  };

  const handleCreateTask = () => setModalOpen(true);

  const handleTaskCreated = () => {
    setModalOpen(false);
    getTasks(); // Refresh after new task is created
  };

  return (
    <div className="flex min-h-screen bg-green-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-200 p-4 border-r overflow-auto">
        <h2 className="text-xl font-bold mb-6">
          {username ? username : ""}&apos;s Tasks
        </h2>
        <nav className="space-y-2 text-gray-700">
          <p className="cursor-pointer hover:text-green-900">Dashboard</p>
          <p className="cursor-pointer hover:text-green-900">Tasks</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <div className="flex items-center gap-4">
            {loading && <Loader2 className="animate-spin h-5 w-5 text-black" />}
            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value as TaskPriority | "All")
              }
            >
              <option value="All">All</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <Button
              onClick={handleCreateTask}
              className="bg-gradient-to-r from-green-400 to-emerald-800 text-white px-4 py-2 rounded-md shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110 active:scale-95"
            >
              + Create Task
            </Button>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && <CreateTaskModal onSuccess={handleTaskCreated} />}

        {/* Task Columns */}
        <div className="flex flex-wrap gap-6 justify-center">
          {completion_status.map((status) => {
            const filteredTasks = getFilteredTasksByPriority(
              priorityFilter
            ).filter((task) => task.completion_status === status);

            return (
              <div
                key={status}
                className="bg-yellow-100 rounded-md shadow p-4 w-64 min-h-[500px] flex flex-col"
              >
                <h2
                  className={`text-lg font-bold mb-4 text-center ${
                    status === "To Do"
                      ? "text-blue-600"
                      : status === "In Progress"
                      ? "text-yellow-600"
                      : status === "In Review"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {status}
                </h2>

                <div className="flex-grow overflow-auto flex flex-col gap-3">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TaskCard
                        key={task.task_id}
                        task={task}
                        onDelete={getTasks}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-500 mt-auto">
                      No tasks here
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-10 max-w-lg mx-auto">
            <Alert variant="destructive" className="flex items-center gap-2">
              <AlertCircleIcon />
              <AlertTitle>{errorMsg}</AlertTitle>
            </Alert>
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskDashboard;
