// ── Secure Backend AI Service ──────────────────────────────────────────────
export async function* generateAIResponse(prompt, history = [], attachments = [], abortSignal) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, history, attachments }),
      signal: abortSignal
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'AI service is temporarily unavailable. Please try again shortly.');
    }

    if (!response.body) {
      throw new Error('ReadableStream not yet supported in this browser.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunkText = decoder.decode(value, { stream: true });
      if (chunkText) {
        // Yielding an object with a text() method to remain compatible with the frontend expectation
        yield { text: () => chunkText };
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error('Frontend AI Service Error:', error);
    // Throw exactly the professional message requested
    throw new Error(error.message || 'AI service is temporarily unavailable. Please try again shortly.');
  }
}
