"use server";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import type { TaskPriority, TaskCompletionStatus } from "@/types/task"; // adjust import if needed

const validStatuses: TaskCompletionStatus[] = [
  "To Do",
  "In Progress",
  "In Review",
  "Done",
  "",
];

const validPriorities: TaskPriority[] = ["low", "medium", "high", "urgent"];

// GET - Fetch all tasks
export async function GET() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(tasks);
}

// POST - Create a new task
export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const {
    title,
    description = null,
    completion_status = "",
    due_date = null,
    priority,
  } = body;

  // Basic validation
  if (!title || typeof title !== "string") {
    return NextResponse.json(
      { error: "Title is required and must be a string." },
      { status: 400 }
    );
  }

  if (!validStatuses.includes(completion_status)) {
    return NextResponse.json(
      { error: "Invalid completion_status value." },
      { status: 400 }
    );
  }

  if (!validPriorities.includes(priority)) {
    return NextResponse.json(
      { error: "Invalid priority value." },
      { status: 400 }
    );
  }

  const { data: task, error } = await supabase
    .from("tasks")
    .insert([
      {
        title,
        description,
        completion_status,
        due_date,
        priority,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(task);
}

// PUT - Update an existing task
export async function PUT(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { id, title, description, completion_status, due_date, priority } =
    body;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Task ID is required." },
      { status: 400 }
    );
  }

  if (title && typeof title !== "string") {
    return NextResponse.json(
      { error: "Title must be a string." },
      { status: 400 }
    );
  }

  if (completion_status && !validStatuses.includes(completion_status)) {
    return NextResponse.json(
      { error: "Invalid completion_status value." },
      { status: 400 }
    );
  }

  if (priority && !validPriorities.includes(priority)) {
    return NextResponse.json(
      { error: "Invalid priority value." },
      { status: 400 }
    );
  }

  const { data: task, error } = await supabase
    .from("tasks")
    .update({
      title,
      description,
      completion_status,
      due_date,
      priority,
    })
    .eq("task_id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(task);
}

// DELETE - Delete a task
export async function DELETE(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { id } = body;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Task ID is required." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("task_id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
