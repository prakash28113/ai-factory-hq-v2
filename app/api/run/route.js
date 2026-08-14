export async function POST(request) {
  try {
    const body = await request.json();
    const task = typeof body?.task === "string"
      ? body.task.trim()
      : "";

    if (!task) {
      return Response.json(
        { error: "Task is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error:
            "OPENAI_API_KEY is missing from Vercel environment variables."
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-5-mini",
          input: [
            {
              role: "system",
              content:
                "You are Chief, the AI Factory HQ orchestrator. Analyze the user's task and decide which AI employee should handle it. Employees: Scout = research, Forge = product, Wordsmith = content, Atlas = design, Pulse = marketing, Ledger = finance, Ops = operations. Return JSON only with summary, assignedEmployee, status, plan, result. Use status WORKING when execution begins."
            },
            {
              role: "user",
              content: task,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          error:
            data?.error?.message ||
            "OpenAI request failed."
        },
        { status: 500 }
      );
    }

    const output = data?.output_text || "";

    let result;

    try {
      result = JSON.parse(output);
    } catch {
      result = {
        summary: output,
        assignedEmployee: "Chief",
        status: "WORKING",
        plan: [],
        result: output,
      };
    }

    return Response.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.error("AI Factory error:", error);

    return Response.json(
      {
        error:
          error?.message ||
          "Unexpected server error."
      },
      { status: 500 }
    );
  }
}
