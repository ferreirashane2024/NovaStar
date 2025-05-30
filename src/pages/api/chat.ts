import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  });

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
          }

            const { message } = req.body;

              if (!message) {
                  return res.status(400).json({ message: "Message is required" });
                    }

                      try {
                          const chatCompletion = await openai.chat.completions.create({
                                model: "gpt-4",
                                      messages: [{ role: "user", content: message }],
                                          });

                                              const responseMessage = chatCompletion.choices[0]?.message?.content || "No response from AI.";

                                                  res.status(200).json({ response: responseMessage });
                                                    } catch (error: any) {
                                                        console.error("API Error:", error);
                                                            res.status(500).json({ error: "Something went wrong", details: error.message });
                                                              }
                                                              }

                            