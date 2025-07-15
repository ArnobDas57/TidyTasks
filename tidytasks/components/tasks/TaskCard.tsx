"use client";
import { Task } from "@/types/task";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <>
      <div>
        <h1>This is a task lmao {task.title}</h1>
      </div>
    </>
  );
};

export default TaskCard;
