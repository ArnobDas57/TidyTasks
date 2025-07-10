import React from "react";
import { Button, Box } from "@mui/material";

const TaskForm = () => {
  return (
    <div>
      <div className="h-64 grid grid-rows-3 grid-flow-col gap-4">
        <div>1</div>
        <div>9</div>
      </div>

      <Button className="btn btn-primary">Click Me</Button>
    </div>
  );
};

export default TaskForm;
