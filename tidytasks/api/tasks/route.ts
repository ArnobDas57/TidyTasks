import { NextResponse } from "next/server";

// GET request for fetching all tasks for logged-in users
export async function GET() {
  const tasks = await fetch("http://localhost:5000/api/tasks").then((res) =>
    res.json()
  );

  return NextResponse.json(tasks);
}

// POST request for creating new task
export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const task = await res.json();

  return NextResponse.json(task);
}

// PUT request for updating task
export async function PUT(request: Request) {
  const body = await request.json();

  const res = await fetch(`http://localhost:5000/tasks/${body.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const task = await res.json();
  return NextResponse.json(task);
}

// DELETE request for deleting task
export async function DELETE(request: Request) {
  const body = await request.json();

  const res = await fetch(`http://localhost:5000/tasks${body.id}`, {
    method: "DELETE",
  });

  return NextResponse.json(res);
}
