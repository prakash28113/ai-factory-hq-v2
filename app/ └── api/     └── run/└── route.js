export async function POST(request) {
  try {
    const body = await request.json();
    const task = typeof body?.task === "string" ? body.task.trim() : "";

    if (!task) {
      return Response.json(
        { error: "Task is required." },
        { status: 400 }
      );
    }

    return Response.json({
      ok: true,
      result: {
        summary: `Task received: ${task}`,
        assignedEmployee: "Chief",
        status: "QUEUED",
        message: "Task successfully entered the AI Factory."
      }
    });
  } catch {
    return Response.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
