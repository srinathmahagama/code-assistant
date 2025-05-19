const HF_API_KEY = "hf-your-real-hf-key"; // Hugging Face token
const OPENAI_KEY = "sk-your-real-openai-key"; // OpenAI token (if using OpenAI)
const USE_PROVIDER = "huggingface"; // Change to "openai" or "huggingface"

export async function fetchAIReview(
  score,
  total,
  answers,
  setAiSummary,
  setAiMotivation
) {
  const performancePrompt = `You are an encouraging Python tutor.
A student just finished a Python quiz and scored ${score} out of ${total}.
Kindly write a constructive feedback summary (about 3-4 sentences) highlighting:
- What the student did well (if anything)
- Which areas or concepts they struggled with
- Encouragement and next steps for improvement
- NOT mention Best regards, person name, or postion
Avoid repeating the prompt and write naturally sound.`;

  const motivationPrompt = `A student scored ${score} out of ${total} on a Python quiz. Write a short, encouraging summary (about 2 sentences). 
  NOT mention Best regards, person name, or postion. 
  Avoid repeating the prompt or labeling the response and write naturally sound.`;

  try {
    // Show temporary loading messages
    setAiSummary("⏳ Generating performance review...");
    setAiMotivation("⏳ Crafting motivational message...");

    const generateText = async (prompt) => {
      if (USE_PROVIDER === "openai") {
        // OpenAI
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
          }),
        });

        const data = await res.json();
        console.log("OpenAI response:", data);
        return (
          data?.choices?.[0]?.message?.content || "⚠️ OpenAI response failed."
        );
      } else {
        // Hugging Face
        const res = await fetch(
          "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${HF_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt }),
          }
        );

        if (res.status === 503) {
          return "⏳ Model is waking up... Please try again in a few seconds.";
        }

        const data = await res.json();
        console.log("Hugging Face response:", data);

        const text = data?.[0]?.generated_text || data?.generated_text;
        return typeof text === "string"
          ? text.replace(prompt, "").trim()
          : "⚠️ Hugging Face response failed.";
      }
    };

    const summary = await generateText(performancePrompt);
    const motivation = await generateText(motivationPrompt);

    setAiSummary(summary);
    setAiMotivation(motivation);
  } catch (error) {
    console.error("AI fetch failed:", error);
    setAiSummary("⚠️ AI summary failed.");
    setAiMotivation("⚠️ AI encouragement failed.");
  }
}
