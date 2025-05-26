import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.data.choices[0].message?.content;
    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('OpenAI error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong with the AI request' });
  }
}