import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || 'sk-REPLACE_THIS'}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are Nova, a warm and intelligent South African AI assistant who helps users with whatever they need in a conversational tone.' },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await apiRes.json();

    const reply = data.choices?.[0]?.message?.content?.trim() || 'No response';

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
}