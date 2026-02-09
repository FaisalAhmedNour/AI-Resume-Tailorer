import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    return new GoogleGenerativeAI(apiKey);
};

interface TailorRequest extends Request {
    body: {
        originalResumeText: string;
        jobDescription: string;
    }
}

export const tailorResume = async (req: TailorRequest, res: Response) => {
    try {
        const { originalResumeText, jobDescription } = req.body;

        if (!originalResumeText || !jobDescription) {
            return res.status(400).json({ error: 'Original resume text and job description are required' });
        }

        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        You are an ATS expert. Rewrite the resume summary and bullet points to match this job description.
        
        Job Description:
        ${jobDescription}

        Original Resume:
        ${originalResumeText}

        Return the response in valid JSON format with the following structure:
        {
            "summary": "Rewritten summary...",
            "experience": [
                {
                    "company": "Company Name",
                    "role": "Role",
                    "points": ["Rewritten bullet point 1", "Rewritten bullet point 2"]
                }
            ],
            "skills": ["Skill 1", "Skill 2"]
        }
        Ensure the output is pure JSON without any Markdown formatting (no \`\`\`json).
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // simple cleanup if model returns markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const jsonResponse = JSON.parse(cleanedText);

        res.status(200).json(jsonResponse);

    } catch (error: any) {
        console.error("Error tailoring resume:", error);
        res.status(500).json({ error: 'Failed to tailor resume', details: error.message });
    }
};
