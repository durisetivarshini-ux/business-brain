// ── Secure Backend AI Service ──────────────────────────────────────────────
export async function* generateAIResponse(prompt, history = [], attachments = [], abortSignal) {
  try {
    const userId = 'guest'; 
    const configRaw = localStorage.getItem(`company_details_${userId}`);
    let context = {};
    if (configRaw) {
      try {
        context = JSON.parse(configRaw);
      } catch (e) {}
    }

    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message: prompt, 
        history: history.map(h => ({ role: h.role, content: h.content })), 
        attachments,
        context
      }),
      signal: abortSignal
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `HTTP ${response.status} Error`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'AI service returned a failure state.');
    }

    const replyText = result.reply || '';

    // Typewriter effect simulation to remain compatible with frontend expect yield stream
    const chunkSize = 6;
    for (let i = 0; i < replyText.length; i += chunkSize) {
      const chunk = replyText.substring(i, i + chunkSize);
      yield { text: () => chunk };
      await new Promise(r => setTimeout(r, 8));
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error('[FRONTEND TRACE] AI Service Error caught:', error);
    throw new Error(error.message || 'Unknown Network Error');
  }
}
