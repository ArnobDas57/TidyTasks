"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Task, TaskPriority, TaskCompletionStatus } from "@/types/task";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  task: Task;
  onClose: () => void;
  onSuccess: () => void;
}

const TaskEditModal: React.FC<Props> = ({ task, onClose, onSuccess }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [completionStatus, setCompletionStatus] =
    useState<TaskCompletionStatus>(task.completion_status);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: task.task_id,
          title,
          description,
          completion_status: completionStatus,
          priority,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update task.");

      onSuccess();
      onClose();
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <X />
          </button>
          <Dialog.Title className="text-xl font-semibold mb-4">
            Edit Task
          </Dialog.Title>

          {errorMsg && (
            <div className="text-sm text-red-600 mb-2">{errorMsg}</div>
          )}

          <div className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
            />
            <select
              value={completionStatus}
              onChange={(e) =>
                setCompletionStatus(e.target.value as TaskCompletionStatus)
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Done">Done</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>

            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              Update Task
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TaskEditModal;
