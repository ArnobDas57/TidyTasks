"use client";
import { useState } from "react";
import { Task } from "@/types/task";
interface TaskCardProps {
  tasks: Task[];
}

const TaskCard = ({ tasks }: TaskCardProps) => {
  const [cardTasks] = useState(tasks);

  return (
    <>
      <div>
        {cardTasks.map((card: Task, index: number) => {
          return <h1 key={index}>This is a task lmao {card.title}</h1>;
        })}
      </div>
    </>
  );
};

export default TaskCard;
