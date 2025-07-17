"use client";
import { Task } from "@/types/task";
import TiltedCard from "../ui/TiltedCard";
import TaskEditModal from "./TaskEditModal";
import aqua from "../../public/aqua.jpg";
import { useState } from "react";
import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  onDelete?: () => void;
}

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleDeleteTask = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_id: task.task_id }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete task");

      toast.success(`✅ Deleted "${task.title}"`);
      onDelete?.(); // Refresh tasks
    } catch (error) {
      toast.error(`❌ Error deleting task: ${String(error)}`);
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] group transition-all duration-300">
      <TiltedCard
        imageSrc={aqua.src}
        captionText={task.title}
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={0}
        scaleOnHover={1.1}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent={false}
      />

      <div className="absolute inset-0 z-10 bg-white bg-opacity-90 p-5 rounded-md opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-lg overflow-auto">
        <h2 className="text-base font-semibold mb-1">{task.title}</h2>
        <p className="text-sm mb-1">{task.description}</p>
        <p className="text-xs text-green-700 mt-2">
          Created at:{" "}
          {new Date(task.created_at ?? "").toLocaleString(undefined, {
            dateStyle: "medium", // e.g., Jul 13, 2025
            timeStyle: "short", // e.g., 5:00 AM
          })}
        </p>
        <button
          onClick={handleDeleteTask}
          className="mt-8 text-xs text-red-600 hover:text-red-800"
        >
          🗑 Delete Task
        </button>
        {showEdit && (
          <TaskEditModal
            task={task}
            onClose={() => setShowEdit(false)}
            onSuccess={onDelete ?? (() => {})} // or use refetchTasks()
          />
        )}
        <button
          onClick={() => setShowEdit(true)}
          className="text-xs text-blue-600 hover:text-blue-800 mt-2"
        >
          ✏️ Edit Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
