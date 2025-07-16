"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { TaskPriority, TaskCompletionStatus } from "@/types/task";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  onSuccess: () => void;
}

const CreateTaskModal: React.FC<Props> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completionStatus, setCompletionStatus] =
    useState<TaskCompletionStatus>("To Do");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCreate = async () => {
    if (!title.trim()) {
      setErrorMsg("Title is required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          completion_status: completionStatus,
          priority,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      onSuccess();
      setIsOpen(false); // closes the modal
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
      ) {
        setErrorMsg((error as { message: string }).message);
      } else {
        setErrorMsg("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <X />
          </button>
          <Dialog.Title className="text-xl font-semibold mb-4">
            Create New Task
          </Dialog.Title>

          {errorMsg && (
            <div className="text-sm text-red-600 mb-2">{errorMsg}</div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={completionStatus}
              onChange={(e) =>
                setCompletionStatus(e.target.value as TaskCompletionStatus)
              }
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Done">Done</option>
            </select>

            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <Button
              onClick={handleCreate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              Create Task
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateTaskModal;
