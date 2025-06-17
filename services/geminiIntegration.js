import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateCodeSnippet(data) {
  const { api_id = 'Unknown API', frontend = 'React', use_case = 'fetch data and handle auth', description = '' } = data;

  const prompt = `
You are an expert frontend developer.

Write a minimal and precise function in ${frontend} to fetch data from an API named '${api_id}'.
Context: ${use_case}.
API Description: ${description}.

Only output the main function that performs the API call — include auth and error handling inside the function.
No explanations, no extra content. Just the function, as short and clean as possible.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}