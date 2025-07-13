import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// GET - Fetch all tasks
export async function GET() {
  const supabase = await createClient();

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
  const body = await request.json();

  const { data: task, error } = await supabase
    .from("tasks")
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(task);
}

// PUT - Update an existing task
export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { data: task, error } = await supabase
    .from("tasks")
    .update(body)
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(task);
}

// DELETE - Delete a task
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { error } = await supabase.from("tasks").delete().eq("id", body.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
