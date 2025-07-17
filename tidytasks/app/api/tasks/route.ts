export const runtime = "nodejs";

import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import type { TaskPriority, TaskCompletionStatus } from "@/types/task";

// ✅ Valid enums
const validStatuses: TaskCompletionStatus[] = [
  "To Do",
  "In Progress",
  "In Review",
  "Done",
];

const validPriorities: TaskPriority[] = ["Low", "Medium", "High", "Urgent"];

// ✅ Auth helper using safe cookies()
export const getAuthenticatedUser = async () => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      supabase,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { user, supabase };
};

// ✅ GET - Fetch tasks for user
export async function GET() {
  const { user, supabase, response } = await getAuthenticatedUser();
  if (!user) return response;

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("📦 API Hit: /api/tasks");
  return NextResponse.json({ tasks });
}

// ✅ POST - Create task
export async function POST(request: NextRequest) {
  const { user, supabase, response } = await getAuthenticatedUser();
  if (!user) return response;

  const body = await request.json();
  const {
    title,
    description = null,
    completion_status = "",
    due_date = null,
    priority,
  } = body;

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

// ✅ PUT - Update task
export async function PUT(request: NextRequest) {
  const { user, supabase, response } = await getAuthenticatedUser();
  if (!user) return response;

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

export async function DELETE(req: NextRequest) {
  const { user, supabase, response } = await getAuthenticatedUser();
  if (!user) return response;

  try {
    const body = await req.json();
    const { task_id } = body;

    if (!task_id) {
      return NextResponse.json(
        { error: "Task ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("task_id", task_id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Task deleted successfully." });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task." },
      { status: 500 }
    );
  }
}
