async function analyze() {
  const input = document.getElementById("input").value;
  const category = document.getElementById("category").value;
  const output = document.getElementById("output");

  if (!input) {
    alert("Please describe your situation");
    return;
  }

  output.innerHTML = "🤖 Thinking deeply...";

  const prompt = `
You are DecideWise AI.

User category: ${category}
User situation: ${input}

RULES:
- Keep response VERY SHORT (max 120 words)
- Use clean bullet points
- No long paragraphs

FORMAT:
🧠 Summary
⚖️ Pros (max 2)
⚠️ Cons (max 2)
🎯 Decision
💡 Advice
`;

  const API_KEY = "api-key-goes-here"; 

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();

    const result = data.choices?.[0]?.message?.content || "No response";

    output.innerHTML = `
      <div style="font-weight:600; margin-bottom:10px;">🧠 AI Decision</div>
      <div>${result}</div>
    `;

  } catch (err) {
    output.innerHTML = "❌ Error connecting to AI";
  }
}